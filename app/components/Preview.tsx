"use client";
import PreviewNav from "@/app/components/PreviewNav";
import ChevronIcon from "@/app/icons/ChevronIcon";
import { userDataStore } from "@/app/store/userdatastore";
import React, { useEffect, useState } from "react";
import { socialsArrayWithPosition } from "@/app/constants";

const Preview = () => {
  const personalInfoHolder = userDataStore(
    (state: any) => state.userData.personalDetails
  );
  const linkInfo = userDataStore((state: any) => state.userData.listOfLinks);
  const [selectedFile, setSelectedFile] = useState(
    personalInfoHolder.selectedFile
  );
  const [imgUrl, setImgUrl] = useState(personalInfoHolder.imgUrl);

  useEffect(() => {
    if (!selectedFile) {
      setImgUrl(undefined);
      return;
    }
    const objectUrl = URL.createObjectURL(personalInfoHolder.selectedFile);
    setImgUrl(objectUrl);

    // free memory when ever this component is unmounted
    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedFile, personalInfoHolder.selectedFile]);

  return (
    <div className="lg:bg-[#FAFAFA] relative min-h-[100vh] ">
      <div className=" lg:bg-ctaColor pt-8 lg:pb-96 lg:rounded-bl-[3rem] lg:rounded-br-[3rem] ">
        <PreviewNav />
      </div>
      <div className="absolute gap-14 left-[50%] top-[15%] translate-x-[-50%] lg:top-[22%] lg:shadow-bShadow lg:rounded-[3rem] lg:bg-white w-[300px] lg:w-[340px] min-h-[500px] flex flex-col py-20 px-16">
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
          {linkInfo.slice(0, 5).map((link: string | any, index: string) => {
            const socialPlatform = socialsArrayWithPosition.find(
              (platform) => platform.name === link.platform
            );
            return (
              <div
                key={index}
                style={{
                  backgroundColor: socialPlatform?.color || "", // default color if linkInfo is empty
                }}
                className="text-white flex justify-between items-center w-full p-6 rounded-2xl"
              >
                <div className="flex gap-3 items-center">
                  {socialPlatform?.component("50", "290") || null}
                  <span className="text-2xl text-white capitalize">
                    {link.platform}
                  </span>
                </div>
                <ChevronIcon />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Preview;
