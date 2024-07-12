"use client";
import LargeIcon from "../icons/LargeIcon";
import { z } from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Password from "../icons/Password";
import Email from "../icons/Email";
import { SyntheticEvent, useState } from "react";

export default function Home() {
  const SignUpSchema = z
    .object({
      email: z.string().email(),
      password: z.string().min(3).max(20),
      confirmPassword: z.string().min(3).max(20),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: "Passwords don't match",
      path: ["confirmPassword"], // path of error
    });

  type SignUpSchemaType = z.infer<typeof SignUpSchema>;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpSchemaType>({ resolver: zodResolver(SignUpSchema) });
  const [error, setError] = useState<null | string>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const router = useRouter();

  const onSubmit: SubmitHandler<SignUpSchemaType> = async (data) => {
    setLoading(true);
    try {
      const response = await fetch("https://link-sharer-be.onrender.com/register", {
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
      setError(null);
      router.push("/");
    } catch (error) {
      setError("An error has occcured!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="px-8 landscape:py-[5rem] lg:px-0 flex flex-col items-center min-h-[100vh] justify-center gap-8 lg:gap-24">
      <LargeIcon />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="lg:px-8 w-full lg:w-[430px] py-16 lg:shadow-bShadow space-y-16 rounded-2xl"
      >
        <div className=" lg:px-8 space-y-5">
          <h1 className="font-bold text-4xl lg:text-5xl capitalize">
            Create account
          </h1>
          <p className="text-2xl text-bodyCopyColor">
            Let’s get you started sharing your links!
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
                type="password"
                placeholder="At least 3 characters"
                className="text-2xl w-full outline-none "
                {...register("password")}
              />
            </div>
            {errors.password && (
              <p className="text-xl text-red-500">{errors.password.message}</p>
            )}
          </div>
          <div className="space-y-2">
            <p className="text-xl">Confirm password</p>
            <div
              className={
                "flex w-full gap-6 border-[1px] border-[#D9D9D9] bg-white items-center relative px-4 py-6 rounded-xl " +
                (errors.confirmPassword && "border-2 border-red-500")
              }
            >
              <Password />
              <input
                type="password"
                placeholder="At least 3 characters"
                className="text-2xl w-full outline-none "
                {...register("confirmPassword")}
              />
            </div>
            {errors.confirmPassword && (
              <p className="text-xl text-red-500">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="bg-ctaColor text-white w-full rounded-xl py-6 text-2xl"
          >
            {loading ? "Loading..." : "Sign Up"}
          </button>

          <p className="text-2xl text-bodyCopyColor text-center ">
            Already have an account? <br className="block lg:hidden" />
            <Link href="/">
              <span className="text-[#beadff]">Login</span>
            </Link>
          </p>
          {error && (
            <p className="text-2xl text-red-500 text-center">{error}</p>
          )}
        </div>
      </form>
    </div>
  );
}
