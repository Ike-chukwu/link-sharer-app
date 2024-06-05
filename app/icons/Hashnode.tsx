import React from "react";

type Props = {
  x?: string;
  y?: string;
};

const Hashnode = (props: Props) => {
  return (
    <svg
      x={props.x}
      y={props.y}
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clip-path="url(#clip0_86_26153)">
        <path
          d="M1.09945 5.34713C-0.366484 6.78463 -0.366484 9.18775 1.09945 10.6534L5.34664 14.9003C6.78414 16.3659 9.18727 16.3659 10.6529 14.9003L14.8998 10.6534C16.3654 9.18775 16.3654 6.78463 14.8998 5.34713L10.6529 1.09994C9.18727 -0.365996 6.78414 -0.365996 5.34664 1.09994L1.09945 5.34713ZM9.85914 9.85963C8.83102 10.8846 7.16852 10.8846 6.14352 9.85963C5.11539 8.8315 5.11539 7.169 6.14352 6.144C7.16852 5.11588 8.83102 5.11588 9.85914 6.144C10.8841 7.169 10.8841 8.8315 9.85914 9.85963Z"
          fill={props.x ? "white" : "#737373"}
        />
      </g>
      <defs>
        <clipPath id="clip0_86_26153">
          <rect width="16" height="16" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};

export default Hashnode;
