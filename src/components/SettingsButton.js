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
import { Input } from "./ui/input";
import { useForm } from "react-hook-form";
import { useState } from "react";

export default function SettingsButton() {
  const [passwordMismatchMessage, setPasswordMismatchMessage] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleChangePassword = (data) => {
    const newPassword = data.newPassword;
    const retypePassword = data.retypePassword;

    if (newPassword !== retypePassword) {
      setPasswordMismatchMessage("new passwords do not match");
      return;
    } else {
      setPasswordMismatchMessage("");
      delete data.retypePassword;
    }
    console.log(data);
  };

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
                <AccordionContent className="space-y-4 my-2 w-full ">
                  <div className="space-y-2 m-1">
                    <label>Old Password</label>
                    <label className="text-destructive text-xs ml-4">
                      {errors["oldPassword"]?.message}
                    </label>
                    <Input
                      {...register("oldPassword", { required: "required" })}
                      type="password"
                    />
                  </div>
                  <div className="space-y-2 m-1">
                    <label>New Password</label>
                    <label className="text-destructive text-xs ml-4">
                      {errors["newPassword"]?.message}
                      {passwordMismatchMessage}
                    </label>
                    <span className="text-xs text-destructive"></span>
                    <Input
                      {...register("newPassword", { required: "required" })}
                      type="password"
                    />
                  </div>
                  <div className="space-y-2 m-1">
                    <label>Retype New Password</label>
                    <label className="text-destructive text-xs ml-4">
                      {errors["retypePassword"]?.message}
                    </label>
                    <Input
                      {...register("retypePassword", { required: "required" })}
                      type="password"
                    />
                  </div>
                  <Button variant={"outline"} type="submit">
                    Change
                  </Button>
                </AccordionContent>
              </form>
            </AccordionItem>
          </Accordion>
          <DialogFooter>
            <DialogClose>
              <Button variant={"outline"}>Close</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
