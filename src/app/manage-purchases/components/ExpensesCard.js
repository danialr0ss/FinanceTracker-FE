import { CiEdit } from "react-icons/ci";
import {
  IoIosRemoveCircleOutline,
  IoIosCheckmarkCircleOutline,
  IoIosCloseCircleOutline,
} from "react-icons/io";

import { useState, useRef, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { uppercaseFirstLetter } from "@/lib/utils";
import { useEditPurchaseMutation } from "@/store/slices/api/purchaseApi";
import { useDeletePurchaseMutation } from "@/store/slices/api/purchaseApi";
import { formatDate } from "@/lib/utils";

export default function ExpensesCard({ id, amount, label, date, category }) {
  const [editPurchase, { isError: isErrorEdit }] = useEditPurchaseMutation();
  const [deletePurchase] = useDeletePurchaseMutation();
  const [isEditting, setIsEditting] = useState(false);
  const editRef = useRef(null);

  const defaultValues = {
    id: id,
    amount: amount,
    label: label,
    date: `${new Date(date).getFullYear()}-${new Date(date).getMonth() + 1}-${new Date(date).getDate()}`,
    category: category,
  };

  const { register, handleSubmit, reset } = useForm({ defaultValues });

  const handleStartEditting = () => {
    setIsEditting(true);
  };

  const handleStopEditting = () => {
    setIsEditting(false);
  };

  const handleCancelEditting = useCallback(() => {
    reset();
    setIsEditting(false);
  });

  const handleDeletePurchase = async (id) => {
    await deletePurchase({ id });
  };

  const handleUpdatePurchase = async (data) => {
    data.amount = Number(data.amount);
    await editPurchase(data);
    if (!isErrorEdit) {
      handleStopEditting();
    }
  };

  const handlePressEnter = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSubmit(handleUpdatePurchase)();
    }
  };

  useEffect(() => {
    const handleClickOff = (e) => {
      if (editRef.current && !editRef.current.contains(e.target)) {
        handleCancelEditting();
      }
    };

    document.addEventListener("mousedown", handleClickOff);

    return () => {
      document.removeEventListener("mousedown", handleClickOff);
    };
  }, [handleCancelEditting]);

  return (
    <div className="h-56 w-full p-6 border-2 rounded-lg flex flex-col justify-start items-start duration-100">
      {isEditting ? (
        <form
          onSubmit={handleSubmit(handleUpdatePurchase)}
          className="w-full h-full"
        >
          <div
            className={"flex flex-col justify-between space-y-2 w-full h-full"}
            ref={editRef}
          >
            <div className="space-y-2">
              <div className="flex items-center gap-x-2 font-bold ">
                $
                <Input
                  className="text-md w-24"
                  placeholder="Amount"
                  {...register("amount", {
                    required: "Required",
                    pattern: /^\d+(\.\d+)?$/,
                  })}
                  onKeyDown={handlePressEnter}
                />
                <Input
                  className="text-md"
                  placeholder="Label"
                  {...register("label", {
                    required: "Required",
                  })}
                  onKeyDown={handlePressEnter}
                />
              </div>
              <div className="space-y-2">
                <Input
                  className="text-md font-bold"
                  placeholder="category"
                  {...register("category", {
                    required: "Required",
                  })}
                  onKeyDown={handlePressEnter}
                />
                <Input
                  className="text-gray-500"
                  {...register("date", { required: "Required" })}
                  type="date"
                  onKeyDown={handlePressEnter}
                />
              </div>
            </div>
            <div className="w-full flex justify-evenly gap-x-2 text-5xl rounded-lg ">
              <button onClick={handleCancelEditting}>
                <IoIosCloseCircleOutline className="p-2 text-red-500 rounded-lg hover:bg-red-500 hover:text-white" />
              </button>
              <button type="submit">
                <IoIosCheckmarkCircleOutline className="p-2 text-green-500 rounded-lg hover:bg-green-500 hover:text-white" />
              </button>
            </div>
          </div>
        </form>
      ) : (
        <div className="w-full h-full flex flex-col">
          <div className="flex mb-8">
            <div className="w-32  text-xl font-bold">${amount.toFixed(2)}</div>
            <div className={"flex-1 font-bold text-lg mb-1 text-right"}>
              {uppercaseFirstLetter(label)}
            </div>
          </div>
          <div className="h-full w-full mb-4">
            <div className={"text-md mb-1"}>
              {uppercaseFirstLetter(category)}
            </div>
            <span className=" w-full resize-none overflow-auto border-none p-0 pr-2 mb-2 text-sm">
              {formatDate(date)}
            </span>
          </div>
          <div className="w-full h-full flex justify-between text-5xl rounded-lg">
            <button onClick={handleStartEditting}>
              <CiEdit className=" py-2 hover:text-white hover:bg-black rounded-lg transition-colors" />
            </button>
            <Dialog>
              <DialogTrigger asChild>
                <button>
                  <IoIosRemoveCircleOutline className="py-2 text-red-500  hover:text-white hover:bg-red-500 rounded-lg transition-colors" />
                </button>
              </DialogTrigger>
              <DialogContent>
                <DialogTitle className={"text-red-600"}>
                  Delete Purchase
                </DialogTitle>
                <DialogDescription
                  className={"h-16 flex items-center text-md text-black"}
                >
                  Are you sure you want to remove this item?
                </DialogDescription>
                <div className="flex justify-between items-center">
                  <DialogClose asChild>
                    <Button variant="outline">Cancel</Button>
                  </DialogClose>
                  <DialogClose asChild>
                    <Button
                      variant="destructive"
                      onClick={() => handleDeletePurchase(id)}
                    >
                      Delete
                    </Button>
                  </DialogClose>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      )}
    </div>
  );
}
