"use client";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useState } from "react";
import { TbReportMoney } from "react-icons/tb";
import { useForm } from "react-hook-form";
import { ActionStatus } from "./ActionStatus";
import { useEffect } from "react";
import { useAddPurchaseMutation } from "@/store/slices/api/purchaseApi";

export default function AddPurchaseButton() {
  const failedAddMessage = "Unable to add purchase";
  const successAddMessage = "Successfully added purchase";
  const tranformY = "translate-y-24";

  const [addMessage, setAddMessage] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [addPurchase] = useAddPurchaseMutation();

  const defaultValues = {
    defaultValues: { amount: 0, category: "", label: "" },
  };

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm(defaultValues);

  const handleAddPurchase = async (data, e) => {
    try {
      data.amount = Number(data.amount);
      console.log({ body: data });
      await addPurchase(data).unwrap();
      setAddMessage(successAddMessage);
    } catch (err) {
      setAddMessage(failedAddMessage);
    }
  };

  const handleOnEnter = (e) => {
    if (e.key === "Enter") {
      console.log("entering");
      handleSubmit(handleAddPurchase);
    }
  };

  const handleCloseDialog = (e) => {
    e.preventDefault();
    reset();
    setIsDialogOpen(false);
  };

  const fields = [
    {
      label: "Amount ($)",
      registerName: "amount",
      type: "text",
      registerOptions: {
        pattern: {
          value: /^(0\.\d{2,}|[1-9]\d*(\.\d+)?|0\.\d+)$/,
          message: "amount must be a demical number above 0.01",
        },
      },
    },
    {
      label: "Category",
      type: "text",
      registerName: "category",
      registerOptions: {
        required: "required",
      },
    },
    {
      label: "Label",
      type: "text",
      registerName: "label",
    },
  ];

  useEffect(() => {
    setTimeout(() => {
      setAddMessage("");
    }, 5000);
  }, [addMessage]);

  return (
    <Dialog open={isDialogOpen}>
      <DialogTrigger asChild>
        <button
          className="w-56 h-56 p-4 rounded-xl border-2 border-gray-500 flex flex-col justify-evenly items-center hover:bg-gray-500 hover:text-white gap-4 transition-colors duration-150 ease-in-out"
          onClick={() => setIsDialogOpen(true)}
        >
          <div className="text-center text-lg font-bold">Add Purchase</div>
          <TbReportMoney className="text-[80px]" />
        </button>
      </DialogTrigger>
      <DialogContent
        className={`transition-all duration-300 ease-in-out ${addMessage ? "h-[540px]" : "h-[430px]"}`}
      >
        <form onSubmit={handleSubmit(handleAddPurchase)}>
          <DialogTitle>Add Purchase</DialogTitle>
          <div className=" space-y-6">
            <div
              className={`w-[462px] absolute duration-300 ease-in-out ${addMessage ? "opacity-100" : "opacity-0"}`}
            >
              {addMessage === successAddMessage ? (
                <ActionStatus
                  variant={"success"}
                  description={successAddMessage}
                />
              ) : (
                <ActionStatus
                  variant={"destructive"}
                  description={failedAddMessage}
                />
              )}
            </div>

            {fields.map((item) => (
              <div
                className={`space-y-3  duration-300 ease-in-out  ${addMessage && tranformY}`}
                key={item.label}
              >
                <label>
                  {item.label}
                  {
                    <span className="text-destructive text-xs ml-4">
                      {errors[item.registerName]?.message}
                    </span>
                  }
                </label>
                <Input
                  onKeyDown={handleOnEnter}
                  type={item.type}
                  {...register(item.registerName, item.registerOptions)}
                  className={errors[item.registerName] && "border-destructive"}
                />
              </div>
            ))}
            <div
              className={`flex justify-between items-center duration-300 ease-in-out  ${addMessage && tranformY}`}
            >
              <Button variant="outline" onClick={handleCloseDialog}>
                Close
              </Button>
              <Button type="submit">Add</Button>
            </div>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
