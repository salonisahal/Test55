export type Subject = {
  id: string;
  title: string;
  color: string;
  icon: string;
};

export type Lesson = {
  id: string;
  subjectId: string;
  title: string;
  chapter: string;
  timeStart: string;
  timeEnd: string;
  room: string;
  teacher: string;
  day: string;
  avatarColor: string;
};
