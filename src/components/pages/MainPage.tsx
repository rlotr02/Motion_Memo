import styled from 'styled-components';
import Background from '../images/background.png';
import Header from '../common/Header';
import { useNavigate } from 'react-router-dom';

const MainPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div>
      <Header />
      <Container>
        <DivContainer>
          <h1>With your voice Start taking notes</h1>
          <p>
            Experience a new and convenient learning environment
            <br />
            by filling in notes with just your voice
          </p>
          <button onClick={() => navigate('/new')}>
            Taking Notes &nbsp;&nbsp;&gt;
          </button>
          <span>Learn more</span>
        </DivContainer>
        <img src={Background} alt="배경" />
      </Container>
    </div>
  );
};

export default MainPage;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;

  > img {
    height: calc(100vh - 65px);
    position: absolute;
  }
`;

const DivContainer = styled.div`
  position: absolute;
  z-index: 10;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: radial-gradient(
    40.21% 40.21% at 50% 50%,
    rgba(255, 230, 0, 0.4) 0%,
    rgba(255, 249, 220, 0) 100%
  );
  width: 800px;
  height: 800px;

  @media (max-width: 800px), (max-height: 800px) {
    width: 700px;
    height: 700px;
  }

  @media (max-width: 600px), (max-height: 600px) {
    width: 500px;
    height: 500px;
  }

  > h1 {
    color: #000000;
    font-weight: 800;
    font-size: 50px;
    line-height: 60px;
    width: 500px;
    margin-bottom: 24px;

    @media (max-width: 800px), (max-height: 800px) {
      font-size: 40px;
      width: 400px;
    }

    @media (max-width: 600px), (max-height: 600px) {
      font-size: 28px;
      line-height: 45px;
      margin-bottom: 15spx;
      width: 280px;
    }
  }

  > p {
    font-weight: 600;
    font-size: 16.5px;
    line-height: 20px;
    color: rgba(0, 0, 0, 0.91);
    margin-bottom: 57px;

    @media (max-width: 800px), (max-height: 800px) {
      margin-bottom: 40px;
    }

    @media (max-width: 600px), (max-height: 600px) {
      font-size: 13px;
      line-height: 16px;
      margin-bottom: 30px;
    }
  }

  > button {
    background: #ffffff;
    border-radius: 11px;
    border: none;
    padding: 14px 33px;
    font-weight: 700;
    font-size: 20px;
    line-height: 24px;
    color: #000000;
    filter: drop-shadow(1px 1px 4px rgba(0, 0, 0, 0.25));

    @media (max-width: 600px), (max-height: 600px) {
      font-size: 15px;
      padding: 10px 20px;
    }
  }

  > span {
    position: absolute;
    bottom: 23%;
    font-weight: 600;
    font-size: 20px;
    line-height: 24px;
    color: rgba(0, 0, 0, 0.28);

    @media (max-width: 800px), (max-height: 800px) {
      bottom: 20%;
    }

    @media (max-width: 600px), (max-height: 600px) {
      font-size: 13px;
      bottom: 18%;
    }
  }
`;
