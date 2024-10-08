"use client";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { useState, useEffect } from "react";
import { FaRegEye } from "react-icons/fa6";
import { FaRegEyeSlash } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { useRegisterUserMutation } from "@/store/slices/authApi";
import { ActionStatus } from "@/components/ActionStatus";
import { Skeleton } from "@/components/ui/skeleton";

export default function Page() {
  const [isShowingPassword, setIsShowingPassword] = useState(false);
  const [isShowingRetyped, setIsShowingRetyped] = useState(false);
  const [isMatchingPassword, setIsMatchingPassword] = useState(true);
  const [registerUser, { isSuccess, isError }] = useRegisterUserMutation();
  const matchingErrorMessage = "passwords do not match";
  const [registrationErrorMessage, setRegistrationErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const imageSrc = "/registerImage.jpeg";

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const changeState = (e, setter, state) => {
    e.preventDefault();
    setter(state);
  };

  const submitForm = async (data) => {
    if (data.password !== data.retyped) {
      setIsMatchingPassword(false);
      return;
    }

    //hide error message if they were shown before
    setIsMatchingPassword(true);

    try {
      //format data so api can accept
      const body = {
        user: { name: data.username, password: data.password },
        //default value for new user balance
        account: { balance: 1000 },
      };
      const response = await registerUser(body);

      if (isError) {
        setRegistrationErrorMessage(response.error.data.message);
      }

      reset();
    } catch (err) {
      console.error("Error registering new user, ", err.error);
    }
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
        <div className="w-1/2 flex items-center pr-48 pl-32">
          <form
            className="w-full flex flex-col justify-center gap-8"
            onSubmit={handleSubmit(submitForm)}
          >
            {isSuccess && (
              <ActionStatus
                variant={"success"}
                description="User Registered Successfully"
              />
            )}
            {isError && (
              <ActionStatus
                variant={"destructive"}
                description={registrationErrorMessage}
              />
            )}
            <span className="text-3xl">Create an account</span>
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
                errors={errors?.username}
              />
            </div>
            <div className="space-y-2">
              <div>
                <label className="mr-4">Password</label>
                <label className="text-error text-xs">
                  {errors.password?.message}
                  {!isMatchingPassword && matchingErrorMessage}
                </label>
              </div>
              <div className="flex h-full relative">
                <Input
                  className={
                    (errors.password || !isMatchingPassword) && "border-error"
                  }
                  type={isShowingPassword ? "text" : "password"}
                  {...register("password", { required: "required" })}
                  placeholder="Password"
                  errors={errors.password}
                />
                <button
                  className="absolute right-4 top-2.5"
                  onMouseDown={(e) =>
                    changeState(e, setIsShowingPassword, true)
                  }
                  tabIndex="-1"
                  onMouseUp={(e) => changeState(e, setIsShowingPassword, false)}
                >
                  {isShowingPassword ? (
                    <FaRegEyeSlash className="text-xl" />
                  ) : (
                    <FaRegEye className="text-xl" />
                  )}
                </button>
              </div>
            </div>
            <div className="space-y-2">
              <div>
                <label className="mr-4">Re-type Password</label>
                <label className="text-error text-xs">
                  {errors.retyped?.message}
                  {!isMatchingPassword && matchingErrorMessage}
                </label>
              </div>
              <div className="flex h-full relative">
                <Input
                  className={
                    (errors.retyped || !isMatchingPassword) && "border-error"
                  }
                  type={isShowingRetyped ? "text" : "password"}
                  {...register("retyped", { required: "required" })}
                  placeholder="Password"
                  errors={errors?.retyped}
                />
                <button
                  className="absolute right-4 top-2.5"
                  tabIndex="-1"
                  onMouseDown={(e) => changeState(e, setIsShowingRetyped, true)}
                  onMouseUp={(e) => changeState(e, setIsShowingRetyped, false)}
                >
                  {isShowingRetyped ? (
                    <FaRegEyeSlash className="text-xl" />
                  ) : (
                    <FaRegEye className="text-xl" />
                  )}
                </button>
              </div>
            </div>
            <Button type="submit">Create account</Button>
            <span>
              Already have an account?{" "}
              <a className="text-blue-600" href="/login">
                Login
              </a>
            </span>
          </form>
        </div>
        <div className="w-1/2 border-2 rounded-xl flex justify-center items-center overflow-hidden">
          {isLoading ? (
            <Skeleton className={`h-full w-full rounded-xl`} />
          ) : (
            <img
              className={`object-cover`}
              src={imageSrc}
              alt="Team Discussion"
            />
          )}
        </div>
      </div>
    </div>
  );
}
