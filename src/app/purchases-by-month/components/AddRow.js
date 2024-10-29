import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FaRegCheckCircle } from "react-icons/fa";
import { MdOutlineCancel } from "react-icons/md";
import { FaPlus } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { useAddPurchaseMutation } from "@/store/slices/api/purchaseApi";
import { months } from "@/lib/utils";

export default function AddRow({ month }) {
  const [isAdding, setIsAdding] = useState(false);
  const [addPurchase] = useAddPurchaseMutation();
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleCloseAdd = () => {
    reset();
    setIsAdding(false);
  };

  const handlePressEnter = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSubmit(handleAddPurchase)();
    }
  };

  const validateDate = (value) => {
    if (value === "") {
      return "required";
    }

    const input = new Date(value);
    const today = new Date();

    if (input > today) {
      return "date must be before today";
    }

    if (input.getMonth() + 1 !== month) {
      return `month must be in ${months[month - 1].name}`;
    }
    return true;
  };

  const handleAddPurchase = async (data) => {
    data.amount = Number(data.amount);
    data.date = new Date(data.date).toISOString();
    console.log(data);
    await addPurchase(data).unwrap();
    handleCloseAdd();
  };

  return isAdding ? (
    <form onSubmit={handleSubmit(handleAddPurchase)}>
      <div className="w-full flex px-1">
        <div className="relative">
          <Input
            className={`w-44 mr-5 ${errors.amount && "border-error"}`}
            placeholder="Amount"
            {...register("amount", {
              required: "required",
              pattern: {
                value: /^(0\.\d{2,}|[1-9]\d*(\.\d+)?|0\.\d+)$/,
                message: "Invalid amount",
              },
            })}
            onKeyDown={handlePressEnter}
          />
          <div className="absolute left-0 -bottom-5 text-error text-xs">
            {errors.amount?.message}
          </div>
        </div>
        <div className="relative">
          <Input
            className={`w-60 mr-5 ${errors.date && "border-error"}`}
            placeholder="Date"
            type="date"
            {...register("date", {
              validate: validateDate,
            })}
            onKeyDown={handlePressEnter}
          />
          <div className="absolute left-0 -bottom-5 text-error text-xs">
            {errors.date?.message}
          </div>
        </div>
        <div className="relative">
          <Input
            className={`w-72 mr-5  ${errors.category && "border-error"}`}
            placeholder="Category"
            {...register("category", { required: "required" })}
            onKeyDown={handlePressEnter}
          />
          <div className="absolute left-0 -bottom-5 text-error text-xs">
            {errors.category?.message}
          </div>
        </div>
        <div className="relative">
          <Input
            className={`w-60 mr-4  ${errors.label && "border-error"}`}
            placeholder="Label"
            {...register("label", { required: "required" })}
            onKeyDown={handlePressEnter}
          />
          <div className="absolute left-0 -bottom-5 text-error text-xs">
            {errors.label?.message}
          </div>
        </div>
        <Button className={"mr-3 hover:border-green-500"} variant="outline">
          <FaRegCheckCircle size={24} className="text-green-500" />
        </Button>
        <Button
          variant="outline"
          onClick={handleCloseAdd}
          className="hover:border-error"
        >
          <MdOutlineCancel size={24} className="text-error" />
        </Button>
      </div>
    </form>
  ) : (
    <Button
      className="w-full h-10 border p-2 text-center"
      onClick={() => {
        setIsAdding(true);
      }}
    >
      <FaPlus />
    </Button>
  );
}
