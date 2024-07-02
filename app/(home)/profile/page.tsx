"use client";
import withAuth from "@/app/components/ProtectedRoute";
import { socialsArrayWithPosition } from "@/app/constants";
import ChevronIcon from "@/app/icons/ChevronIcon";
import UploadIcon from "@/app/icons/UploadIcon";
import { userDataStore } from "@/app/store/userdatastore";
import { IFormInput, ProfileDetails } from "@/app/types";
import React, { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";

const Profile = () => {
  const personalInfoHolder = userDataStore(
    (state: any) => state.userData.personalDetails
  );
  const accessToken = userDataStore((state: any) => state.userData.accessToken);

  const linkInfo = userDataStore((state: any) => state.userData.listOfLinks);

  const updateProfileDetailsHandler = userDataStore(
    (state: any) => state.savePersonalDetails
  );

  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>();

  const [selectedFile, setSelectedFile] = useState(
    personalInfoHolder.selectedFile
  );
  const [imgUrl, setimgUrl] = useState<any>(personalInfoHolder.imageUrl);
  const [finalValuesFromForm, setFinalValuesFrom] =
    useState<ProfileDetails>(personalInfoHolder);
  console.log(personalInfoHolder);

  // create a preview as a side effect, whenever selected file is changed
  useEffect(() => {
    if (!selectedFile) {
      setimgUrl(undefined);
      return;
    }
    const objectUrl = URL.createObjectURL(selectedFile);
    setimgUrl(objectUrl);

    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedFile]);

  const onSelectFile = (e: any) => {
    if (!e.target.files || e.target.files.length === 0) {
      setSelectedFile(undefined);
      return;
    }
    console.log(e.target.files[0]);

    setSelectedFile(e.target.files[0]);
  };

  const onSubmit: SubmitHandler<IFormInput | any> = async (data) => {
    const finalValuesFromForm = { ...data, imgUrl, selectedFile };
    console.log(imgUrl);

    const formdata = new FormData();
    formdata.append("file", selectedFile);
    formdata.append("email", data.email);
    formdata.append("firstName", data.firstName);
    formdata.append("lastName", data.lastName);
    formdata.append("imageUrl", imgUrl);

    console.log(formdata);

    setFinalValuesFrom(finalValuesFromForm);
    updateProfileDetailsHandler(finalValuesFromForm);
    const response = await fetch("http://localhost:3500/userProfileDetails", {
      method: "POST",
      headers: {
        // "Content-type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: formdata,
    });
    const dataReceived = await response.json();
    console.log(dataReceived);
  };

  const watchFirstName = watch("firstName") || "";
  const watchLastName = watch("lastName") || "";
  const watchEmail = watch("email") || "";

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

          {finalValuesFromForm.imageUrl == undefined && imgUrl == undefined ? (
            <circle cx="153.5" cy="112" r="48" fill="#EEE" />
          ) : (
            <>
              <defs>
                <clipPath id="myCircle">
                  <circle cx="153.5" cy="112" r="48" fill="#FFFFFF" />
                </clipPath>
              </defs>
              <image
                width="500"
                height="350"
                xlinkHref={`${imgUrl}`}
                clip-path="url(#myCircle)"
              />
            </>
          )}
          <g>
            <rect
              width="237"
              height="16"
              x="35"
              y="185"
              fill={
                finalValuesFromForm.firstName == "" &&
                watchFirstName == "" &&
                finalValuesFromForm.lastName == "" &&
                watchLastName == ""
                  ? "#EEE"
                  : undefined
              }
              rx="8"
            />
            <text
              x="35"
              y="200"
              font-family="Verdana"
              font-size="16"
              font-weight="500"
              fill="black"
              text-align="center"
            >
              {finalValuesFromForm.firstName == ""
                ? `${watchFirstName} ${watchLastName}`
                : `${finalValuesFromForm.firstName} ${finalValuesFromForm.lastName}`}
            </text>
          </g>
          <g>
            <rect
              width="237"
              height="8"
              x="35"
              y="214"
              fill={
                finalValuesFromForm.email == "" && watchEmail == ""
                  ? "#EEE"
                  : undefined
              }
              rx="4"
            />
            <text
              x="35"
              y="225"
              font-family="Verdana"
              font-size="13"
              font-weight="500"
              fill="black"
            >
              {finalValuesFromForm.email == ""
                ? watchEmail
                : finalValuesFromForm.email}
            </text>
          </g>
          <g>
            <rect
              x="35"
              y="278"
              width="237"
              height="44"
              fill={
                socialsArrayWithPosition.find(
                  (socialPlatform) =>
                    socialPlatform.name === linkInfo[0]?.platform
                )?.color
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
              {linkInfo[0]?.platform}
            </text>
            {socialsArrayWithPosition
              .find(
                (socialPlatform) =>
                  socialPlatform.name === linkInfo[0]?.platform
              )
              ?.component("50", "290") || null}
            {linkInfo.length > 0 && <ChevronIcon x="240" y="292" />}
          </g>
          <g>
            <rect
              x="35"
              y="342"
              width="237"
              height="44"
              fill={
                socialsArrayWithPosition.find(
                  (socialPlatform) =>
                    socialPlatform.name === linkInfo[1]?.platform
                )?.color
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
              {linkInfo[1]?.platform}
            </text>
            {socialsArrayWithPosition
              .find(
                (socialPlatform) =>
                  socialPlatform.name === linkInfo[1]?.platform
              )
              ?.component("50", "354") || null}
            {linkInfo.length > 1 && <ChevronIcon x="240" y="356" />}
          </g>
          <g>
            <rect
              x="35"
              y="406"
              width="237"
              height="44"
              fill={
                socialsArrayWithPosition.find(
                  (socialPlatform) =>
                    socialPlatform.name === linkInfo[2]?.platform
                )?.color
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
              {linkInfo[2]?.platform}
            </text>
            {socialsArrayWithPosition
              .find(
                (socialPlatform) =>
                  socialPlatform.name === linkInfo[2]?.platform
              )
              ?.component("50", "418") || null}
            {linkInfo.length > 2 && <ChevronIcon x="240" y="420" />}
          </g>
          <g>
            <rect
              x="35"
              y="470"
              width="237"
              height="44"
              fill={
                socialsArrayWithPosition.find(
                  (socialPlatform) =>
                    socialPlatform.name === linkInfo[3]?.platform
                )?.color
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
              {linkInfo[3]?.platform}
            </text>
            {socialsArrayWithPosition
              .find(
                (socialPlatform) =>
                  socialPlatform.name === linkInfo[3]?.platform
              )
              ?.component("50", "482")}
            {linkInfo.length > 3 && <ChevronIcon x="240" y="484" />}
          </g>
          <g>
            <rect
              x="35"
              y="534"
              width="237"
              height="44"
              fill={
                socialsArrayWithPosition.find(
                  (socialPlatform) =>
                    socialPlatform.name === linkInfo[4]?.platform
                )?.color
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
              {linkInfo[4]?.platform}
            </text>
            {socialsArrayWithPosition
              .find(
                (socialPlatform) =>
                  socialPlatform.name === linkInfo[4]?.platform
              )
              ?.component("50", "546")}
            {linkInfo.length > 4 && <ChevronIcon x="240" y="548" />}
          </g>
        </svg>
      </div>
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
                    <img className="width-full h-full" src={imgUrl} />
                  )}
                </div>
              )}
              <label className="pointer relative z-3 text-ctaColor font-bold text-[12px] text-nowrap xl:text-2xl flex flex-col items-center justify-center">
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
                  defaultValue={finalValuesFromForm.firstName}
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
                  defaultValue={finalValuesFromForm.lastName}
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
                  defaultValue={finalValuesFromForm.email}
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
    </div>
  );
};

export default withAuth(Profile);
