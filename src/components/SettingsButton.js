"use client";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTrigger,
  DialogTitle,
} from "@/components/ui/dialog";
import { DialogFooter, DialogHeader } from "./ui/dialog";
import { RiAccountCircleLine } from "react-icons/ri";
import { Button } from "./ui/button";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "./ui/accordion";
import { useForm } from "react-hook-form";
import { useState } from "react";
import PasswordInput from "./PasswordInput";
import { ActionStatus } from "./ActionStatus";
import { useChangePasswordMutation } from "@/store/slices/api/authApi";
import { useEffect } from "react";

export default function SettingsButton() {
  const [changePasswordMessage, setChangePasswordMesssage] = useState("");
  const successPasswordChangeMessage = "Password successfully changed";
  const failedPasswordChangeMessage = "Password change failed";
  const [passwordMismatchMessage, setPasswordMismatchMessage] = useState("");
  const [changePassword] = useChangePasswordMutation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleChangePassword = async (data) => {
    const newPassword = data.newPassword;
    const retypedPassword = data.retypedPassword;

    if (newPassword !== retypedPassword) {
      setPasswordMismatchMessage("new passwords do not match");
      return;
    } else {
      setPasswordMismatchMessage("");
      delete data.retypePassword;
    }

    const body = { password: data.oldPassword, newPassword: data.newPassword };

    try {
      await changePassword(body).unwrap();
      setChangePasswordMesssage(successPasswordChangeMessage);
    } catch (err) {
      setChangePasswordMesssage(failedPasswordChangeMessage);
    }
  };

  useEffect(() => {
    setTimeout(() => {
      setChangePasswordMesssage("");
    }, 5000);
  }, [changePasswordMessage]);

  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <button
            className="transition-colors duration-150 ease-in-out w-56 h-56 p-4 rounded-xl border-2 border-gray-500 flex flex-col justify-evenly items-center hover:bg-gray-500 hover:text-white gap-4"
            //   onClick={() => setIsDialogOpen(true)}
          >
            <div className="text-center text-lg font-bold">
              Account Settings
            </div>
            <RiAccountCircleLine className="text-[80px]" />
          </button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className={"font-bold"}>Settings</DialogTitle>
          </DialogHeader>

          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger>Change Password</AccordionTrigger>
              <form onSubmit={handleSubmit(handleChangePassword)}>
                <AccordionContent
                  className={`relative space-y-4 my-2 w-full transition-all duration-150 ease-in-out ${changePasswordMessage ? "h-[450px]" : "h-[370px]"}`}
                >
                  <div
                    className={`absolute top-0 left-0 w-full transition-opacity duration-300 ease-in-out ${changePasswordMessage ? "opacity-100" : "opacity-0"}`}
                  >
                    {changePasswordMessage === successPasswordChangeMessage && (
                      <ActionStatus
                        description={successPasswordChangeMessage}
                        variant={"success"}
                      />
                    )}
                    {changePasswordMessage === failedPasswordChangeMessage && (
                      <ActionStatus
                        description={failedPasswordChangeMessage}
                        variant={"destructive"}
                      />
                    )}
                  </div>
                  <div
                    className={`space-y-8 transition-transform duration-150 ease-in-out ${changePasswordMessage ? "translate-y-24" : "translate-y-0"}`}
                  >
                    <div className="m-1 space-y-8">
                      <PasswordInput
                        label="Old Password"
                        register={register("oldPassword", { required: true })}
                      />
                      <PasswordInput
                        label="New Password"
                        register={register("newPassword", { required: true })}
                        errorMessage={passwordMismatchMessage}
                      />
                      <PasswordInput
                        label="Retyped Password"
                        errorMessage={passwordMismatchMessage}
                        register={register("retypedPassword", {
                          required: true,
                        })}
                      />
                    </div>

                    <Button variant={"outline"} type="submit" className="m-1">
                      Change
                    </Button>
                  </div>
                </AccordionContent>
              </form>
            </AccordionItem>
          </Accordion>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant={"outline"}>Close</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
