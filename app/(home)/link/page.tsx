"use client";
import Dropdown from "@/app/components/Dropdown";
import ChevronDown from "@/app/icons/ChevronDown";
import ChevronIcon from "@/app/icons/ChevronIcon";
import GithubGreyIcon from "@/app/icons/GithubGreyIcon";
import GithubIcon from "@/app/icons/GithubIcon";
import IconLink from "@/app/icons/IconLink";
import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import isUrl from "is-url";
import Empty from "@/app/icons/Empty";
import InputLink from "@/app/components/link/InputLink";
import { v4 as uuidv4 } from "uuid";

export type arrayofLinks = {
  id: string;
  platform: string | undefined;
  link: string;
}[];

interface linkInput {
  actualLink: string;
}

const Link = () => {
  const [linkInfo, setLinkInfo] = useState<arrayofLinks>([]);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<linkInput>();

  const onSubmit: SubmitHandler<linkInput> = (data) => console.log(data);

  const addNewLinkHandler = () => {
    const newLinkObj = {
      id: uuidv4(),
      platform: "Github",
      link: "",
    };
    setLinkInfo([...linkInfo, newLinkObj]);
  };

  const removeLinkHandler = (id: string) => {
    const filteredArray = linkInfo.filter((info) => info.id !== id);
    setLinkInfo(filteredArray);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
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
          Add/edit/remove links below and then share all your profiles with the
          world
        </p>
      </div>
      <div className="space-y-7 px-8 lg:px-10 xl:px-16 w-full ">
        <button
          onClick={addNewLinkHandler}
          className="text-2xl transition ease-in-out duration-[.5s] hover:bg-[#EFEBFF]  font-bold text-[rgb(99,60,255)] w-full border-[1px] rounded-xl border-ctaColor py-5"
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
                Use the “Add new link” button to get started. Once you have more
                than one link, you can reorder and edit them. We’re here to help
                you share your profiles with everyone!
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
                  <p className="text-bodyCopyColor text-xl capitalize">link</p>
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
          type="submit"
          className="absolute right-8 left-8 lg:right-16 lg:left-auto transition-opacity duration-[0.4s] hover:opacity-40  bg-ctaColor text-white text-2xl rounded-xl py-5 px-12 capitalize font-bold"
        >
          save
        </button>
      </div>
    </form>
  );
};

export default Link;
