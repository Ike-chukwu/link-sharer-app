"use client";
import Dropdown from "@/app/components/Dropdown";
import ChevronIcon from "@/app/icons/ChevronIcon";
import IconLink from "@/app/icons/IconLink";
import React, { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import Empty from "@/app/icons/Empty";
import InputLink from "@/app/components/link/InputLink";
import { v4 as uuidv4 } from "uuid";
import { userDataStore } from "@/app/store/userdatastore";
import { socialsArrayWithPosition } from "@/app/constants";
import { linkInput, linkObjType } from "@/app/types";
import WithAuth from "@/app/components/ProtectedRoute";
import { useRouter } from "next/navigation";
const Lottie = dynamic(() => import("lottie-react"), { ssr: false });
import Loader from "../../components/Loader.json";
import dynamic from "next/dynamic";

const Link = () => {
  const linksArray = userDataStore((state: any) => state.userData.listOfLinks);
  const accessToken = userDataStore((state: any) => state.userData.accessToken);

  const profileDetails = userDataStore(
    (state: any) => state.userData.personalDetails
  );
  const updateProfileDetailsHandler = userDataStore(
    (state: any) => state.savePersonalDetails
  );
  const updatelistOfLinksArrayHandler = userDataStore(
    (state: any) => state.saveLink
  );
  const router = useRouter();

  const [linkInfo, setLinkInfo] = useState(linksArray);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<linkInput>();
  const [selectedFile, setSelectedFile] = useState<any | null>(
    profileDetails.selectedFile
  );
  const [imgUrl, setimgUrl] = useState<any>(profileDetails.imageUrl);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<null | string>(null);
  const [isSaved, setIsSaved] = useState(false);
  const [isSavedError, setIsSavedError] = useState<null | String>(null);
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
    }
  };

  const removeLinkHandler = (id: string) => {
    const filteredArray = linkInfo.filter(
      (info: linkObjType) => info.id !== id
    );
    setLinkInfo(filteredArray);
  };

  const persistData = async (data: any) => {
    setIsSaved(true);
    try {
      const response = await fetch(
        "https://link-sharer-be.onrender.com/userData",
        {
          method: "POST",
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify(data),
        }
      );
      if (!response.ok) {
        throw new Error("An error occured");
      }
      const dataReceived = await response.json();
    } catch (error) {
      setIsSavedError("An error occured");
    } finally {
      setIsSaved(false);
    }
  };

  const saveData = (e: any) => {
    e.preventDefault();
    updatelistOfLinksArrayHandler(linkInfo);
    persistData(linkInfo);
  };

  useEffect(() => {
    setLinkInfo(linksArray);
  }, [linksArray]);

  useEffect(() => {
    if (!selectedFile) {
      setimgUrl(undefined);
      return;
    }

    const objectUrl = URL.createObjectURL(profileDetails.selectedFile);
    console.log(objectUrl);

    setimgUrl(objectUrl);

    // free memory when ever this component is unmounted
    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedFile]);

  useEffect(() => {
    const fetchUserDetail = async () => {
      try {
        const response = await fetch(
          "https://link-sharer-be.onrender.com/userData",
          {
            method: "GET",
            headers: {
              "Content-type": "application/json",
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        if (!response.ok) {
          throw new Error("An error has occurred");
        }

        const dataReceived = await response.json();
        const {
          email,
          firstName,
          lastName,
          imageUrl,
          selectedFile: selectedFilePath,
        } = dataReceived;
        const newObj = {
          email,
          firstName,
          lastName,
          imageUrl,
          selectedFile,
        };
        setError(null);
        updatelistOfLinksArrayHandler(dataReceived.listOfLinks);

        // Fetch the file as a Blob
        if (selectedFilePath) {
          const fileResponse = await fetch(
            `https://link-sharer-be.onrender.com/images/${selectedFilePath}`
          );
          if (!fileResponse.ok) {
            throw new Error("Failed to fetch the file");
          }
          const fileBlob = await fileResponse.blob();
          const file = new File([fileBlob], selectedFilePath);
          newObj.selectedFile = file;
          setSelectedFile(file);
        }

        updateProfileDetailsHandler(newObj);
      } catch (error) {
        setError("An error has occurred!");
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserDetail();
  }, []);

  if (loading) return <Lottie animationData={Loader} />;
  if (error)
    return (
      <div className="flex items-center justify-center flex-col min-h-[100vh] gap-[2rem]">
        <p className="text-[40px] font-bold text-ctaColor ">Oops!</p>
        <p className="text-[18px] text-ctaColor">An error occured!</p>
        <button
          onClick={() => router.push("/")}
          type="submit"
          className=" transition-opacity duration-[0.4s] hover:opacity-40  bg-ctaColor text-white text-2xl rounded-xl py-5 px-12 capitalize font-bold"
        >
          GO TO LOGIN PAGE
        </button>
      </div>
    );
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
          <Lottie animationData={Loader} />
          <path
            stroke="#737373"
            d="M1 54.5C1 24.953 24.953 1 54.5 1h199C283.047 1 307 24.953 307 54.5v523c0 29.547-23.953 53.5-53.5 53.5h-199C24.953 631 1 607.047 1 577.5v-523Z"
          />
          <path
            fill="#fff"
            stroke="#737373"
            d="M12 55.5C12 30.923 31.923 11 56.5 11h24C86.851 11 92 16.149 92 22.5c0 8.008 6.492 14.5 14.5 14.5h95c8.008 0 14.5-6.492 14.5-14.5 0-6.351 5.149-11.5 11.5-11.5h24c24.577 0 44.5 19.923 44.5 44.5v521c0 24.577-19.923 44.5-44.5 44.5h-195C31.923 621 12 601.077 12 576.5v-521Z"
          />
          {(profileDetails.imgUrl == undefined && imgUrl == undefined) ||
          (profileDetails.imgUrl == "" && imgUrl == "") ? (
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
                profileDetails.firstName == "" && profileDetails.lastName == ""
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
              {profileDetails.firstName == ""
                ? ``
                : `${profileDetails.firstName} ${profileDetails.lastName}`}
            </text>
          </g>
          <g>
            <rect
              width="237"
              height="8"
              x="35"
              y="214"
              fill={profileDetails.email == "" ? "#EEE" : undefined}
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
              {profileDetails.email == "" ? `` : profileDetails.email}
            </text>
          </g>{" "}
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
              (socialsArrayWithPosition
                .find(
                  (socialPlatform) =>
                    socialPlatform.name === linkInfo[0].platform
                )
                ?.component("50", "290") ||
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
              (socialsArrayWithPosition
                .find(
                  (socialPlatform) =>
                    socialPlatform.name === linkInfo[1].platform
                )
                ?.component("50", "354") ||
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
              (socialsArrayWithPosition
                .find(
                  (socialPlatform) =>
                    socialPlatform.name === linkInfo[2].platform
                )
                ?.component("50", "418") ||
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
              (socialsArrayWithPosition
                .find(
                  (socialPlatform) =>
                    socialPlatform.name === linkInfo[3].platform
                )
                ?.component("50", "482") ||
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
              (socialsArrayWithPosition
                .find(
                  (socialPlatform) =>
                    socialPlatform.name === linkInfo[4].platform
                )
                ?.component("50", "546") ||
                null)}
            {linkInfo.length > 4 && <ChevronIcon x="240" y="548" />}
          </g>
        </svg>
      </div>
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
              linkInfo.map((info: linkObjType, index: string) => (
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
            {isSaved ? "saving..." : "save"}
          </button>
        </div>
      </form>
      {/* <div
        className={
          "absolute left-[50%] translate-x-[-50%] bg-black text-white text-[16px] rounded-xl py-5 px-12 transition-all ease-linear duration-300 " +
          (isSaved ? "bottom-[4%] opacity-1" : "bottom-[2%] opacity-0")
        }
      >
        Your changes have been successfully saved!
      </div> */}
    </div>
  );
};

export default WithAuth(Link);
