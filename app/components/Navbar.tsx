"use client";
import React, { useState } from "react";
import Logo from "../icons/Logo";
import MobileLogo from "../icons/MobileLogo";
import Link from "next/link";
import IconLink from "../icons/IconLink";
import ProfileDetailsIcon from "../icons/ProfileDetailsIcon";
import PreviewIcon from "../icons/PreviewIcon";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const pathname = usePathname();

  return (
    <nav className="flex justify-between items-center relative w-full mx-auto px-8 bg-white py-8 rounded-xl">
      <Logo />
      <MobileLogo />

      <div className="flex items-center gap-2 lg:gap-[3rem] absolute translate-x-[-50%] left-[50%] top-[50%] translate-y-[-50%] ">
        <Link href="/link" style={{ textDecoration: "none" }}>
          <button
            className={
              "px-10 py-5 transition ease-in-out duration-[.5s]  hover:bg-[#EFEBFF] outline-none flex items-center justify-center gap-3 rounded-xl " +
              (pathname === "/link" ? "bg-[#EFEBFF]" : null)
            }
          >
            <IconLink />
            <span
              className={
                "hidden  lg:block text-2xl capitalize font-bold " +
                (pathname === "/link" ? "text-ctaColor" : "text-bodyCopyColor")
              }
            >
              links
            </span>
          </button>
        </Link>
        <Link href="/profile" style={{ textDecoration: "none" }}>
          <button
            className={
              "px-10 transition ease-in-out duration-[.5s] hover:bg-[#EFEBFF] py-5 flex outline-none items-center gap-3 rounded-xl " +
              (pathname === "/profile" ? "bg-[#EFEBFF]" : null)
            }
          >
            <ProfileDetailsIcon />
            <span
              className={
                "hidden lg:block text-2xl capitalize font-bold " +
                (pathname === "/profile"
                  ? "text-ctaColor"
                  : "text-bodyCopyColor")
              }
            >
              profile details
            </span>
          </button>
        </Link>
      </div>

      <Link href="/preview">
        <button className="outline-none hidden lg:block">
          <span className="text-2xl transition ease-in-out duration-[.5s] hover:bg-[#EFEBFF] text-ctaColor capitalize border-[1px] border-ctaColor rounded-xl font-bold px-10 py-4">
            preview
          </span>
        </button>
      </Link>

      <Link
        href="/preview"
        className="block lg:hidden border-[1px] border-ctaColor py-2 px-4 rounded-xl pointer"
      >
        <PreviewIcon />
      </Link>
    </nav>
  );
};

export default Navbar;
