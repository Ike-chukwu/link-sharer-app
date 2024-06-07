"use client";
import Navbar from "@/app/components/Navbar";
import PhoneMockup from "../icons/PhoneMockup";
import PreviewNav from "../components/PreviewNav";
import GithubIcon from "../icons/GithubIcon";
import ChevronIcon from "../icons/ChevronIcon";
import { userDataStore } from "@/app/store/userdatastore";
import React, { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { socialsArrayWithPosition } from "../constants";

export default function Layout({ children }: { children: React.ReactNode }) {
  interface IFormInput {
    firstName: string;
    lastName: string;
    email: string;
  }

  interface ProfileDetails extends IFormInput {
    imgUrl: string;
    selectedFile: any;
  }

  const personalInfoHolder = userDataStore(
    (state: any) => state.userData.personalDetails
  );
  const linkInfo = userDataStore((state: any) => state.userData.listOfLinks);
  const [selectedFile, setSelectedFile] = useState(
    personalInfoHolder.selectedFile
  );
  const [imgUrl, setimgUrl] = useState<any>(personalInfoHolder.imgUrl);

  useEffect(() => {
    if (!selectedFile) {
      setimgUrl(undefined);
      return;
    }
    const objectUrl = URL.createObjectURL(personalInfoHolder.selectedFile);
    setimgUrl(objectUrl);

    // free memory when ever this component is unmounted
    console.log(imgUrl);
    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedFile]);

  return (
    <div className="lg:bg-[#FAFAFA] relative min-h-[100vh] ">
      <div className=" lg:bg-ctaColor pt-8 lg:pb-96 lg:rounded-bl-[3rem] lg:rounded-br-[3rem] ">
        <PreviewNav />
      </div>
      <div className="absolute gap-14  left-[50%] top-[15%] translate-x-[-50%] lg:top-[22%] lg:shadow-bShadow lg:rounded-[3rem] lg:bg-white w-[300px] lg:w-[340px] min-h-[500px] flex flex-col py-20 px-16">
        <div className="flex gap-6 lg:gap-6 items-center justify-center w-full flex-col">
          <img
            src={imgUrl}
            className="w-32 h-32 lg:w-40 lg:h-40 rounded-full bg-red-500 "
          />
          <h2 className="text-4xl lg:text-[30px] font-bold ">
            {personalInfoHolder?.firstName} {personalInfoHolder?.lastName}
          </h2>
          <p className="text-2xl text-[#7B7B7B]">{personalInfoHolder?.email}</p>
        </div>
        <div className="flex gap-4 flex-col">
          <div
            style={{
              backgroundColor:
                linkInfo.length > 0
                  ? socialsArrayWithPosition.find(
                      (socialPlatform) =>
                        socialPlatform.name === linkInfo[0]?.platform
                    )?.color
                  : "", // default color if linkInfo is empty
            }}
            className="text-white flex justify-between items-center w-full p-6 rounded-2xl"
          >
            <div className="flex gap-3 items-center">
              {linkInfo.length > 0 &&
                (socialsArrayWithPosition
                  .find(
                    (socialPlatform) =>
                      socialPlatform.name === linkInfo[0]?.platform
                  )
                  ?.component("50", "290") ||
                  null)}
              <span className="text-2xl text-white capitalize">
                {" "}
                {linkInfo.length > 0 && linkInfo[0]?.platform}
              </span>
            </div>
            {linkInfo.length > 0 && <ChevronIcon />}
          </div>
          <div
            style={{
              backgroundColor:
                linkInfo.length > 1
                  ? socialsArrayWithPosition.find(
                      (socialPlatform) =>
                        socialPlatform.name === linkInfo[1]?.platform
                    )?.color
                  : "", // default color if linkInfo is empty
            }}
            className="text-white flex justify-between items-center w-full p-6 rounded-2xl"
          >
            <div className="flex gap-3 items-center">
              {linkInfo.length > 1 &&
                (socialsArrayWithPosition
                  .find(
                    (socialPlatform) =>
                      socialPlatform.name === linkInfo[1]?.platform
                  )
                  ?.component("50", "290") ||
                  null)}
              <span className="text-2xl text-white capitalize">
                {" "}
                {linkInfo.length > 1 && linkInfo[1]?.platform}
              </span>
            </div>
            {linkInfo.length > 1 && <ChevronIcon />}
          </div>
          <div
            style={{
              backgroundColor:
                linkInfo.length > 2
                  ? socialsArrayWithPosition.find(
                      (socialPlatform) =>
                        socialPlatform.name === linkInfo[2]?.platform
                    )?.color
                  : "", // default color if linkInfo is empty
            }}
            className="text-white flex justify-between items-center w-full p-6 rounded-2xl"
          >
            <div className="flex gap-3 items-center">
              {linkInfo.length > 2 &&
                (socialsArrayWithPosition
                  .find(
                    (socialPlatform) =>
                      socialPlatform.name === linkInfo[2]?.platform
                  )
                  ?.component("50", "290") ||
                  null)}
              <span className="text-2xl text-white capitalize">
                {" "}
                {linkInfo.length > 2 && linkInfo[2]?.platform}
              </span>
            </div>
            {linkInfo.length > 2 && <ChevronIcon />}
          </div>
          <div
            style={{
              backgroundColor:
                linkInfo.length > 3
                  ? socialsArrayWithPosition.find(
                      (socialPlatform) =>
                        socialPlatform.name === linkInfo[3]?.platform
                    )?.color
                  : "", // default color if linkInfo is empty
            }}
            className="text-white flex justify-between items-center w-full p-6 rounded-2xl"
          >
            <div className="flex gap-3 items-center">
              {linkInfo.length > 3 &&
                (socialsArrayWithPosition
                  .find(
                    (socialPlatform) =>
                      socialPlatform.name === linkInfo[3]?.platform
                  )
                  ?.component("50", "290") ||
                  null)}
              <span className="text-2xl text-white capitalize">
                {" "}
                {linkInfo.length > 3 && linkInfo[3]?.platform}
              </span>
            </div>
            {linkInfo.length > 3 && <ChevronIcon />}
          </div>
          <div
            style={{
              backgroundColor:
                linkInfo.length > 4
                  ? socialsArrayWithPosition.find(
                      (socialPlatform) =>
                        socialPlatform.name === linkInfo[4]?.platform
                    )?.color
                  : "", // default color if linkInfo is empty
            }}
            className="text-white flex justify-between items-center w-full p-6 rounded-2xl"
          >
            <div className="flex gap-3 items-center">
              {linkInfo.length > 4 &&
                (socialsArrayWithPosition
                  .find(
                    (socialPlatform) =>
                      socialPlatform.name === linkInfo[4]?.platform
                  )
                  ?.component("50", "290") ||
                  null)}
              <span className="text-2xl text-white capitalize">
                {" "}
                {linkInfo.length > 4 && linkInfo[4]?.platform}
              </span>
            </div>
            {linkInfo.length > 4 && <ChevronIcon />}
          </div>
        </div>
      </div>
    </div>
  );
}
