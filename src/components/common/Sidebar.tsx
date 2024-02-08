import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const Sidebar: React.FC = () => {
  const DUMMY_DATA = [
    {
      subject: 'Lesson',
      title: [
        {
          id: 1,
          item: '#1 TITLE',
        },
        {
          id: 2,
          item: '#2 TITLE',
        },
      ],
    },
  ];

  const navigate = useNavigate();
  const [listData, setListData] = useState(DUMMY_DATA);

  const newSubjectHandler = () => {
    const newSubjectId = listData.length + 1;
    const newSubjectName =
      newSubjectId > 1 ? `Lesson${newSubjectId}` : 'Lesson';

    const newSubject = {
      subject: newSubjectName,
      title: [],
    };

    setListData(prevListData => [...prevListData, newSubject]);
  };

  const newTitleHandler = (subjectIndex: number) => {
    const newTitleId = listData[subjectIndex].title.length + 1;
    const newTitleItem = `#${newTitleId} TITLE`;

    const newTitle = {
      id: newTitleId,
      item: newTitleItem,
    };

    setListData(prevListData => {
      const updatedListData = [...prevListData];
      updatedListData[subjectIndex].title.push(newTitle);
      return updatedListData;
    });
  };

  return (
    <Container>
      <NavItem>
        <h2>Recent</h2>
      </NavItem>
      <NavItem>
        <h2>Delete</h2>
      </NavItem>
      <NavItem>
        <h2>New</h2>
        <button onClick={newSubjectHandler}>+</button>
      </NavItem>
      <hr />
      {listData.map((data, index) => {
        return (
          <div key={index}>
            <ListSub>
              <h2>
                <span>&gt;</span>&nbsp; {data.subject}
              </h2>
              <button onClick={() => newTitleHandler(index)}>+</button>
            </ListSub>
            {data.title.map(data => {
              return (
                <ListTitle
                  key={data.id}
                  onClick={() => navigate(`/memo/${data.id}`)}
                >
                  {data.item}
                </ListTitle>
              );
            })}
          </div>
        );
      })}
    </Container>
  );
};

export default Sidebar;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #fffef6;
  min-width: 242px;
  height: 100vh;

  > hr {
    width: 100%;
    margin: 0;
    border: 4px solid rgba(0, 0, 0, 0.14);
  }
`;

const NavItem = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 12px 20px 12px 27px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.14);

  > h2 {
    font-weight: 600;
    font-size: 15.9061px;
    line-height: 19px;
    color: #000000;
  }

  > button {
    font-weight: 600;
    font-size: 20px;
    line-height: 19px;
    color: #000000;
    background: transparent;
    border: none;
    padding: 0;
  }
`;

const ListSub = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 12px 20px 12px 27px;

  h2 {
    font-weight: 600;
    font-size: 15.9061px;
    line-height: 19px;
    color: #000000;

    > span {
      display: inline-block;
      transform: rotate(90deg);
    }
  }

  > button {
    font-weight: 600;
    font-size: 20px;
    line-height: 19px;
    color: #000000;
    background: transparent;
    border: none;
    padding: 0;
  }
`;

const ListTitle = styled.div`
  padding: 0 45px;
  margin-bottom: 12px;
  font-weight: 600;
  font-size: 15.9061px;
  line-height: 19px;
  color: #000000;
  cursor: pointer;
`;
