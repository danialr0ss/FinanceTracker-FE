"use client";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useRegisterUserMutation } from "@/store/slices/api/authApi";
import { ActionStatus } from "@/components/ActionStatus";
import Image from "next/image";
import PasswordInput from "@/components/PasswordInput";
import LoadingSpinner from "@/components/LoadingSpinner";

export default function Page() {
  const [passwordMismatchMessage, setPasswordMismatchMessage] = useState("");
  const [registerUser] = useRegisterUserMutation();
  const [registerErrorMessage, setRegisterErrorMessage] = useState("");
  const [registerSuccessMessage, setRegisterSuccessMessage] = useState("");
  const [isLoadingImage, setIsLoadingImage] = useState(true);
  const imageSrc = "/registerImage.jpeg";
  const [isLoadingPage, setIsLoadingPage] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const submitForm = async (data) => {
    if (data.password !== data.retyped) {
      setPasswordMismatchMessage("passwords do not match");
      return;
    }

    //hide error message if they were shown before
    setPasswordMismatchMessage("");

    try {
      //format data so api can accept
      const body = {
        user: { name: data.username, password: data.password },
        //default value for new user balance
        account: { balance: 1000 },
      };
      await registerUser(body).unwrap();
      // remove old notification if showing
      setRegisterErrorMessage("");
      setRegisterSuccessMessage("User Registered Successfully");
      reset();
    } catch (err) {
      // remove old notification if showing
      setRegisterSuccessMessage("");
      setRegisterErrorMessage(err.data.message);
    }
  };
  useEffect(() => {
    setTimeout(() => {
      setRegisterErrorMessage("");
    }, 5000);
  }, [registerErrorMessage]);

  useEffect(() => {
    setTimeout(() => {
      setRegisterSuccessMessage("");
    }, 5000);
  }, [registerSuccessMessage]);

  return (
    <div className="h-full w-full bg-backgroundColor p-16 relative">
      {isLoadingPage && (
        <div className="absolute h-full w-full backdrop-blur-lg z-10 top-0 left-0">
          <LoadingSpinner className="w-64 h-64 absolute  transform top-1/2 left-1/2 z-10 -translate-x-1/2 -translate-y-1/2 " />
        </div>
      )}
      <div className="w-full h-full rounded-xl bg-white border-2 p-16 flex">
        <div className="w-1/2 flex items-center pr-48 pl-32 relative">
          <form
            className="w-full flex flex-col justify-center gap-8"
            onSubmit={handleSubmit(submitForm)}
          >
            <div className="flex flex-col gap-4 pb-4">
              <span className="text-4xl">Get Started with Us!</span>
              <span className="text-xl text-gray-500">Create an account</span>
            </div>

            <div
              className={`absolute w-[510px] top-44 transition-opacity duration-300 ease-in-out ${registerSuccessMessage || registerErrorMessage ? "opacity-100" : "opacity-0"}`}
            >
              {registerSuccessMessage && (
                <ActionStatus
                  variant={"success"}
                  description={registerSuccessMessage}
                />
              )}

              {registerErrorMessage && (
                <ActionStatus
                  variant={"destructive"}
                  description={registerErrorMessage}
                />
              )}
            </div>
            <div
              className={`w-full flex flex-col gap-8 transition-transform duration-200 ease-in-out ${registerSuccessMessage || registerErrorMessage ? "translate-y-16" : ""}`}
            >
              <div className="space-y-2">
                <div>
                  <label className="mr-4">Username</label>
                  <label className="text-error text-xs">
                    {errors.username?.message}
                  </label>
                </div>
                <Input
                  className={errors.username && "border-error"}
                  {...register("username", { required: "required" })}
                  placeholder="Username"
                  errors={errors.username}
                />
              </div>
              <PasswordInput
                label="New Password"
                register={register("password", { required: "required" })}
                errorMessage={
                  errors.password?.message || passwordMismatchMessage
                }
              />
              <PasswordInput
                label="Retyped Password"
                register={register("retyped", { required: "required" })}
                errorMessage={
                  errors.retyped?.message || passwordMismatchMessage
                }
              />
              <div className="text-destructive text-xs"></div>
              <Button type="submit">Create account</Button>
              <span>
                Already have an account?{" "}
                <a
                  className="text-blue-600"
                  href="/login"
                  onClick={() => setIsLoadingPage(true)}
                >
                  Login
                </a>
              </span>
            </div>
          </form>
        </div>
        <div className="w-1/2 border-2 rounded-xl flex justify-center items-center overflow-hidden relative">
          <Image
            className={`object-contain`}
            src={imageSrc}
            onLoad={() => setIsLoadingImage(false)}
            onError={() => setIsLoadingImage(false)}
            width={830}
            height={830}
            alt="Team Discussion"
            loading="lazy"
          />
          {isLoadingImage && (
            <div className="absolute w-full h-full bg-white flex justify-center items-center">
              <LoadingSpinner className=" w-32 h-32" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
