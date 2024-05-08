"use client";
import IconLink from "@/app/icons/IconLink";
import UploadIcon from "@/app/icons/UploadIcon";
import React, { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";

const Profile = () => {
  interface IFormInput {
    firstName: string;
    lastName: string;
    email: string;
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>();

  const [selectedFile, setSelectedFile] = useState();
  const [preview, setPreview] = useState<any>();

  // create a preview as a side effect, whenever selected file is changed
  useEffect(() => {
    if (!selectedFile) {
      setPreview(undefined);
      return;
    }
    const objectUrl = URL.createObjectURL(selectedFile);
    setPreview(objectUrl);

    // free memory when ever this component is unmounted
    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedFile]);

  const onSelectFile = (e: any) => {
    if (!e.target.files || e.target.files.length === 0) {
      setSelectedFile(undefined);
      return;
    }
    setSelectedFile(e.target.files[0]);
  };

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    const finalValuesFromForm = { ...data, preview };
    console.log(finalValuesFromForm);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-white w-full lg:w-3/5 min-h-[800px] relative pt-24 pb-40 flex flex-col gap-20 items-start"
    >
      <div className="px-8 lg:px-10 xl:px-16 space-y-7">
        <h1 className="font-bold text-4xl lg:text-5xl capitalize">
          Profile Details
        </h1>
        <p className="text-2xl text-bodyCopyColor">
          Add your details to create a personal touch to your profile.
        </p>
      </div>
      <div className="space-y-7 px-8 lg:px-10 xl:px-16 w-full ">
        <div className="flex flex-col lg:flex-row gap-10  bg-[#FAFAFA] lg:gap-4 lg:justify-between lg:items-center p-8 ">
          <span className="text-2xl text-bodyCopyColor text-nowrap">
            Profile picture
          </span>
          <div
            className={
              "h-[160px] w-[160px] flex items-center justify-center rounded-3xl bg-[#EFEBFF] relative " +
              (selectedFile && "bg-transparent")
            }
          >
            {selectedFile && (
              <div className="width-full h-full absolute z-1 top-[0%] left-[0%]">
                {selectedFile && (
                  <img className="width-full h-full" src={preview} />
                )}
              </div>
            )}
            <label
              // for="inputTag"
              className="pointer relative z-3 text-ctaColor font-bold text-[12px] text-nowrap xl:text-2xl flex flex-col items-center justify-center"
            >
              <UploadIcon />
              + Upload Image <br />
              <input
                className="hidden"
                id="inputTag"
                type="file"
                onChange={onSelectFile}
              />
              <br />
              <span id="imageName"></span>
            </label>
          </div>
          <span className="text-[1.1rem] text-bodyCopyColor">
            Image must be below 1024x1024px. <br /> Use PNG or JPG format.
          </span>
        </div>

        <div className="bg-[#FAFAFA] p-8 space-y-8 lg:space-y-6 rounded-xl">
          <div className="flex relative flex-col gap-4 lg:gap-0 lg:flex-row justify-between lg:items-center">
            <span className="text-2xl lg:text-[13px] xl:text-2xl text-bodyCopyColor ">
              First name*
            </span>
            <div className="lg:w-4/5">
              <input
                {...register("firstName", {
                  required: "Firstname is required",
                  pattern: {
                    value: /^[A-Za-z]+$/i,
                    message: "Your firstname should contain only letters",
                  },
                })}
                aria-invalid={errors.firstName ? "true" : "false"}
                type="text"
                placeholder="e.g. John"
                className={
                  "px-6 outline-none py-5 w-full text-2xl rounded-2xl " +
                  (errors.firstName && "border-[1px] border-red-500")
                }
              />
              {errors.firstName && (
                <p className="text-red-500" role="alert">
                  {errors.firstName.message}
                </p>
              )}
            </div>
          </div>

          <div className="flex relative flex-col gap-4 lg:gap-0 lg:flex-row justify-between lg:items-center">
            <span className="text-2xl lg:text-[13px] xl:text-2xl text-bodyCopyColor ">
              Last name*
            </span>
            <div className="lg:w-4/5">
              <input
                {...register("lastName", {
                  required: "Lastname is required",
                  pattern: {
                    value: /^[A-Za-z]+$/i,
                    message: "Your lastname should contain only letters",
                  },
                })}
                aria-invalid={errors.lastName ? "true" : "false"}
                type="text"
                placeholder="e.g. John"
                className={
                  "px-6 outline-none py-5 w-full text-2xl rounded-2xl " +
                  (errors.lastName && "border-[1px] border-red-500")
                }
              />
              {errors.lastName && (
                <p className="text-red-500" role="alert">
                  {errors.lastName.message}
                </p>
              )}
            </div>
          </div>
          <div className="flex relative flex-col gap-4 lg:gap-0 lg:flex-row justify-between lg:items-center">
            <span className="text-2xl lg:text-[13px] xl:text-2xl text-bodyCopyColor ">
              Email
            </span>
            <div className="lg:w-4/5">
              <input
                {...register("email", {
                  pattern: {
                    value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                    message: "Invalid email address",
                  },
                })}
                aria-invalid={errors.email ? "true" : "false"}
                type="text"
                placeholder="e.g. John"
                className={
                  "px-6 outline-none py-5 w-full text-2xl rounded-2xl " +
                  (errors.email && "border-[1px] border-red-500")
                }
              />
              {errors.email && (
                <p className="text-red-500" role="alert">
                  {errors.email.message}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="py-6 border-t-2 border-[#D9D9D9] absolute bottom-[5rem] left-0 right-0">
        <button
          type="submit"
          className="absolute left-8 right-8 lg:right-16 lg:left-auto transition-opacity duration-[0.4s] hover:opacity-40 bg-ctaColor text-white text-2xl rounded-xl py-5 px-12 capitalize font-bold"
        >
          save
        </button>
      </div>
    </form>
  );
};

export default Profile;
