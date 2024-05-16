"use client";
import Dropdown from "@/app/components/Dropdown";
import ChevronDown from "@/app/icons/ChevronDown";
import ChevronIcon from "@/app/icons/ChevronIcon";
import GithubGreyIcon from "@/app/icons/GithubGreyIcon";
import GithubIcon from "@/app/icons/GithubIcon";
import IconLink from "@/app/icons/IconLink";
import React, { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import isUrl from "is-url";
import Empty from "@/app/icons/Empty";
import InputLink from "@/app/components/link/InputLink";
import { v4 as uuidv4 } from "uuid";
import PhoneMockup from "@/app/icons/PhoneMockup";
import { userDataStore } from "@/app/store/userdatastore";
import { socialsArray, socialsArrayWithPosition } from "@/app/constants";

export type arrayofLinks = {
  id: string;
  platform: string | undefined;
  link: string;
}[];

interface linkInput {
  actualLink: string;
}

const Link = () => {
  const linksArray = userDataStore((state: any) => state.userData.listOfLinks);
  const updatelistOfLinksArrayHandler = userDataStore(
    (state: any) => state.saveLink
  );

  const [linkInfo, setLinkInfo] = useState(linksArray);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<linkInput>();

  const onSubmit: SubmitHandler<linkInput> = (data) => console.log(data);

  const addNewLinkHandler = () => {
    if (linkInfo.length >= 5) {
      return;
    } else {
      const newLinkObj = {
        id: uuidv4(),
        platform: "Github",
        link: "",
      };
      setLinkInfo([...linkInfo, newLinkObj]);
      // console.log(linksArray);
    }
  };

  useEffect(() => {
    setLinkInfo(linksArray);
    console.log(linkInfo);
    console.log(linksArray);
    // Update linkInfo whenever linksArray changes
  }, [linksArray]);

  const removeLinkHandler = (id: string) => {
    const filteredArray = linkInfo.filter((info) => info.id !== id);
    setLinkInfo(filteredArray);
  };

  const saveData = (e: any) => {
    e.preventDefault();
    console.log(linkInfo);
    updatelistOfLinksArrayHandler(linkInfo);
    console.log(linksArray);
  };

  const renderSelectedIcon = () => {};

  useEffect(() => {
    console.log(linksArray);
    console.log(linkInfo);
  }, [linksArray]);

  return (
    <div className="px-8 lg:px-0 flex gap-10 items-start">
      <div className="hidden lg:flex w-2/5 rounded-xl items-center justify-center min-h-[800px] p-10 bg-white">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="308"
          height="632"
          fill="none"
          viewBox="0 0 308 632"
        >
          <path
            stroke="#737373"
            d="M1 54.5C1 24.953 24.953 1 54.5 1h199C283.047 1 307 24.953 307 54.5v523c0 29.547-23.953 53.5-53.5 53.5h-199C24.953 631 1 607.047 1 577.5v-523Z"
          />
          <path
            fill="#fff"
            stroke="#737373"
            d="M12 55.5C12 30.923 31.923 11 56.5 11h24C86.851 11 92 16.149 92 22.5c0 8.008 6.492 14.5 14.5 14.5h95c8.008 0 14.5-6.492 14.5-14.5 0-6.351 5.149-11.5 11.5-11.5h24c24.577 0 44.5 19.923 44.5 44.5v521c0 24.577-19.923 44.5-44.5 44.5h-195C31.923 621 12 601.077 12 576.5v-521Z"
          />
          <circle cx="153.5" cy="112" r="48" fill="#EEE" />
          <rect width="160" height="16" x="73.5" y="185" fill="#EEE" rx="8" />
          <rect width="72" height="8" x="117.5" y="214" fill="#EEE" rx="4" />
          {linkInfo.map((info: any, index: number) => {
            return;
          })}

          <g>
            <rect
              x="35"
              y="278"
              width="237"
              height="44"
              fill={
                linkInfo.length > 0
                  ? socialsArrayWithPosition.find(
                      (socialPlatform) =>
                        socialPlatform.name === linkInfo[0].platform
                    )?.color
                  : "#EEE"
              }
              rx="8"
            ></rect>
            <text
              x="72"
              y="305"
              font-family="Verdana"
              font-size="14"
              fill="white"
            >
              {linkInfo.length > 0 && linkInfo[0].platform}
            </text>
            {linkInfo.length > 0 &&
              (socialsArrayWithPosition.find(
                (socialPlatform) => socialPlatform.name === linkInfo[0].platform
              )?.component ||
                null)}
            {linkInfo.length > 0 && <ChevronIcon x="240" y="292" />}
          </g>
          <g>
            <rect
              x="35"
              y="342"
              width="237"
              height="44"
              fill={
                linkInfo.length > 1
                  ? socialsArrayWithPosition.find(
                      (socialPlatform) =>
                        socialPlatform.name === linkInfo[1].platform
                    )?.color
                  : "#EEE"
              }
              rx="8"
            ></rect>
            <text
              x="72"
              y="369"
              font-family="Verdana"
              font-size="14"
              fill="white"
            >
              {linkInfo.length > 1 && linkInfo[1].platform}
            </text>
            {linkInfo.length > 1 &&
              (socialsArrayWithPosition.find(
                (socialPlatform) => socialPlatform.name === linkInfo[1].platform
              )?.component ||
                null)}
            {linkInfo.length > 1 && <ChevronIcon x="240" y="356" />}
          </g>
          <g>
            <rect
              x="35"
              y="406"
              width="237"
              height="44"
              fill={
                linkInfo.length > 2
                  ? socialsArrayWithPosition.find(
                      (socialPlatform) =>
                        socialPlatform.name === linkInfo[2].platform
                    )?.color
                  : "#EEE"
              }
              rx="8"
            ></rect>
            <text
              x="72"
              y="433"
              font-family="Verdana"
              font-size="14"
              fill="white"
            >
              {linkInfo.length > 2 && linkInfo[2].platform}
            </text>
            {linkInfo.length > 2 &&
              (socialsArrayWithPosition.find(
                (socialPlatform) => socialPlatform.name === linkInfo[2].platform
              )?.component ||
                null)}
            {linkInfo.length > 2 && <ChevronIcon x="240" y="420" />}
          </g>
          <g>
            <rect
              x="35"
              y="470"
              width="237"
              height="44"
              fill={
                linkInfo.length > 3
                  ? socialsArrayWithPosition.find(
                      (socialPlatform) =>
                        socialPlatform.name === linkInfo[3].platform
                    )?.color
                  : "#EEE"
              }
              rx="8"
            ></rect>
            <text
              x="72"
              y="497"
              font-family="Verdana"
              font-size="14"
              fill="white"
            >
              {linkInfo.length > 3 && linkInfo[3].platform}
            </text>
            {linkInfo.length > 3 &&
              (socialsArrayWithPosition.find(
                (socialPlatform) => socialPlatform.name === linkInfo[3].platform
              )?.component ||
                null)}
            {linkInfo.length > 3 && <ChevronIcon x="240" y="484" />}
          </g>
          <g>
            <rect
              x="35"
              y="534"
              width="237"
              height="44"
              fill={
                linkInfo.length > 4
                  ? socialsArrayWithPosition.find(
                      (socialPlatform) =>
                        socialPlatform.name === linkInfo[4].platform
                    )?.color
                  : "#EEE"
              }
              rx="8"
            ></rect>
            <text
              x="72"
              y="561"
              font-family="Verdana"
              font-size="14"
              fill="white"
            >
              {linkInfo.length > 4 && linkInfo[4].platform}
            </text>
            {linkInfo.length > 4 &&
              (socialsArrayWithPosition.find(
                (socialPlatform) => socialPlatform.name === linkInfo[4].platform
              )?.component ||
                null)}
            {linkInfo.length > 4 && <ChevronIcon x="240" y="548" />}
          </g>
          {/* <rect width="237" height="44" x="35" y="278" fill="#EEE" rx="8" /> */}
          {/* <rect width="237" height="44" x="35" y="342" fill="#EEE" rx="8" /> */}
          {/* <rect width="237" height="44" x="35" y="406" fill="#EEE" rx="8" /> */}
          {/* <rect width="237" height="44" x="35" y="470" fill="#EEE" rx="8" /> */}
          {/* <rect width="237" height="44" x="35" y="534" fill="#EEE" rx="8" /> */}
        </svg>
      </div>
      {/* {children} */}
      <form
        onSubmit={saveData}
        className={
          "bg-white w-full lg:w-3/5 min-h-[800px] rounded-xl relative pt-24 pb-40 flex flex-col gap-20 items-start " +
          (linkInfo.length > 0 && "pb-60")
        }
      >
        <div className="px-8 lg:px-10 xl:px-16 space-y-7">
          <h1 className="font-bold text-4xl lg:text-5xl capitalize">
            Customize your links
          </h1>
          <p className="text-2xl text-bodyCopyColor">
            Add/edit/remove links below and then share all your profiles with
            the world
          </p>
        </div>
        <div className="space-y-7 px-8 lg:px-10 xl:px-16 w-full ">
          <button
            onClick={addNewLinkHandler}
            className={
              "text-2xl transition ease-in-out duration-[.5s] hover:bg-[#EFEBFF]  font-bold text-[rgb(99,60,255)] w-full border-[1px] rounded-xl border-ctaColor py-5 " +
              (linkInfo.length >= 5 && "bg-[#EFEBFF] pointer-events-none")
            }
          >
            + Add new link
          </button>

          <div className="space-y-7 pb-4">
            {linkInfo.length === 0 ? (
              <div className="bg-[#FAFAFA] py-14 px-8 flex flex-col justify-center text-center gap-8 items-center rounded-xl">
                <Empty />
                <h1 className="font-bold text-4xl lg:text-5xl capitalize">
                  Lets get you started
                </h1>
                <p className="text-bodyCopyColor text-xl">
                  Use the “Add new link” button to get started. Once you have
                  more than one link, you can reorder and edit them. We’re here
                  to help you share your profiles with everyone!
                </p>
              </div>
            ) : (
              linkInfo.map((info, index) => (
                <div
                  key={info.id.toString()}
                  className="bg-[#FAFAFA] py-10 px-8 space-y-8 rounded-xl"
                >
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-bodyCopyColor text-2xl">
                      = Link #{index + 1}
                    </span>
                    <span
                      onClick={() => removeLinkHandler(info.id)}
                      className="text-bodyCopyColor capitalize text-2xl duration-[0.4s] cursor-pointer transition-colors hover:text-[rgb(99,60,255)] "
                    >
                      remove
                    </span>
                  </div>
                  <div className="flex flex-col justify-between gap-[.5rem]">
                    <p className="text-bodyCopyColor text-xl capitalize">
                      platform
                    </p>
                    <Dropdown
                      id={info.id}
                      linkInfo={linkInfo}
                      setLinkInfo={setLinkInfo}
                    />
                  </div>
                  <div className="flex flex-col gap-[.5rem]">
                    <p className="text-bodyCopyColor text-xl capitalize">
                      link
                    </p>
                    <div className="flex hover:shadow-bShadow hover:border-[rgb(99,60,255)] transition-all duration-[0.4s] p-6 items-center border-[1px] rounded-xl border-[#d9d9d9] gap-4 bg-white peer-[&:not(:placeholder-shown):not(:focus):invalid]:border  ">
                      <IconLink />
                      <InputLink
                        placeholder="Enter url..."
                        pattern="https?://.+"
                        id={info.id}
                        linkInfo={linkInfo}
                        setLinkInfo={setLinkInfo}
                      />
                      {/* <input
                      {...register("actualLink", {
                        required: "Cannot be empty",
                        pattern: {
                          value: /^(ftp|http|https):\/\/[^ "]+$/,
                          message: "Invalid url format",
                        },
                      })}
                      aria-invalid={errors.actualLink ? "true" : "false"}
                      type="text"
                      placeholder="Enter your url"
                      className="w-full text-2xl bg-none outline-none "
                    /> */}
                    </div>
                    {errors.actualLink && (
                      <p role="alert" className="text-red-500">
                        {errors.actualLink.message}
                      </p>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
        <div className="py-6 border-t-2 border-[#D9D9D9] absolute  bottom-[5rem] left-0 right-0">
          <button
            // onClick={saveData}
            type="submit"
            className="absolute right-8 left-8 lg:right-16 lg:left-auto transition-opacity duration-[0.4s] hover:opacity-40  bg-ctaColor text-white text-2xl rounded-xl py-5 px-12 capitalize font-bold"
          >
            save
          </button>
        </div>
      </form>
    </div>
  );
};

export default Link;
