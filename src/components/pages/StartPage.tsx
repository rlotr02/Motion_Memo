import styled from 'styled-components';
import MemoHeader from '../common/MemoHeader';
import Sidebar from '../common/Sidebar';

const StartPage: React.FC = () => {
  return (
    <div>
      <MemoHeader />
      <Container>
        <Sidebar />
      </Container>
    </div>
  );
};

export default StartPage;

const Container = styled.div`
  display: flex;
`;
