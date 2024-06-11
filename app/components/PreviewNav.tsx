import Link from "next/link";
import React, { useState } from "react";

const PreviewNav = () => {
  const [copiedLink, setCopiedLink] = useState<string>("");

  const copyToClipboard = (e: React.MouseEvent<HTMLElement>) => {
    navigator.clipboard.writeText(window.location.toString());
    setCopiedLink(window.location.toString());
    console.log("yes");
  };

  return (
    <nav className="flex justify-between items-center relative lg:w-[850px] xl:w-[1200px] mx-auto px-8 bg-white pb-8 lg:py-6 rounded-2xl">
      <Link href="/link">
        <button className="outline-none border-[1px] rounded-xl border-ctaColor px-10 py-5">
          <span className="text-2xl text-ctaColor capitalize font-bold ">
            Back to Editor
          </span>
        </button>
      </Link>
      <button
        onClick={copyToClipboard}
        className="outline-none bg-ctaColor rounded-xl px-10 py-5"
      >
        <span className="text-2xl text-white capitalize font-bold ">
          {copiedLink == "" ? "share link" : "Link copied!"}
        </span>
      </button>
    </nav>
  );
};

export default PreviewNav;
