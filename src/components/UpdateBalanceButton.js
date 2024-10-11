"use client";
import { FaMoneyBillTransfer } from "react-icons/fa6";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useState } from "react";
import { useUpdateBalanceMutation } from "@/store/slices/accountApi";

export default function UpdateBalanceButton({}) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newBalance, setNewBalance] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");
  const [updateBalance] = useUpdateBalanceMutation();

  const processBalanceUpdate = async () => {
    const parseBalance = newBalance;
    if (parseBalance <= 0) {
      const error = "Balance must be a valid number above 0";
      setErrorMessage(error);
      throw Error(error);
    }

    setErrorMessage("");

    try {
      const body = { balance: newBalance };
      await updateBalance(body).unwrap();
      console.log("success");
    } catch (err) {
      setErrorMessage(err.message);
      throw Error(err.message);
    }
  };

  const parseNewBalance = (newBalance) => {
    const parsedVal = parseFloat(newBalance);

    if (isNaN(parsedVal) || parsedVal.toString() !== newBalance.trim()) {
      return 0;
    }

    return parsedVal;
  };

  const handleOnEnter = (e) => {
    if (e.key === "Enter") {
      handleUpdateClick();
    }
  };

  // if succesfully updated, dialog will close else remain open
  const handleUpdateClick = async (e) => {
    try {
      await processBalanceUpdate();
      setIsDialogOpen(false);
    } catch {
      setIsDialogOpen(true);
    }
  };

  return (
    <Dialog open={isDialogOpen}>
      <DialogTrigger asChild>
        <button
          className="w-56 h-56 p-4 rounded-xl border-2 border-gray-500 flex flex-col justify-evenly items-center hover:bg-gray-500 hover:text-white gap-4"
          onClick={() => setIsDialogOpen(true)}
        >
          <div className="text-center text-lg">Update Balance</div>
          <FaMoneyBillTransfer className="text-[80px]" />
        </button>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>Update Balance</DialogTitle>
        <div className="flex flex-col gap-4 py-4">
          <div className="space-4">
            <span className="mr-4">Enter the new balance</span>
            {errorMessage && (
              <span className={`text-destructive text-xs outline-destructive`}>
                {errorMessage}
              </span>
            )}
          </div>
          <Input
            onChange={(e) => setNewBalance(parseNewBalance(e.target.value))}
            onKeyDown={handleOnEnter}
            className={`${errorMessage && "border-destructive"}`}
          />
        </div>
        <div className="flex justify-between items-center">
          <DialogClose asChild>
            <Button onClick={(e) => handleUpdateClick(e)}>Update</Button>
          </DialogClose>
          <DialogClose asChild>
            <Button
              variant="outline"
              onClick={() => {
                setIsDialogOpen(false);
              }}
            >
              Cancel
            </Button>
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  );
}
