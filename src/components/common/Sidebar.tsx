import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { LessonType } from '../types/Type';

const Sidebar: React.FC = () => {
  const navigate = useNavigate();
  const [listData, setListData] = useState<LessonType[]>();

  useEffect(() => {
    const getLessonList = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/lessons');
        console.log(response.data);
        setListData(response.data);
      } catch (error) {
        console.log('Error fetching data', error);
      }
    };

    getLessonList();
  }, []);

  const newSubjectHandler = async () => {
    const newLessonName =
      listData && listData.length > 0
        ? `Lesson${listData.length + 1}`
        : 'Lesson';

    try {
      const response = await axios.post('http://localhost:8080/api/lessons', {
        name: newLessonName,
      });
      console.log(response.data);
      const newLesson = {
        lessonId: response.data.lessonId,
        name: newLessonName,
        topics: [],
      };
      setListData(prevListData =>
        prevListData ? [...prevListData, newLesson] : [newLesson],
      );
    } catch (error) {
      console.log('Error fetching data', error);
    }
  };

  const newTitleHandler = (lessonId: number) => {
    console.log(lessonId);
    navigate(`/new/${lessonId}`);
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
      {listData &&
        listData.map((data, index) => {
          return (
            <div key={index}>
              <ListSub>
                <h2>
                  <span>&gt;</span>&nbsp; {data.name}
                </h2>
                <button onClick={() => newTitleHandler(data.lessonId)}>
                  +
                </button>
              </ListSub>
              {data.topics.map(data => {
                return (
                  <ListTitle
                    key={data.topicId}
                    onClick={() => navigate(`/memo/${data.topicId}`)}
                  >
                    {data.title}
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

  @media (max-width: 1500px) {
    min-width: 200px;
  }

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
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;

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
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  color: #000000;
  cursor: pointer;
`;
