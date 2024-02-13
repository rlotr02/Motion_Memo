import styled from 'styled-components';
import MemoHeader from '../common/MemoHeader';
import Sidebar from '../common/Sidebar';

const MemoPage: React.FC = () => {
  return (
    <div>
      <MemoHeader />
      <Container>
        <Sidebar />
        <MemoContainer>
          <TitleContainer>
            <h1>Mathematics</h1>
            <button>MODIFY</button>
          </TitleContainer>
          <Memo>
            When adding integers with the same sign, add their absolute values
            and keep the sign. Example: (+3) + (+5) = +8 When multiplying
            integers, if the signs are the same, the result is positive. If the
            signs are different, the result is negative. Example: (-2) * (+6) =
            -12 Dividing integers follows similar rules to multiplication. The
            sign of the quotient depends on the signs of the numbers being
            divided. Example: (-10) / (+2) = -5
          </Memo>
        </MemoContainer>
      </Container>
    </div>
  );
};

export default MemoPage;

const Container = styled.div`
  display: flex;
`;

const MemoContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 80px 105px;

  @media (max-width: 1000px) {
    padding: 60px 60px;
  }

  @media (max-width: 670px) {
    padding: 40px 40px;
  }
`;

const TitleContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;

  > h1 {
    font-weight: 800;
    font-size: 63px;
    line-height: 80px;
    color: #000000;

    @media (max-width: 1500px) {
      font-size: 50px;
      line-height: normal;
    }

    @media (max-width: 1200px) {
      font-size: 40px;
    }

    @media (max-width: 1000px) {
      font-size: 30px;
    }

    @media (max-width: 840px) {
      font-size: 20px;
    }

    @media (max-width: 670px) {
      max-width: 200px;
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

    @media (max-width: 1200px) {
      padding: 12px 30px;
      font-size: 16px;
      line-height: normal;
    }

    @media (max-width: 1000px) {
      padding: 10px 25px;
      border-radius: 8px;
      font-size: 13px;
      line-height: normal;
    }

    @media (max-width: 840px) {
      padding: 8px 20px;
      border-radius: 8px;
      font-size: 10px;
    }

    @media (max-width: 670px) {
      padding: 8px 15px;
    }
  }
`;

const Memo = styled.div`
  margin-top: 50px;
  max-width: 1139px;
  font-weight: 600;
  font-size: 26px;
  line-height: 43px;
  color: #000000;

  @media (max-width: 1000px) {
    font-size: 22px;
    line-height: 38px;
  }

  @media (max-width: 840px) {
    font-size: 20px;
    line-height: 35px;
  }

  @media (max-width: 670px) {
    font-size: 18px;
    line-height: 30px;
  }
`;
