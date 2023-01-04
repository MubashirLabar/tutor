import { DayValue } from "react-modern-calendar-datepicker";

export interface IBudgetDeadline {
  budget?: string;
  coupon?: string;
  tip?: string;
  startDate?: DayValue;
  endDate?: DayValue;
  examLength?: string;
  timezone?: string;
  deadlineDate?: DayValue;
  deadlineTime?: string;
}

export interface IUserDetails {
  gradeLevel?: string;
  courseFullName?: string;
  schoolName?: string;
}

export const categories = [
  {
    title: "All Subjects",
    value: "all-subjects",
    image: "/assets/images/home-moment-2.svg",
  },
  {
    title: "Science",
    value: "science",
    image: "/assets/images/home-team-2.svg",
  },
  { title: "Math", value: "math", image: "/assets/images/home-team-1.svg" },
  {
    title: "Business",
    value: "business",
    image: "/assets/images/home-team-3.svg",
  },
  {
    title: "Humanities and Social Science",
    value: "humanities_and_social_science",
    image: "/assets/images/home-moment-4.svg",
  },
  {
    title: "Computer science and Programming",
    value: "computer_science",
    image: "/assets/images/home-work-3.svg",
  },
  {
    title: "Writing Help",
    value: "writing",
    image: "/assets/images/writing.svg",
  },
  {
    title: "Engineering",
    value: "engineering",
    image: "/assets/images/engineering.svg",
  },
  {
    title: "Others",
    value: "others",
    image: "/assets/images/home-moment-3.svg",
  },
];

export const subjects: { [key: string]: { name: string; id: number }[] } = {
  math: [
    { name: "Actuarial science", id: 1 },
    { name: "Algebra", id: 2 },
    { name: "Algebra 2", id: 3 },
    { name: "Calculus", id: 4 },
  ],
  science: [
    { name: "Anatomy", id: 18 },
    { name: "Astronomy", id: 19 },
    { name: "Biochemistry", id: 20 },
    { name: "Biology", id: 21 },
    { name: "Biostatistics", id: 22 },
  ],
  humanities_and_social_science: [
    { name: "English", id: 56 },
    { name: "History", id: 57 },
    { name: "Literature", id: 58 },
    { name: "Philosophy", id: 59 },
    { name: "Sociology", id: 60 },
    { name: "Political science", id: 61 },
    { name: "Psychology", id: 62 },
    { name: "Arts", id: 63 },
    { name: "Anthropology", id: 64 },
    { name: "Media", id: 65 },
    { name: "Music", id: 66 },
    { name: "Film", id: 67 },
    { name: "Religion", id: 68 },
  ],
  writing: [
    { name: "Essay", id: 56 },
    { name: "Research Paper", id: 57 },
    { name: "Article Review", id: 58 },
    { name: "Book Review", id: 59 },
    { name: "Creative Writing", id: 99 },
    { name: "Critical Writing", id: 69 },
    { name: "Business Plan", id: 79 },
    { name: "Case Study", id: 80 },
    { name: "Course Work", id: 81 },
    { name: "Team Paper", id: 82 },
    { name: "Research Proposal", id: 83 },
    { name: "Presentation", id: 84 },
  ],
  computer_science: [
    { name: "C", id: 63 },
    { name: "C#", id: 64 },
    { name: "C++", id: 65 },
    { name: "CSS", id: 67 },
    { name: "GIS", id: 68 },
    { name: "HTML", id: 69 },
  ],
};
