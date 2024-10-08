"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { FaRegEye } from "react-icons/fa6";
import { FaRegEyeSlash } from "react-icons/fa";
import { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";

export default function Page() {
  const [isShowingPassword, setIsShowingPassword] = useState(false);
  const imageSrc = "/loginImage.gif";
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [isLoading, setIsLoading] = useState(true);

  const showPassword = (e) => {
    e.preventDefault();
    setIsShowingPassword(true);
  };

  const hidePassword = (e) => {
    e.preventDefault();
    setIsShowingPassword(false);
  };

  const submitForm = (data) => {
    console.log(data);
  };

  useEffect(() => {
    const img = new Image();
    img.src = imageSrc;

    img.onload = () => {
      setIsLoading(false);
    };

    img.onerror = () => {
      setIsLoading(false);
    };
  }, [imageSrc]);

  return (
    <div className="h-full w-full bg-backgroundColor p-16">
      <div className="w-full h-full rounded-xl bg-white border-2 p-16 flex">
        <div
          className={`w-1/2 border-2 rounded-xl flex justify-center items-center overflow-hidden`}
        >
          {isLoading ? (
            <Skeleton className={`h-full w-full rounded-xl`} />
          ) : (
            <img
              className={`w-full h-full object-contain bg-imageBackground`}
              src={imageSrc}
              alt="Financial Illustration"
            />
          )}
        </div>
        <div className="w-1/2 py-32 pl-48 pr-32">
          <form
            className="flex flex-col justify-center gap-8"
            onSubmit={handleSubmit(submitForm)}
          >
            <span className="text-3xl">Welcome Back!</span>
            <div className="space-y-2">
              <label className="mr-4">Username</label>

              <Input
                {...register("username", { required: true })}
                placeholder="Username"
              />
            </div>
            <div className="space-y-2">
              <label className="mr-4">Password</label>

              <div className="flex h-full relative">
                <Input
                  type={isShowingPassword ? "text" : "password"}
                  {...register("password", { required: true })}
                  placeholder="Password"
                />
                <button
                  className="absolute right-4 top-2.5"
                  onMouseDown={showPassword}
                  onMouseUp={hidePassword}
                >
                  {isShowingPassword ? (
                    <FaRegEyeSlash className="text-xl" />
                  ) : (
                    <FaRegEye className="text-xl" />
                  )}
                </button>
              </div>
            </div>
            <Button type="submit">Log In</Button>
            <span>
              Don't have an account?{" "}
              <a className="text-blue-600" href="/register">
                Sign Up
              </a>
            </span>
          </form>
        </div>
      </div>
    </div>
  );
}
