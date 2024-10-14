"use client";
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
import { updateBudgetState } from "@/store/slices/budgetSlice";
import { TbReportMoney } from "react-icons/tb";

export default function AddPurchaseButton({}) {
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
      const body = { budget: newBudget };
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

  const fields = [
    {
      label: "Amount ($)",
      registerName: "amount",
    },
    {
      label: "Category",
      registerName: "category",
    },
    {
      label: "Label",
      registerName: "label",
    },
  ];

  return (
    <Dialog open={isDialogOpen}>
      <DialogTrigger asChild>
        <button
          className="w-56 h-56 p-4 rounded-xl border-2 border-gray-500 flex flex-col justify-evenly items-center hover:bg-gray-500 hover:text-white gap-4"
          onClick={() => setIsDialogOpen(true)}
        >
          <div className="text-center text-lg font-bold">Add Purchase</div>
          <TbReportMoney className="text-[80px]" />
        </button>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>Add Purchase</DialogTitle>
        <div className="py-6 space-y-6">
          {fields.map((item) => (
            <div className="space-y-3" key={item.label}>
              <label>{item.label}</label>
              <Input onKeyDown={handleOnEnter} />
            </div>
          ))}
        </div>

        <div className="flex justify-between items-center">
          <Button
            variant="outline"
            onClick={() => {
              setIsDialogOpen(false);
            }}
          >
            Cancel
          </Button>
          <Button onClick={(e) => handleUpdateClick(e)}>Add</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
