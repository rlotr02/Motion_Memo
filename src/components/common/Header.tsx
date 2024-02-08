import styled from 'styled-components';
import { ReactComponent as Logo } from '../images/logo.svg';

const Header: React.FC = () => {
  return (
    <Container>
      <LeftHeader>
        <Logo />
        <h1>Motion Memo</h1>
        <span>About</span>
        <span>Search</span>
        <span>Settings</span>
      </LeftHeader>
      <RightHeader>
        <span>Log in</span>
        <button>Download</button>
      </RightHeader>
    </Container>
  );
};

export default Header;

const Container = styled.div`
  padding: 30px 38px 0 38px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  @media (max-width: 1000px) {
    padding: 20px 0 0 25px;
  }
`;

const LeftHeader = styled.div`
  display: flex;
  align-items: center;

  > h1 {
    font-size: 18.12px;
    font-weight: bold;
    margin-left: 13px;
    margin-right: 64px;
  }

  > span {
    margin-right: 89px;
    font-size: 15px;
    font-weight: 600;

    @media (max-width: 1000px) {
      display: none;
    }
  }
`;

const RightHeader = styled.div`
  > span {
    margin-right: 70px;
    font-size: 15px;
    font-weight: 600;

    @media (max-width: 1000px) {
      display: none;
    }
  }

  > button {
    background-color: #000000;
    color: #ffffff;
    border-radius: 8px;
    padding: 6px 9px;
    font-size: 15px;
    font-weight: 600;

    @media (max-width: 1000px) {
      display: none;
    }
  }
`;
