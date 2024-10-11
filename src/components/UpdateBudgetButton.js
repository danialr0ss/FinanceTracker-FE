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
import { useUpdateBudgetMutation } from "@/store/slices/api/accountApi";
import { useDispatch, useSelector } from "react-redux";
import { updateBudgetState } from "@/store/slices/budgetSlice";

export default function UpdateBudgetButton({}) {
  const dispatch = useDispatch();
  const monthlyBudget = useSelector((state) => state.budget.value);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newBudget, setNewBudget] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");
  const [updateBudget] = useUpdateBudgetMutation();

  const processBudgetUpdate = async () => {
    const parseBudget = newBudget;
    if (parseBudget <= 0) {
      const error = "Budget must be a valid number above 0";
      setErrorMessage(error);
      throw Error(error);
    }

    setErrorMessage("");

    try {
      const body = { Budget: newBudget };
      await updateBudget(body).unwrap();
      await dispatch(updateBudgetState(newBudget));
      console.log("success");
    } catch (err) {
      setErrorMessage(err.message);
      throw Error(err.message);
    }
  };

  const parseNewBudget = (newBudget) => {
    const parsedVal = parseFloat(newBudget);

    if (isNaN(parsedVal) || parsedVal.toString() !== newBudget.trim()) {
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
      await processBudgetUpdate();
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
          <div className="text-center text-lg">Update Monthly Budget</div>

          <FaMoneyBillTransfer className="text-[80px]" />
        </button>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>Update Budget</DialogTitle>
        <div className="flex flex-col gap-4 py-4">
          <div className="font-bold">
            Current Monthly Budget: $
            <span className={"font-normal"}>
              {Number(monthlyBudget).toFixed(2)}
            </span>
          </div>
          <span className="mr-4">Enter new budget</span>
          {errorMessage && (
            <span className={`text-destructive text-xs outline-destructive`}>
              {errorMessage}
            </span>
          )}
          <Input
            onChange={(e) => setNewBudget(parseNewBudget(e.target.value))}
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
