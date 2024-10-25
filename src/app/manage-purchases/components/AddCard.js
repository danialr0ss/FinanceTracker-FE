import { CiSquarePlus } from "react-icons/ci";
import { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  IoIosCheckmarkCircleOutline,
  IoIosCloseCircleOutline,
} from "react-icons/io";
import { useForm } from "react-hook-form";
// import { addPurchase } from "@/store/slices/historySlice";

export default function AddCard() {
  // const purchases = useSelector(
  //   (state) => state.history.currentCategory.purchases
  // );
  const [isAdding, setIsAdding] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const editRef = useRef(null);
  const addRef = useRef(null);
  const dispatch = useDispatch();

  const { register, handleSubmit, reset } = useForm();

  const handleAdding = () => {
    if (!isAdding) {
      setIsAdding(true);
    }
  };

  const getLatestId = () => {
    //get last item in the array's id
    // if array is empty return 0
    const id = purchases[purchases.length - 1]
      ? purchases[purchases.length - 1].id
      : 0;

    return id;
  };

  const handleAddPurchase = (data) => {
    const id = getLatestId();

    const words = data.label.trim().split(" ");
    let capitalizedFirstLetter = "";
    for (const word of words) {
      capitalizedFirstLetter += word[0].toUpperCase() + word.slice(1) + " ";
    }

    const newPurchase = {
      id: id,
      label: capitalizedFirstLetter,
      price: Number(data.price),
      description: data.description.trim(),
    };
    dispatch(addPurchase(newPurchase));
    handleFinishAdding();
  };

  const handlePressEnter = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSubmit(handleAddPurchase)();
    }
  };

  const handleFinishAdding = () => {
    reset();
    setIsAdding(false);
  };

  const handleCancelAdding = () => {
    reset();
    setIsAdding(false);
  };

  useEffect(() => {
    const handleClickOff = (e) => {
      if (
        editRef.current &&
        !editRef.current.contains(e.target) &&
        addRef.current &&
        !addRef.current.contains(e.target)
      ) {
        handleCancelAdding();
      }
    };

    document.addEventListener("mousedown", handleClickOff);

    return () => {
      document.removeEventListener("mousedown", handleClickOff);
    };
  }, [handleCancelAdding]);

  useEffect(() => {
    if (isAdding) {
      setTimeout(() => setIsAnimating(true), 100);
    } else {
      setTimeout(() => setIsAnimating(false), 100);
    }
  }, [isAdding]);
  return (
    <>
      <button onClick={handleAdding} ref={addRef} className="h-fit">
        <div
          className={
            "h-64 w-full border-2 rounded-lg flex justify-center items-center hover:bg-gray-200 transition-all duration-500 ease-in-out"
          }
        >
          <CiSquarePlus className={"text-5xl"} />
        </div>
      </button>
      {isAdding && (
        <div
          className={`transition-opacity duration-500 ${
            isAnimating ? "opacity-100" : "opacity-0"
          }`}
        >
          <div className="h-64 w-full p-3 border-2 rounded-lg flex flex-col justify-start items-start">
            <form onSubmit={handleSubmit(handleAddPurchase)} className="w-full">
              <div className={"space-y-2 "} ref={editRef}>
                <div className="flex items-center gap-x-2 font-bold">
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
                  <Textarea
                    className="h-full resize-none overflow-auto text-gray-500"
                    placeholder="Description"
                    {...register("description")}
                    onKeyDown={handlePressEnter}
                  />
                </div>
                <div className="w-full flex justify-evenly gap-x-2 text-5xl rounded-lg ">
                  <button type="submit">
                    <IoIosCheckmarkCircleOutline className="p-2 text-green-500 rounded-lg hover:bg-green-500 hover:text-white" />
                  </button>
                  <button onClick={handleCancelAdding}>
                    <IoIosCloseCircleOutline className="p-2 text-red-500 rounded-lg hover:bg-red-500 hover:text-white" />
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
