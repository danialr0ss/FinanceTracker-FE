"use client";
import { FaMoneyBillTransfer } from "react-icons/fa6";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

export default function UpdateBalanceButton() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="w-56 h-56 p-4 rounded-xl border-2 border-gray-500 flex flex-col justify-evenly items-center hover:bg-gray-500 hover:text-white gap-4">
          <div className="text-center text-lg">Update Balance</div>
          <FaMoneyBillTransfer className="text-[80px]" />
        </button>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>Update Balance</DialogTitle>
        <div className="flex flex-col gap-4 py-4">
          Enter the new balance
          <Input type="number" />
        </div>
        <div className="flex justify-between items-center">
          <DialogClose asChild>
            <Button onClick={() => {}}>Update</Button>
          </DialogClose>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  );
}
