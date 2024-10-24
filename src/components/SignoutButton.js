"use client";
import { useRouter } from "next/navigation";
import { LuLogOut } from "react-icons/lu";
import { useSignoutMutation } from "@/store/slices/api/authApi";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { FiAlertTriangle } from "react-icons/fi";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { useState } from "react";
import LoadingSpinner from "./LoadingSpinner";

export default function SignoutButton() {
  const [isLoadingPage, setIsLoadingPage] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [signout] = useSignoutMutation();
  const router = useRouter();

  const openDialog = () => setIsDialogOpen(true);
  const closeDialog = () => setIsDialogOpen(false);

  const handleSignout = async () => {
    try {
      setIsDialogOpen(false);
      setIsLoadingPage(true);
      await signout();
      router.push("/login");
    } catch (err) {
      console.error("error occured, ", err);
    }
  };

  return (
    <>
      {isLoadingPage && (
        <div className="absolute h-full w-full backdrop-blur-lg z-100 top-0 left-0">
          <LoadingSpinner className="w-64 h-64 absolute  transform top-1/2 left-1/2 z-10 -translate-x-1/2 -translate-y-1/2 " />
        </div>
      )}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger asChild>
          <button
            className="w-56 h-56 p-4 rounded-xl border-2 border-borderColor flex flex-col justify-evenly items-center hover:bg-gray-500 hover:text-white gap-4 transition-colors duration-150 ease-in-out"
            onClick={openDialog}
          >
            <div className="text-center text-lg font-bold">Sign Out</div>
            <LuLogOut className="text-[80px]" />
          </button>
        </DialogTrigger>
        <DialogContent>
          <VisuallyHidden>
            <DialogTitle />
          </VisuallyHidden>
          <div className="w-full h-16 flex justify-start items-center mt-4 mb-8">
            <FiAlertTriangle className="text-red-500 mr-8 h-full w-fit" />
            <DialogDescription className=" h-full flex flex-col justify-center">
              <span className={"font-bold text-lg text-black"}>
                Signing out
              </span>
              <span className={"text-sm"}>Are you sure?</span>
            </DialogDescription>
          </div>
          <div className="flex justify-between">
            <DialogClose asChild>
              <Button onClick={closeDialog}>Close</Button>
            </DialogClose>
            <Button variant="destructive" onClick={handleSignout}>
              Sign out
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
