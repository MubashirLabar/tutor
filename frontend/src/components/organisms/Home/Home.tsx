import React from "react";
import HomeworkHelp from "../../molecules/HomeworkHelp/homeworkHelp";
import Media from "../../molecules/Media/Media";
import Moment from "../../molecules/Moment/Moment";
import StudyTime from "../../molecules/StudyTime/studyTime";
import Team from "../../molecules/Team/Team";

const LandingPage = () => {
  return (
    <>
      <Team />
      <HomeworkHelp />
      <StudyTime />
      <Moment />
      <Media />
    </>
  );
};
export default LandingPage;
