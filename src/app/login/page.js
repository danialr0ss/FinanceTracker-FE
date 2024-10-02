"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { FaRegEye } from "react-icons/fa6";
import { FaRegEyeSlash } from "react-icons/fa";
import { useState } from "react";

export default function Page() {
  const [isShowingPassword, setIsShowingPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const toggleShowPassword = (e) => {
    e.preventDefault();
    setIsShowingPassword((prevState) => !prevState);
  };

  const submitForm = (data) => {
    console.log(data);
  };

  return (
    <div className="h-full w-full bg-backgroundColor p-16">
      <div className="w-full h-full rounded-xl bg-white border-2 p-16 flex">
        <img
          className="w-1/2 border rounded-xl object-contain bg-imageBackground"
          src="https://blogs.nottingham.ac.uk/studentlife/files/2019/08/Saving-Budget-Piggy.gif"
        />
        <div className="w-1/2 py-32 px-48">
          <form
            className="flex flex-col justify-center gap-8"
            onSubmit={handleSubmit(submitForm)}
          >
            <span className="text-3xl">Welcome Back!</span>
            <div className="space-y-2">
              <label className="mr-4">Username</label>

              <Input
                {...register("username", { required: true })}
                error={(!!errors.username).toString()}
                placeholder="Username"
              />
            </div>
            <div className="space-y-2">
              <label className="mr-4">Password</label>

              <div className="flex h-full relative">
                <Input
                  type={isShowingPassword ? "text" : "password"}
                  {...register("password", { required: true })}
                  error={(!!errors.password).toString()}
                  placeholder="Password"
                />
                <button
                  className="absolute right-4 top-2.5"
                  onClick={toggleShowPassword}
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
              Don't have an Account? <a className="text-blue-600">Sign Up</a>
            </span>
          </form>
        </div>
      </div>
    </div>
  );
}
