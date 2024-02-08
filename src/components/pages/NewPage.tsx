import styled from 'styled-components';
import MemoHeader from '../common/MemoHeader';
import Sidebar from '../common/Sidebar';
import { useRef, useEffect, useState } from 'react';
import * as tf from '@tensorflow/tfjs';

const NewPage: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  //const textRef = useRef<HTMLParagraphElement>(null);
  const frameBuffer = useRef<tf.Tensor3D[]>([]);

  const [title, setTitle] = useState('');
  const [texts, setTexts] = useState<string[]>([]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const Phrases = [
    'Stop navigation.',
    'Excuse me.',
    'I am sorry.',
    'Thank you.',
    'Good bye.',
    'I love this game.',
    'Nice to meet you.',
    'You are welcome.',
    'How are you?',
    'Have a good time.',
  ];

  useEffect(() => {
    const run = async () => {
      //웹캠 접근 권한 확인
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        try {
          //비디오 스트림
          const stream = await navigator.mediaDevices.getUserMedia({
            video: true,
          });
          //비디오 스트림을 videoRef에 연결
          if (videoRef.current) videoRef.current.srcObject = stream;
        } catch (error) {
          //카메라 접근이 거부된 경우 경고 메시지 표시
          alert('Camera access was denied');
        }

        //Tensorflow.js 모델 로드
        const model = await tf.loadLayersModel('/model/model.json');

        //예측 함수 정의
        const predict = async () => {
          //비디오가 재생 중이고 사이즈가 유효한 경우에만 실행
          if (
            videoRef.current &&
            videoRef.current.videoWidth > 0 &&
            videoRef.current.videoHeight > 0
          ) {
            //비디오 프레임을 텐서로 변환
            const video = tf.browser.fromPixels(videoRef.current);
            //텐서를 지정된 사이즈로 리사이즈
            const resized = tf.image.resizeBilinear(video, [64, 64]);
            //텐서를 그레이스케일로 변환
            const grayscale = tf.image.rgbToGrayscale(resized);

            //그레이스케일 이미지를 버퍼에 추가
            frameBuffer.current.push(grayscale);
            //버퍼가 지정된 크기를 초과하면 가장 오래된 프레임 제거
            if (frameBuffer.current.length > 27) {
              frameBuffer.current.shift();
            }

            //버퍼가 가득 찼을 때 예측 실행
            if (frameBuffer.current.length === 27) {
              //버퍼의 내용을 텐서로 변환
              const expanded = tf.stack(frameBuffer.current, 0).expandDims(0);
              //모델을 사용하여 예측
              const prediction = model.predict(expanded) as tf.Tensor;
              //예측 결과를 일반 배열로 변환
              const predictionArray = Array.from(prediction.dataSync());
              //가장 높은 예측 값을 가진 인덱스 찾기
              const maxValue = predictionArray.indexOf(
                Math.max(...predictionArray),
              );
              //예측 결과를 화면에 표시
              setTexts(prevTexts => [...prevTexts, Phrases[maxValue]]);
            }
            //다음 예측을 위해 일정 시간 후에 predict 함수 다시 호출
            setTimeout(predict, 1000 / 25);
          }
        };

        //predict 함수 첫 호출
        predict();
      }
    };

    run();
  }, [Phrases]);

  const onInputHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const target = event.target.value;
    setTitle(target);
  };

  const saveMemo = () => {
    console.log(title);
  };

  return (
    <div>
      <MemoHeader />
      <Container>
        <Sidebar />
        <MemoContainer>
          <TitleContainer>
            <input
              type="text"
              value={title}
              placeholder="#1 TITLE"
              minLength={1}
              spellCheck={false}
              onChange={onInputHandler}
            />
            <button onClick={saveMemo}>SAVE</button>
          </TitleContainer>
          <WebCamContainer>
            <video ref={videoRef} autoPlay width="695" height="505"></video>
            <Memo>
              <MemoBar></MemoBar>
              <OuterContainer>
                <MemoScroll>
                  {texts.map((text, index) => (
                    <p key={index}>{text}</p>
                  ))}
                  <Linear></Linear>
                </MemoScroll>
              </OuterContainer>
            </Memo>
          </WebCamContainer>
        </MemoContainer>
      </Container>
    </div>
  );
};

export default NewPage;

const Container = styled.div`
  display: flex;
`;

const MemoContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 80px 105px;
`;

const TitleContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;

  > input {
    font-weight: 800;
    font-size: 63px;
    line-height: 80px;
    color: #000000;
    border: none;

    &::placeholder {
      color: #b9b5b5;
    }
  }

  > button {
    padding: 14px 37px;
    background: #ffffff;
    border: none;
    filter: drop-shadow(1px 1px 4px rgba(0, 0, 0, 0.2));
    border-radius: 11px;
    font-weight: 700;
    font-size: 20px;
    line-height: 24px;
    color: #000000;
  }
`;

const WebCamContainer = styled.div`
  display: flex;
  margin-top: 35px;

  > video {
    width: 695px;
    height: 505px;
  }
`;

const Memo = styled.div`
  width: 695px;
  margin-left: 74px;
  box-shadow: 1px 1px 12.937px rgba(0, 0, 0, 0.5);
`;

const MemoBar = styled.div`
  width: 100%;
  height: 54.62px;
  background: #fff06b;
`;

const OuterContainer = styled.div`
  padding: 5px;
  background: #fffacf;
  position: relative;
`;

const MemoScroll = styled.div`
  height: 440px;
  padding: 21px 22px 21px 28px;
  overflow-y: auto;
  overflow-x: hidden;

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background: #9a9a9a;
    border-radius: 9px;
  }

  > p {
    font-weight: 600;
    font-size: 21.2082px;
    line-height: 28px;
    color: #000000;
  }
`;

const Linear = styled.div`
  position: absolute;
  width: 695px;
  height: 99px;
  bottom: 0;
  left: 0;

  background: linear-gradient(
    180deg,
    rgba(255, 250, 207, 0) 0%,
    rgba(0, 0, 0, 0.19) 100%
  );
`;
