import React from "react";

type Props = {
  x?: string;
  y?: string;
};

const TwitterIcon = (props: Props) => {
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
      <path
        d="M14.973 3.99984C14.4597 4.23317 13.9064 4.3865 13.333 4.45984C13.9197 4.1065 14.373 3.5465 14.5864 2.87317C14.033 3.2065 13.4197 3.43984 12.773 3.57317C12.2464 2.99984 11.5064 2.6665 10.6664 2.6665C9.0997 2.6665 7.8197 3.9465 7.8197 5.5265C7.8197 5.75317 7.84637 5.97317 7.89303 6.17984C5.5197 6.05984 3.40637 4.91984 1.9997 3.19317C1.75303 3.61317 1.61303 4.1065 1.61303 4.6265C1.61303 5.61984 2.11303 6.49984 2.88637 6.99984C2.41303 6.99984 1.97303 6.8665 1.58637 6.6665V6.6865C1.58637 8.07317 2.57303 9.23317 3.8797 9.49317C3.46019 9.60798 3.01976 9.62395 2.59303 9.53984C2.77411 10.1082 3.12873 10.6054 3.60704 10.9618C4.08536 11.3181 4.66333 11.5156 5.2597 11.5265C4.24879 12.3268 2.9957 12.7594 1.70637 12.7532C1.4797 12.7532 1.25303 12.7398 1.02637 12.7132C2.29303 13.5265 3.7997 13.9998 5.41303 13.9998C10.6664 13.9998 13.553 9.63984 13.553 5.85984C13.553 5.73317 13.553 5.61317 13.5464 5.4865C14.1064 5.0865 14.5864 4.57984 14.973 3.99984Z"
        fill={props.x ? "white" : "#737373"}
      />
    </svg>
  );
};

export default TwitterIcon;
