"use client";
import Image from "next/image";
import Logo from "./icons/Logo";
import GithubIcon from "./icons/GithubIcon";
import GithubGreyIcon from "./icons/GithubGreyIcon";
import LargeIcon from "./icons/LargeIcon";
import { z } from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Email from "./icons/Email";
import Password from "./icons/Password";
import { useState } from "react";
import { userDataStore } from "./store/userdatastore";
// import { useRouter } from "next/navigation";

export default function Home() {
  const SignInSchema = z.object({
    email: z.string().email(),
    password: z.string().min(3).max(20),
  });

  type SignInSchemaType = z.infer<typeof SignInSchema>;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInSchemaType>({ resolver: zodResolver(SignInSchema) });
  const [error, setError] = useState<null | string>(null);

  const router = useRouter();
  const accessToken = userDataStore((state: any) => state.userData.accessToken);
  const updateAccessToken = userDataStore((state: any) => state.setAccessToken);
  const updateUniqueIdentifier = userDataStore((state: any) => state.setUniqueIdentifier);

  const onSubmit: SubmitHandler<SignInSchemaType> = async (data) => {
    console.log(data);
    try {
      const response = await fetch("http://localhost:3500/login", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        throw new Error("An error has occured");
      }
      const dataReceived = await response.json();
      console.log(dataReceived.accessToken);
      console.log(dataReceived.uniqueIdentifier);
      updateAccessToken(dataReceived.accessToken);
      updateUniqueIdentifier(dataReceived.uniqueIdentifier)
      setError(null);
      router.push("/link");
    } catch (error) {
      setError("An error has occcured!");
      console.log(error);
    }
  };

  return (
    <div className="px-8 lg:px-0 flex flex-col items-center min-h-[100vh] justify-center gap-8 lg:gap-24">
      <LargeIcon />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="lg:px-8 w-full lg:w-[430px] py-16 lg:shadow-bShadow space-y-16 rounded-2xl"
      >
        <div className=" lg:px-8 space-y-5">
          <h1 className="font-bold text-4xl lg:text-5xl capitalize">login</h1>
          <p className="text-2xl text-bodyCopyColor">
            Add your details below to get back into the app
          </p>
        </div>
        <div className=" lg:px-8 space-y-10">
          <div className="space-y-2">
            <p className="text-xl">Email address</p>
            <div
              className={
                "flex w-full gap-6 border-[1px] border-[#D9D9D9] bg-white items-center relative px-4 py-6 rounded-xl " +
                (errors.email && "border-2 border-red-500")
              }
            >
              <Email />
              <input
                type="text"
                placeholder="e.g.alex@email.com"
                className="text-2xl w-full outline-none"
                {...register("email")}
              />
            </div>
            {errors.email && (
              <p className="text-xl text-red-500">{errors.email.message}</p>
            )}
          </div>
          <div className="space-y-2">
            <p className="text-xl">Password</p>
            <div
              className={
                "flex w-full gap-6 border-[1px] border-[#D9D9D9] bg-white items-center relative px-4 py-6 rounded-xl " +
                (errors.password && "border-2 border-red-500")
              }
            >
              <Password />
              <input
                type="text"
                placeholder="Enter your password"
                className="text-2xl w-full outline-none "
                {...register("password")}
              />
            </div>
            {errors.password && (
              <p className="text-xl text-red-500">{errors.password.message}</p>
            )}
          </div>

          <button
            type="submit"
            className="bg-ctaColor text-white w-full rounded-xl py-6 text-2xl"
          >
            Login
          </button>

          <p className="text-2xl text-bodyCopyColor text-center ">
            Don't have an account? <br className="block lg:hidden" />
            <Link href="/signup">
              <span className="text-[#beadff]">Create account</span>
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
}
