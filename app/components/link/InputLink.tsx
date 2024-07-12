"use client";
import { arrayofLinks } from "@/app/types";
import React, { useState } from "react";

type Props = {
  placeholder: string;
  pattern: string;
  id: string;
  linkInfo: arrayofLinks;
  setLinkInfo: React.Dispatch<React.SetStateAction<arrayofLinks>>;
};

const InputLink = (props: Props) => {
  const [inputValue, setInputValue] = useState(() => {
    const foundInfo = props.linkInfo.find((info: any) => info.id === props.id);
    return foundInfo ? foundInfo.link : "";
  });

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    const value = e.target.value;
    let linkInfoCopy = [...props.linkInfo];
    const concernedObject = linkInfoCopy.find((info) => info.id === props.id);
    if (concernedObject) {
      // Check if concernedObject is not undefined
      let concernedObjectIndex = linkInfoCopy.findIndex(
        (info) => info.id === props.id
      );
      const concernedObjectCopy = { ...concernedObject }; // Define type for concernedObjectCopy
      concernedObjectCopy.link = value;
      linkInfoCopy[concernedObjectIndex] = concernedObjectCopy;
      props.setLinkInfo(linkInfoCopy);
    }
  };

  return (
    <>
      <input
        onChange={onChangeHandler}
        value={inputValue}
        className="w-full text-2xl bg-none outline-none ... peer ... invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-500"
        placeholder={props.placeholder}
        pattern={props.pattern}
        required
      />
      <span className="mt-2 hidden lg:text-[14px] text-nowrap text-red-500 peer-[&:not(:placeholder-shown):not(:focus):invalid]:block">
        Please enter a valid link
      </span>
    </>
  );
};

export default InputLink;
