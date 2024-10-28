"use client";
import { useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import ExpensesCard from "./components/ExpensesCard";
import BackButton from "@/components/BackButton";
import { Button } from "@/components/ui/button";
import LoadingSpinner from "@/components/LoadingSpinner";
import { Input } from "@/components/ui/input";
import { useGetPurchasesQuery } from "@/store/slices/api/purchaseApi";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { years, months } from "@/lib/utils";

export default function Page() {
  const now = new Date();
  const [isLoadingNavigation, setIsLoadingNavigation] = useState(false);
  const [searchMonth, setSearchMonth] = useState(now.getMonth() + 1);
  const [searchYear, setSearchYear] = useState(now.getFullYear());
  const [searchLabel, setSearchLabel] = useState("");
  const [searchCategory, setSearchCategory] = useState("");
  const [categoryInput, setCategoryInput] = useState("");
  const [labelInput, setLabelInput] = useState("");
  const [monthInput, setMonthInput] = useState(searchMonth);
  const [yearInput, setYearInput] = useState(searchYear);

  const { data, isLoading: isLoadingPurchases } = useGetPurchasesQuery({
    label: searchLabel,
    category: searchCategory,
    month: searchMonth,
    year: searchYear,
  });

  const purchases = data ? [...data?.purchases].reverse() : [];

  const handleSearchQuery = () => {
    setSearchCategory(categoryInput);
    setSearchLabel(labelInput);
    if (monthInput === "Any Month") {
      setSearchMonth("");
    } else {
      setSearchMonth(Number(monthInput));
    }

    if (yearInput === "Any Year") {
      setSearchYear("");
    } else {
      setSearchYear(Number(yearInput));
    }
  };

  const handleClearQuery = () => {
    setCategoryInput("");
    setLabelInput("");
    setMonthInput("Any Month");
    setYearInput("Any Year");
  };

  return (
    <div
      className={
        "w-full h-full flex justify-center items-center bg-backgroundColor p-outer-padding gap-x-4 relative"
      }
    >
      {isLoadingNavigation && (
        <div className="absolute h-full w-full backdrop-blur-lg z-10 top-0 left-0">
          <LoadingSpinner className="w-64 h-64 absolute  transform top-1/2 left-1/2 z-10 -translate-x-1/2 -translate-y-1/2 " />
        </div>
      )}
      <div
        className={"w-full h-full bg-white border-2 rounded-xl p-inner-padding"}
      >
        <div className={"w-full h-full space-y-10 flex flex-col"}>
          <div className="w-auto h-fit space-y-8">
            <BackButton setIsLoadingNavigation={setIsLoadingNavigation} />
            <div className="flex flex-1 gap-8">
              <Select onValueChange={setMonthInput} value={monthInput}>
                <SelectTrigger className="text-lg p-8 border-2">
                  <SelectValue placeholder="Select A Month" />
                </SelectTrigger>
                <SelectContent>
                  {months.map((item) => (
                    <SelectItem
                      value={item.number + 1}
                      key={item.name}
                      className="text-lg"
                    >
                      {`${item.name} (${item.number + 1})`}
                    </SelectItem>
                  ))}
                  <SelectItem value={"Any Month"} className="text-lg">
                    Any Month
                  </SelectItem>
                </SelectContent>
              </Select>
              <Select onValueChange={setYearInput} value={yearInput}>
                <SelectTrigger className="text-lg p-8 border-2">
                  <SelectValue placeholder="Select A Year" />
                </SelectTrigger>
                <SelectContent>
                  {years.map((item) => (
                    <SelectItem value={item} key={item} className="text-lg">
                      {item}
                    </SelectItem>
                  ))}
                  <SelectItem value={"Any Year"} className="text-lg">
                    Any Year
                  </SelectItem>
                </SelectContent>
              </Select>
              <Input
                placeholder="Search A Label"
                className="w-full h-auto text-lg  border-2 "
                onChange={(e) => setLabelInput(e.target.value)}
                value={labelInput}
              />
              <Input
                placeholder="Search A Category"
                className="w-full h-auto text-lg border-2"
                onChange={(e) => setCategoryInput(e.target.value)}
                value={categoryInput}
              />
              <Button
                className="h-auto w-32 text-md p-4"
                onClick={handleSearchQuery}
              >
                Search
              </Button>
              <Button
                className="h-auto w-32 text-md p-4"
                variant="outline"
                onClick={handleClearQuery}
              >
                Clear
              </Button>
            </div>
          </div>
          {isLoadingPurchases ? (
            <div className="grid grid-cols-4 grid-row-2 justify-items-stretch gap-x-16 gap-y-8">
              {Array.from({ length: 8 }).map((_, index) => (
                <Skeleton className={`h-56 rounded-xl`} key={index} />
              ))}
            </div>
          ) : purchases.length !== 0 ? (
            <div
              className={
                "flex-1  grid grid-cols-4 gap-x-16 gap-y-8 overflow-auto"
              }
            >
              {purchases.map((item, index) => (
                <ExpensesCard
                  key={index}
                  id={item.id}
                  amount={item.amount}
                  label={item.label}
                  date={item.date}
                  category={item.category}
                />
              ))}
            </div>
          ) : (
            <div className="h-auto flex text-xl items-center justify-start font-bold">
              No results for "
              {searchCategory && `Category: ${searchCategory}, `}
              {searchLabel && `Label : ${searchLabel}, `}
              {searchMonth && `Month: ${searchMonth}, `}
              {searchYear && `Year: ${searchYear}, `}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
