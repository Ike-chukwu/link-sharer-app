import Codepen from "./icons/Codepen";
import Codewars from "./icons/Codewars";
import Devto from "./icons/Devto";
import Fb from "./icons/Fb";
import FeMentorIcon from "./icons/FeMentorIcon";
import FreeCodeCamp from "./icons/FreeCodeCamp";
import GithubGreyIcon from "./icons/GithubGreyIcon";
import GithubIcon from "./icons/GithubIcon";
import Gitlab from "./icons/Gitlab";
import Hashnode from "./icons/Hashnode";
import LinkedinIcon from "./icons/LinkedinIcon";
import StackOverflow from "./icons/StackOverflow";
import Twitch from "./icons/Twitch";
import TwitterIcon from "./icons/TwitterIcon";
import Yt from "./icons/Yt";

export const socialsArray = [
  { name: "Github", id: 1, component: <GithubGreyIcon /> },
  { name: "Frontend Mentor", id: 2, component: <FeMentorIcon /> },
  { name: "Twitter", id: 3, component: <TwitterIcon /> },
  { name: "Linkedin", id: 4, component: <LinkedinIcon /> },
  { name: "Youtube", id: 5, component: <Yt /> },
  { name: "Facebook", id: 6, component: <Fb /> },
  { name: "Twitch", id: 7, component: <Twitch /> },
  { name: "Dev.to", id: 8, component: <Devto /> },
  { name: "Codewars", id: 9, component: <Codewars /> },
  { name: "Codepen", id: 10, component: <Codepen /> },
  { name: "freeCodeCamp", id: 11, component: <FreeCodeCamp /> },
  { name: "Gitlab", id: 12, component: <Gitlab /> },
  { name: "Hashnode", id: 13, component: <Hashnode /> },
  { name: "Stack Overflow", id: 14, component: <StackOverflow /> },
];

export const socialsArrayWithPosition = [
  {
    name: "Github",
    id: 1,
    component: (x: string, y: string) => <GithubIcon x={x} y={y} />,
    color: "#1A1A1A",
  },
  {
    name: "Frontend Mentor",
    id: 2,
    component: (x: string, y: string) => <FeMentorIcon x={x} y={y} />,
    color: "#3F54A3",
  },
  {
    name: "Twitter",
    id: 3,
    component: (x: string, y: string) => <TwitterIcon x={x} y={y} />,
    color: "#43B7E9",
  },
  {
    name: "Linkedin",
    id: 4,
    component: (x: string, y: string) => <LinkedinIcon x={x} y={y} />,
    color: "#2D68FF",
  },
  {
    name: "Youtube",
    id: 5,
    component: (x: string, y: string) => <Yt x={x} y={y} />,
    color: "#EE3939",
  },
  {
    name: "Facebook",
    id: 6,
    component: (x: string, y: string) => <Fb x={x} y={y} />,
    color: "#2442AC",
  },
  {
    name: "Twitch",
    id: 7,
    component: (x: string, y: string) => <Twitch x={x} y={y} />,
    color: "#EE3FC8",
  },
  {
    name: "Dev.to",
    id: 8,
    component: (x: string, y: string) => <Devto x={x} y={y} />,
    color: "#333333",
  },
  {
    name: "Codewars",
    id: 9,
    component: (x: string, y: string) => <Codewars x={x} y={y} />,
    color: "#8A1A50",
  },
  {
    name: "Codepen",
    id: 10,
    component: (x: string, y: string) => <Codepen x={x} y={y} />,
    color: "#464646",
  },
  {
    name: "freeCodeCamp",
    id: 11,
    component: (x: string, y: string) => <FreeCodeCamp x={x} y={y} />,
    color: "#302267",
  },
  {
    name: "Gitlab",
    id: 12,
    component: (x: string, y: string) => <Gitlab x={x} y={y} />,
    color: "#EB4925",
  },
  {
    name: "Hashnode",
    id: 13,
    component: (x: string, y: string) => <Hashnode x={x} y={y} />,
    color: "#0330D1",
  },
  {
    name: "Stack Overflow",
    id: 14,
    component: (x: string, y: string) => <StackOverflow x={x} y={y} />,
    color: "#EC7100",
  },
];
