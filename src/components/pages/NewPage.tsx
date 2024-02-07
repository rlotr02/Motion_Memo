import styled from 'styled-components';
import MemoHeader from '../common/MemoHeader';
import Sidebar from '../common/Sidebar';
import { useRef, useEffect, useState } from 'react';
//import * as tf from '@tensorflow/tfjs';

const NewPage: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);

  const [title, setTitle] = useState('');

  useEffect(() => {
    const run = async () => {
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
        });
        if (videoRef.current) videoRef.current.srcObject = stream;

        // 딥러닝 모델 불러오기. 예시로 MobileNet 사용
        //const model = await tf.loadLayersModel("https://.../model.json");

        // const predict = async () => {
        //   if (videoRef.current && textRef.current) {
        //     const video = tf.browser.fromPixels(videoRef.current);
        //     const resized = tf.image.resizeBilinear(video, [224, 224]);

        //     // 이미지에 대한 포즈 예측
        //     const poses = await model.estimateSinglePose(resized);

        //     // 텍스트 엘리먼트에 예측 결과 표시
        //     textRef.current.innerText = `Prediction: ${JSON.stringify(poses)}`;

        //     requestAnimationFrame(predict);
        //   }
        // };

        // 첫 번째 예측 시작
        //requestAnimationFrame(predict);
      }
    };

    run();
  }, []);

  const onInputHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const target = event.target.value;
    setTitle(target);
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
            <button>SAVE</button>
          </TitleContainer>
          <WebCamContainer>
            <video ref={videoRef} autoPlay width="695" height="505"></video>
            <Memo>
              <MemoBar></MemoBar>
              <OuterContainer>
                <MemoScroll>
                  <p ref={textRef}></p>
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
