"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { useLoginMutation } from "@/store/slices/api/authApi";
import { ActionStatus } from "@/components/ActionStatus";
import { useRouter } from "next/navigation";
import PasswordInput from "@/components/passwordInput";
import LoadingSpinner from "@/components/LoadingSpinner";

export default function Page() {
  const router = useRouter();
  const imageSrc = "/loginImage.gif";
  const { register, handleSubmit } = useForm();
  const [IsLoadingImage, setIsLoadingImage] = useState(true);
  const [login] = useLoginMutation();
  const [loginErrorMessage, setLoginErrorMessage] = useState("");
  const [isLoadingPage, setIsLoadingPage] = useState(false);

  const submitForm = async (data) => {
    try {
      setIsLoadingPage(true);
      await login(data).unwrap();
      router.push("/dashboard");
      document.cookie = `username=${data.name};`;
    } catch (err) {
      setLoginErrorMessage(err.data.message);
    }
  };

  useEffect(() => {
    const img = new Image();
    img.src = imageSrc;

    img.onload = () => {
      setIsLoadingImage(false);
    };

    img.onerror = () => {
      setIsLoadingImage(false);
    };
  }, [imageSrc]);

  useEffect(() => {
    setTimeout(() => {
      setLoginErrorMessage("");
    }, 5000);
  }, [loginErrorMessage]);

  return (
    <div className="h-full w-full bg-backgroundColor p-16 relative">
      {isLoadingPage && (
        <div className="absolute h-full w-full backdrop-blur-lg z-10 top-0 left-0">
          <LoadingSpinner className="w-64 h-64 absolute  transform top-1/2 left-1/2 z-10 -translate-x-1/2 -translate-y-1/2 " />
        </div>
      )}
      <div className="w-full h-full rounded-xl bg-white border-2 p-16 flex">
        <div
          className={`w-1/2 border-2 rounded-xl flex justify-center items-center overflow-hidden`}
        >
          {IsLoadingImage ? (
            <LoadingSpinner className="w-32 h-32 flex justify-center items-center " />
          ) : (
            <img
              className={`w-full h-full object-contain bg-imageBackground`}
              src={imageSrc}
              alt="Financial Illustration"
              loading="lazy"
            />
          )}
        </div>
        <div className="w-1/2 py-32 pl-48 pr-32 relative">
          <form
            className="flex flex-col justify-center gap-8"
            onSubmit={handleSubmit(submitForm)}
          >
            <div className="flex flex-col gap-4 pb-2">
              <span className="text-4xl">Welcome Back!</span>
              <span className="text-xl text-gray-500">
                Login to your account
              </span>
            </div>
            <div
              className={`w-[510px] absolute top-56 transition-opacity duration-300 ease-in-out ${loginErrorMessage ? "opacity-100" : "opacity-0"}`}
            >
              {loginErrorMessage && (
                <ActionStatus
                  variant={"destructive"}
                  description={loginErrorMessage}
                />
              )}
            </div>
            <div
              className={`flex flex-col gap-8 transition-transform duration-200 ease-in-out ${loginErrorMessage ? "translate-y-16" : ""}`}
            >
              <div className={`space-y-2`}>
                <label className="mr-4">Username</label>

                <Input
                  {...register("name", { required: true })}
                  placeholder="Username"
                />
              </div>
              <PasswordInput
                label={"Password"}
                register={register("password", { required: true })}
              />
              <Button type="submit">Log In</Button>
              <span>
                Don't have an account?{" "}
                <a
                  className="text-blue-600"
                  href="/register"
                  onClick={() => setIsLoadingPage(true)}
                >
                  Register
                </a>
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
