import Link from "next/link";
import React from "react";

const PreviewNav = () => {
  return (
    <nav className="flex justify-between items-center relative lg:w-[850px] xl:w-[1200px] mx-auto px-8 bg-white pb-8 lg:py-6 rounded-2xl">
      <Link href="/link">
        <button className="outline-none border-[1px] rounded-xl border-ctaColor px-10 py-5">
          <span className="text-2xl text-ctaColor capitalize font-bold ">
            Back to Editor
          </span>
        </button>
      </Link>
      <button className="outline-none bg-ctaColor rounded-xl px-10 py-5">
        <span className="text-2xl text-white capitalize font-bold ">
          share link
        </span>
      </button>
    </nav>
  );
};

export default PreviewNav;
