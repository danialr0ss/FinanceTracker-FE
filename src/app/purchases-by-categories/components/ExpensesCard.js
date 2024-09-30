import { CiEdit } from "react-icons/ci";
import {
  IoIosRemoveCircleOutline,
  IoIosCheckmarkCircleOutline,
  IoIosCloseCircleOutline,
} from "react-icons/io";

import { useState, useRef, useEffect } from "react";
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
import { useDispatch } from "react-redux";
import { deletePurchase } from "@/store/slices/historySlice";
import { Input } from "@/components/ui/input";
import { updatePurchase } from "@/store/slices/historySlice";

export default function ExpensesCard({ id, price, label, date }) {
  const [isEditting, setIsEditting] = useState(false);
  const dispatch = useDispatch();
  const editRef = useRef(null);

  const formatDate = () => {
    const dateObject = new Date(date);
    let month = "";

    if (dateObject.getMonth() === 0) {
      month = "January";
    } else if (dateObject.getMonth() === 1) {
      month = "February";
    } else if (dateObject.getMonth() === 2) {
      month = "March";
    } else if (dateObject.getMonth() === 3) {
      month = "April";
    } else if (dateObject.getMonth() === 4) {
      month = "May";
    } else if (dateObject.getMonth() === 5) {
      month = "June";
    } else if (dateObject.getMonth() === 6) {
      month = "July";
    } else if (dateObject.getMonth() === 7) {
      month = "August";
    } else if (dateObject.getMonth() === 8) {
      month = "September";
    } else if (dateObject.getMonth() === 9) {
      month = "October";
    } else if (dateObject.getMonth() === 10) {
      month = "November";
    } else {
      month = "December";
    }

    return `${dateObject.getDate()} ${month} ${dateObject.getFullYear()}`;
  };

  const defaultValues = {
    id: id,
    price: price,
    label: label,
    date: date,
  };

  const { register, handleSubmit, reset } = useForm({ defaultValues });

  const handleStartEditting = () => {
    setIsEditting(true);
  };

  const handleStopEditting = () => {
    setIsEditting(false);
  };

  const handleCancelEditting = () => {
    reset();
    setIsEditting(false);
  };

  const handleDeleteExpenses = (purchaseId) => {
    dispatch(deletePurchase(purchaseId));
  };

  const handleUpdatePurchase = (data) => {
    const newPurchase = {
      id: id,
      label: data.label.trim(),
      price: Number(data.price),
      date: data.date,
    };
    dispatch(updatePurchase(newPurchase));
    handleStopEditting();
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
  }, []);

  return (
    <div className="h-64 w-full p-6 border-2 rounded-lg flex flex-col justify-start items-start duration-100">
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
                  className="text-lg"
                  placeholder="Amount"
                  {...register("price", {
                    required: "Required",
                    pattern: /^\d+(\.\d+)?$/,
                  })}
                  onKeyDown={handlePressEnter}
                />
              </div>
              <div className="space-y-2">
                <Input
                  className="text-lg font-bold"
                  placeholder="Title"
                  {...register("label", {
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
        <>
          <div className="text-3xl font-bold mb-8">${price.toFixed(2)}</div>
          <div className="h-full w-full">
            <div className={"font-bold text-xl mb-1"}>{label}</div>
            <span className=" w-full resize-none overflow-auto border-none p-0 pr-2 mb-2">
              {formatDate(date)}
            </span>
          </div>
          <div className="w-full h-full flex justify-between text-5xl rounded-lg">
            <button onClick={handleStartEditting}>
              <CiEdit className=" p-2 hover:text-white hover:bg-black rounded-lg transition-colors" />
            </button>
            <Dialog>
              <DialogTrigger asChild>
                <button>
                  <IoIosRemoveCircleOutline className="p-2 text-red-500  hover:text-white hover:bg-red-500 rounded-lg transition-colors" />
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
                      onClick={() => handleDeleteExpenses(id)}
                    >
                      Delete
                    </Button>
                  </DialogClose>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </>
      )}
    </div>
  );
}
