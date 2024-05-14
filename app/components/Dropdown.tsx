"use client";
import React, { useEffect, useRef, useState } from "react";
import GithubIcon from "../icons/GithubIcon";
import ChevronDown from "../icons/ChevronDown";
import GithubGreyIcon from "../icons/GithubGreyIcon";
import TwitterIcon from "@/app/icons/TwitterIcon";
import FeMentorIcon from "../icons/FeMentorIcon";
import LinkedinIcon from "../icons/LinkedinIcon";
import Yt from "../icons/Yt";
import Fb from "../icons/Fb";
import Twitch from "../icons/Twitch";
import Devto from "../icons/Devto";
import Codewars from "../icons/Codewars";
import Codepen from "../icons/Codepen";
import FreeCodeCamp from "../icons/FreeCodeCamp";
import Gitlab from "../icons/Gitlab";
import Hashnode from "../icons/Hashnode";
import StackOverflow from "../icons/StackOverflow";
import { arrayofLinks } from "../(home)/link/page";

type Props = {
  linkInfo: arrayofLinks;
  setLinkInfo: React.Dispatch<React.SetStateAction<arrayofLinks>>;
  id: string;
};

type selectedSocialArg = {
  // id: Date;
  name: string;
};

const Dropdown = (props: Props) => {
  const socialsArray = [
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

  const [isDropdownActive, setDropdownActive] = useState(false);

  const [currentPlatform, setCurrentPlatform] = useState(() => {
    const interestedObj = props.linkInfo.find((info) => info.id == props.id);
    if (interestedObj) {
      const pickedObj = socialsArray.find(
        (socials) => socials.name == interestedObj.platform
      );
      return pickedObj;
    }
    return {
      name: "Github",
      component: <GithubGreyIcon />,
    };
  });

  const selectSocialLink = (data: selectedSocialArg) => {
    let linkInfoCopy = [...props.linkInfo];
    const concernedObject = linkInfoCopy.find((info) => info.id === props.id);
    if (concernedObject) {
      let concernedObjectIndex = linkInfoCopy.findIndex(
        (info) => info.id === props.id
      );
      const concernedObjectCopy = { ...concernedObject }; // Define type for concernedObjectCopy
      concernedObjectCopy.platform = data.name;
      linkInfoCopy[concernedObjectIndex] = concernedObjectCopy;
      props.setLinkInfo(linkInfoCopy);
    }
    const platformDataForUi = socialsArray.find(
      (socialPlatform) => socialPlatform.name == data.name
    );
    if (platformDataForUi) {
      const { name, id, component } = platformDataForUi;
      setCurrentPlatform({
        name,
        component,
      });
    }
  };

  useEffect(() => {
    // console.log(props.linkInfo);
  }),
    [props.linkInfo];

  const ref = useRef(null);

  return (
    <div
      className="w-full relative"
      onClick={() => setDropdownActive(!isDropdownActive)}
    >
      <div className="w-full border-[1px] rounded-xl border-[#d9d9d9] cursor-pointer hover:shadow-bShadow hover:border-[rgb(99,60,255)] transition-all duration-[0.4s] flex items-center justify-between p-6 text-2xl bg-white">
        <div className="flex gap-4 items-center">
          {currentPlatform.component}
          <span className="text-2xl text-[#333333] capitalize">
            {currentPlatform.name}
          </span>
        </div>
        <ChevronDown
          setDropdownActive={setDropdownActive}
          isDropdownActive={isDropdownActive}
        />
      </div>
      <div
        className={
          "w-full shadow-bShadow absolute top-[60px] bg-white max-h-[250px] z-50 overflow-y-scroll px-4 " +
          (isDropdownActive ? "block" : "hidden")
        }
      >
        {socialsArray.map((socialIcon) => (
          <div
            key={socialIcon.id}
            onClick={() =>
              selectSocialLink({
                // id: new Date(),
                name: socialIcon.name,
              })
            }
            className="flex hover:stroke-[rgb(99,60,255)] hover:fill-[rgb(99,60,255)] cursor-pointer hover:text-[rgb(99,60,255)] border-b-[1px] bg-white border-[#D9D9D9] py-6 gap-4 items-center"
          >
            {socialIcon.component}
            <span ref={ref} className="text-2xl capitalize">
              {socialIcon.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dropdown;

// main data structure
// totalUsersArray = [

//   {
//     user1email:"",
//     name:'',
//     links:[{}],
//     profile:{name,lastname,imgLink,}
//   }
// ]
