"use client";
import PreviewNav from "@/app/components/PreviewNav";
import ChevronIcon from "@/app/icons/ChevronIcon";
import { userDataStore } from "@/app/store/userdatastore";
import React, { useEffect, useState } from "react";
import { socialsArrayWithPosition } from "@/app/constants";
import { useRouter } from "next/navigation";
import Lottie from "lottie-react";
import Loader from "../../components/Loader.json";

const Previewse = ({ params }: any) => {
  const personalInfoHolder = userDataStore(
    (state: any) => state.userData.personalDetails
  );
  const linkInfo = userDataStore((state: any) => state.userData.listOfLinks);
  const [selectedFile, setSelectedFile] = useState(
    personalInfoHolder.selectedFile
  );
  const uniqueIdentifier = userDataStore(
    (state: any) => state.userData.uniqueIdentifier
  );
  const updateProfileDetailsHandler = userDataStore(
    (state: any) => state.savePersonalDetails
  );
  const updatelistOfLinksArrayHandler = userDataStore(
    (state: any) => state.saveLink
  );
  const updateUniqueIdentifier = userDataStore(
    (state: any) => state.setUniqueIdentifier
  );
  const router = useRouter();

  const [imgUrl, setImgUrl] = useState(personalInfoHolder.imageUrl);
  const [loading, setIsLoading] = useState(true);
  const [error, setIsError] = useState<null | string>(null);

  useEffect(() => {
    const fetchUserDetail = async (id: any) => {
      try {
        const response = await fetch("https://link-sharer-be.onrender.com/previewUserData", {
          method: "GET",
          headers: {
            "Content-type": "application/json",
            Authorization: `Basic ${id}`,
          },
        });
        if (!response.ok) {
          throw new Error("An error has occured");
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
        setIsError(null);
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
        setIsError("An error has occcured!");
      } finally {
        setIsLoading(false);
      }
    };

    if (
      uniqueIdentifier == "" ||
      uniqueIdentifier == null ||
      uniqueIdentifier == undefined
    ) {
      fetchUserDetail(params?.userId);
      updateUniqueIdentifier(params?.userId);
    } else {
      setIsLoading(false);
    }
  }, []);

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

export default Previewse;
