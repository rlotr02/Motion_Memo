import styled from 'styled-components';
import { ReactComponent as Logo } from '../images/logo.svg';
import { useNavigate } from 'react-router-dom';

const MemoHeader: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Container>
      <LeftHeader>
        <Logo onClick={() => navigate('/')} />
        <h1 onClick={() => navigate('/')}>Motion Memo</h1>
        <span>Andy’s Motion Memo</span>
      </LeftHeader>
      <RightHeader>
        <span>About</span>
        <span>Search</span>
        <span>Settings</span>
      </RightHeader>
    </Container>
  );
};

export default MemoHeader;

const Container = styled.div`
  padding: 30px 38px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid rgba(0, 0, 0, 0.14);

  @media (max-width: 1000px) {
    padding: 20px 25px;
  }
`;

const LeftHeader = styled.div`
  display: flex;
  align-items: center;

  > svg {
    cursor: pointer;
  }

  > h1 {
    font-size: 18.12px;
    font-weight: bold;
    margin-left: 13px;
    margin-right: 45px;
    cursor: pointer;
  }

  > span {
    font-size: 15px;
    font-weight: 600;

    @media (max-width: 1000px) {
      display: none;
    }
  }
`;

const RightHeader = styled.div`
  > span {
    margin-left: 80px;
    margin-right: 9px;
    font-size: 15px;
    font-weight: 600;

    @media (max-width: 1000px) {
      display: none;
    }
  }
`;
