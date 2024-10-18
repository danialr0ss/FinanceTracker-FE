import { useState } from "react";
import { Input } from "./ui/input";
import { FaRegEyeSlash, FaRegEye } from "react-icons/fa6";

export default function PasswordInput({ register, label, errorMessage }) {
  const [isShowingPassword, setIsShowingPassword] = useState(false);

  const showPassword = () => {
    setIsShowingPassword(true);
  };
  const hidePassword = () => {
    setIsShowingPassword(false);
  };

  return (
    <div className={`space-y-2`}>
      <label className="mr-4">
        {label}
        <span className={"text-xs text-destructive ml-4"}>{errorMessage}</span>
      </label>
      <div className="flex h-full relative">
        <Input
          className={errorMessage && "border-error"}
          type={isShowingPassword ? "text" : "password"}
          {...register}
          placeholder={label}
        />
        <button
          className="absolute right-4 top-2.5"
          type="button"
          onMouseDown={showPassword}
          onTouchStart={showPassword}
          onMouseUp={hidePassword}
          onTouchEnd={hidePassword}
          tabIndex="-1"
        >
          {isShowingPassword ? (
            <FaRegEyeSlash className="text-xl" />
          ) : (
            <FaRegEye className="text-xl" />
          )}
        </button>
      </div>
    </div>
  );
}
