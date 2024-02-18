export type TopicType = {
  topicId: number;
  title: string;
  content: string;
};

export type LessonType = {
  lessonId: number;
  name: string;
  topics: TopicType[];
};
