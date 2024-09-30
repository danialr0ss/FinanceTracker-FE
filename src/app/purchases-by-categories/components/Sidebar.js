"use client";
import { BiCategory } from "react-icons/bi";
import { Button } from "@/components/ui/button";
import { useSelector, useDispatch } from "react-redux";
import { useState, useRef, useEffect } from "react";
import { addCategory } from "@/store/slices/historySlice";
import { setCurrentCategory } from "@/store/slices/historySlice";
import { IoMdArrowRoundBack } from "react-icons/io";
import ActiveButton from "./ActiveButton";

export default function Sidebar() {
  const [isAdding, setIsAdding] = useState(false);
  const [newName, setNewName] = useState("");
  const categories = useSelector((state) => state.history.categories);
  const selectedCategory = useSelector(
    (state) => state.history.currentCategory
  );
  const inputRef = useRef(null);
  const addButtonRef = useRef(null);
  const endOfScrollRef = useRef(null);
  const dispatch = useDispatch();

  const handleToggleAdding = () => {
    setIsAdding((prevState) => !prevState);
    inputRef.current.focus();
    if (!isAdding) {
      setNewName("");
    }
  };

  const isItemExist = (itemName) => {
    if (categories.find((item) => item.name === itemName)) {
      return true;
    }
    return false;
  };

  const handleAddCategory = (e) => {
    if (e.key === "Enter" && newName.length !== 0) {
      const formatName = newName[0].toUpperCase() + newName.substring(1);
      //if item exist select it and scroll to existing item
      if (!isItemExist(formatName)) {
        dispatch(addCategory({ name: formatName.trim(), purchases: [] }));
      }
      handleSelectCategory(formatName);
      setIsAdding(false);
      setNewName("");
    }
  };

  const handleSelectCategory = (itemName) => {
    dispatch(setCurrentCategory(itemName));
  };

  const getActiveButton = (item) => {
    if (item.name === selectedCategory.name) {
      return true;
    }
    return false;
  };

  useEffect(() => {
    const handleMousedown = (e) => {
      if (
        inputRef.current &&
        !inputRef.current.contains(e.target) &&
        !addButtonRef.current.contains(e.target)
      ) {
        setNewName("");
        setIsAdding(false);
      }
    };

    document.addEventListener("mousedown", handleMousedown);

    return () => {
      document.removeEventListener("mousedown", handleMousedown);
    };
  }, []);

  useEffect(() => {
    if (isAdding && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isAdding]);

  useEffect(() => {
    if (endOfScrollRef.current) {
      endOfScrollRef.current.scrollIntoView({
        behavior: "smooth",
        block: "end",
      });
    }
  }, [categories]);

  return (
    <div
      className={
        "w-96 h-full bg-white rounded-xl border-2 px-2 py-8 gap-y-4 flex flex-col justify-between items-center"
      }
    >
      <a
        className="w-full flex justify-start items-center rounded-xl px-10  hover:opacity-50"
        href="/"
      >
        <IoMdArrowRoundBack className="text-3xl mr-4" />
        <div className={"text-xl font-bold"}>Back</div>
      </a>
      <div className="w-full flex justify-start items-center rounded-xl p-10 py-4 ">
        <BiCategory className="text-3xl mr-4" />
        <div className={"text-xl font-bold"}>Categories</div>
      </div>
      <div className={"h-full text-center space-y-4 overflow-auto"}>
        {categories.map((item, index) => (
          <ActiveButton
            variant="outline"
            className="h-16 w-[220px] font-bold text-lg"
            key={index}
            isActive={getActiveButton(item)}
            onClick={() => handleSelectCategory(item.name)}
          >
            {item.name}
          </ActiveButton>
        ))}
        <div ref={endOfScrollRef} />
      </div>
      <div className={"w-full text-center space-y-4 "}>
        <input
          className={`w-[220px] text-center h-16 border-2 border-borderColor rounded-lg p-4 outline-none ${
            isAdding ? " transition-opacity" : ""
          } ${isAdding ? "opacity-100" : "opacity-0"}`}
          value={newName}
          onChange={(e) => {
            setNewName(e.target.value);
          }}
          ref={inputRef}
          onKeyDown={handleAddCategory}
          disabled={!isAdding}
        />
        <Button
          ref={addButtonRef}
          className="w-[220px] text-lg h-16"
          onClick={handleToggleAdding}
        >
          Add Category
        </Button>
      </div>
    </div>
  );
}
