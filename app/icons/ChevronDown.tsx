import React from "react";

type Props = {
  isDropdownActive: boolean;
  setDropdownActive: React.Dispatch<React.SetStateAction<boolean>>;
};

const ChevronDown = (props: Props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="14"
      height="9"
      fill="none"
      viewBox="0 0 14 9"
      onClick={() => props.setDropdownActive(!props.isDropdownActive)}
      className={
        "cursor-pointer " + (props.isDropdownActive ? "rotate-[180deg]" : "rotate-[0deg]")
      }
    >
      <path stroke="#633CFF" stroke-width="2" d="m1 1 6 6 6-6" />
    </svg>
  );
};

export default ChevronDown;
