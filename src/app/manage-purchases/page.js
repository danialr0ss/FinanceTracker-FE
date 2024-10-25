"use client";
import { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import ExpensesCard from "./components/ExpensesCard";
import AddCard from "./components/AddCard";
import BackButton from "@/components/BackButton";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

export default function Page() {
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingNavigation, setIsLoadingNavigation] = useState(false);

  const selectedCategory = [];
  // useSelector(
  //   (state) => state.history.currentCategory
  // );
  const imageSrc = "/homeImage.jpg";

  const reversedPurchases = [];
  // [...selectedCategory?.purchases].reverse();

  useEffect(() => {
    const img = new Image();

    img.src = imageSrc;

    img.onload = () => {
      setIsLoading(false);
    };

    img.onerror = () => {
      setIsLoading(false);
    };
  }, [imageSrc]);
  return (
    <div
      className={
        "w-full h-full flex justify-center items-center bg-backgroundColor p-outer-padding gap-x-4 relative"
      }
    >
      <div
        className={"w-full h-full bg-white border-2 rounded-xl p-inner-padding"}
      >
        <div className={"space-y-10"}>
          <div className="w-full h-fit space-y-8 pt-4 ">
            <BackButton setIsLoadingNavigation={setIsLoadingNavigation} />
            {/* <Select onValueChange={setSelectedMonth} value={selectedMonth}> */}
            <div className="h-fit flex gap-8 ">
              <Select>
                <SelectTrigger className="text-lg p-8 border-2">
                  <SelectValue placeholder="Select A Month" />
                </SelectTrigger>
                <SelectContent>
                  {/* {months.map((item) => (
                  <SelectItem
                  value={item.number}
                  key={item.name}
                  className="text-lg"
                  >
                  {`${item.name} (${item.number + 1})`}
                  </SelectItem>
                  ))} */}
                </SelectContent>
              </Select>
              {/* <Select onValueChange={setSelectedYear} value={selectedYear}> */}
              <Select>
                <SelectTrigger className="text-lg p-8 border-2">
                  <SelectValue placeholder="Select A Year" />
                </SelectTrigger>
                <SelectContent>
                  {/* {years.map((_, index) => (
                  <SelectItem
                  value={year - index}
                  key={year - index}
                  className="text-lg"
                  >
                  {year - index}
                  </SelectItem>
                  ))} */}
                </SelectContent>
              </Select>{" "}
              <Select>
                <SelectTrigger className="text-lg p-8 border-2">
                  <SelectValue placeholder="Select A Category" />
                </SelectTrigger>
                <SelectContent>
                  {/* {years.map((_, index) => (
                  <SelectItem
                  value={year - index}
                  key={year - index}
                  className="text-lg"
                  >
                  {year - index}
                  </SelectItem>
                  ))} */}
                </SelectContent>
              </Select>
              <Button
                className="h-auto w-32 text-md p-4"
                // onClick={handleQueryPurchases}
              >
                Search
              </Button>
            </div>
          </div>
          {selectedCategory.name?.length !== 0 ? (
            <div
              className={
                "w-full h-full grid grid-cols-4 auto-rows-min gap-8 overflow-auto pr-4"
              }
            >
              <AddCard />
              {/* make copy then reverse to show latest item first */}
              {reversedPurchases.map((item, index) => (
                <ExpensesCard
                  key={index}
                  id={item.id}
                  price={item.price}
                  label={item.label}
                  date={item.date}
                />
              ))}
            </div>
          ) : (
            <div className="w-full h-full flex justify-center items-center">
              {isLoading ? (
                <Skeleton className={`h-full w-full rounded-xl`} />
              ) : (
                <img
                  src={imageSrc}
                  alt="illustration"
                  className="object-contain overflow-hidden w-auto h-auto"
                />
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
