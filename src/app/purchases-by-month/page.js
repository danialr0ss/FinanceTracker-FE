"use client";
import BackButton from "@/components/BackButton";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import {
  getMostExpensiveCategory,
  getMostExpensivePurchase,
} from "@/lib/utils";
import { useGetPurchasesQuery } from "@/store/slices/api/purchaseApi";
import { Button } from "@/components/ui/button";
import SkeletonLoading from "@/components/SkeletonLoading";

export default function Page() {
  const earliestYear = 1950;
  const now = new Date();
  const month = now.getMonth();
  const year = now.getFullYear();
  const [selectedMonth, setSelectedMonth] = useState(month);
  const [selectedYear, setSelectedYear] = useState(year);
  const [queryMonth, setQueryMonth] = useState(month);
  const [queryYear, setQueryYear] = useState(year);

  const months = [
    { name: "January", number: 1 },
    { name: "February", number: 2 },
    { name: "March", number: 3 },
    { name: "April", number: 4 },
    { name: "May", number: 5 },
    { name: "June", number: 6 },
    { name: "July", number: 7 },
    { name: "August", number: 8 },
    { name: "September", number: 9 },
    { name: "October", number: 10 },
    { name: "November", number: 11 },
    { name: "December", number: 12 },
  ];

  const daysInMonth = `${new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate()}`;
  const { data: currentMonthlyPurchases, isLoading } = useGetPurchasesQuery({
    month: queryMonth,
    year: queryYear,
  });
  const years = Array.from({ length: now.getFullYear() - earliestYear + 1 });
  const purchases = currentMonthlyPurchases
    ? currentMonthlyPurchases.purchases
    : [];
  const totalAmountSpent = currentMonthlyPurchases
    ? currentMonthlyPurchases.total
    : 0;

  const summary = [
    {
      header: "Month",
      label: `${monthToString(queryMonth)} ${queryYear}`,
    },
    {
      header: "Days In Month",
      label: daysInMonth,
    },
    {
      header: "Purchases Made",
      label: purchases.length,
    },
    {
      header: "Amount Spent",
      label: `$${totalAmountSpent.toFixed(2)}`,
    },
    {
      header: "Most Expensive Purchase",
      label: `$${getMostExpensivePurchase(purchases)}`,
    },
    {
      header: "Most Spent Category",
      label: getMostExpensiveCategory(purchases),
    },
  ];

  function handleQueryPurchases() {
    setQueryMonth(selectedMonth);
    setQueryYear(selectedYear);
  }

  function monthToString(month) {
    if (month === 1) {
      return "January";
    } else if (month === 2) {
      return "February";
    } else if (month === 3) {
      return "March";
    } else if (month === 4) {
      return "April";
    } else if (month === 5) {
      return "May";
    } else if (month === 6) {
      return "June";
    } else if (month === 7) {
      return "July";
    } else if (month === 8) {
      return "August";
    } else if (month === 9) {
      return "September";
    } else if (month === 10) {
      return "October";
    } else if (month === 11) {
      return "November";
    } else {
      return "December";
    }
  }

  function parseDate(dateTime) {
    const dateObj = new Date(dateTime);
    const year = dateObj.getFullYear();

    let date = dateObj.getDate();

    if (date === 1 || date === 21 || date === 31) {
      date = date + "st";
    } else if (date === 2 || date === 22) {
      date = date + "nd";
    } else if (date === 3 || date === 23) {
      date = date + "3rd";
    } else {
      date = date + "th";
    }

    // getMonth is 0-based which required + 1 to be accurate
    const month = monthToString(dateObj.getMonth() + 1);
    let hour = dateObj.getHours();
    let meridiem = " am";
    let time = "";

    if (hour > 12) {
      hour = hour - 12;
      meridiem = " pm";
    }

    if (hour < 10) {
      time += `0${hour}:`;
    } else {
      time += `${hour}:`;
    }
    const minutes = dateObj.getMinutes();

    if (minutes < 10) {
      time += `0${minutes}`;
    } else {
      time += `${minutes}`;
    }

    time += meridiem;
    return { date: `${date} ${month} ${year}`, time: time };
  }

  return (
    <div className="w-full h-full bg-backgroundColor p-16 overflow-auto border">
      <div className="flex flex-col  bg-white border-2 rounded-xl p-16 space-y-8">
        <BackButton />
        <div className="flex justify-start">
          <div className="w-[400px] mr-8 text-3xl font-bold flex justify-center items-center ">
            Purchases
          </div>
          <div className="flex flex-1 gap-8">
            <Select onValueChange={setSelectedMonth} value={selectedMonth}>
              <SelectTrigger className="text-lg p-8 border-2">
                <SelectValue placeholder="Select A Month" />
              </SelectTrigger>
              <SelectContent>
                {months.map((item) => (
                  <SelectItem
                    value={item.number}
                    key={item.name}
                    className="text-lg"
                  >
                    {`${item.name} (${item.number})`}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select onValueChange={setSelectedYear} value={selectedYear}>
              <SelectTrigger className="text-lg p-8 border-2">
                <SelectValue placeholder="Select A Year" />
              </SelectTrigger>
              <SelectContent>
                {years.map((_, index) => (
                  <SelectItem
                    value={year - index}
                    key={year - index}
                    className="text-lg"
                  >
                    {year - index}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button
              className="h-full w-32 text-md p-4"
              onClick={handleQueryPurchases}
            >
              Search
            </Button>
          </div>
        </div>
        <div className="flex-1 flex gap-8 min-w-[500px]">
          <div className="w-[400px] flex flex-col rounded-xl border-2 border-borderColor p-8 space-y-8">
            <div>
              <h2 className="text-lg mb-4 font-bold">Summary</h2>
              <div className="w-full border-t-2 border-black" />
            </div>
            {summary.map((item) => (
              <div className="flex justify-between" key={item.header}>
                <span className="font-bold">{`${item.header} :`}</span>
                {isLoading ? (
                  <div className="h-full w-24">
                    <SkeletonLoading />
                  </div>
                ) : (
                  <span>{item.label}</span>
                )}
              </div>
            ))}
          </div>
          <div className="flex-1 rounded-xl border-2 border-borderColor p-8">
            <div className="text-lg mb-4 font-bold">
              <span className="mr-32">Amount</span>
              <span className="mr-32">Time</span>
              <span className="mr-56">Date</span>
              <span className="mr-64">Label</span>
              <span>Category</span>
            </div>
            <div className="w-full border-t-2 border-black" />
            <div className="h-[400px] py-6 space-y-8 overflow-auto">
              {isLoading
                ? Array.from({ length: 6 }).map((_, index) => (
                    <div
                      className="flex flex-row text-lg border-b-2 items-center pb-2 "
                      key={index}
                    >
                      <div className={"h-6 w-40 mr-8 "}>
                        <SkeletonLoading />
                      </div>
                      <div className={"h-6 w-36 mr-8"}>
                        <SkeletonLoading />
                      </div>
                      <div className={"h-6 w-60 mr-8"}>
                        <SkeletonLoading />
                      </div>
                      <div className={"h-6 w-64 mr-8"}>
                        <SkeletonLoading />
                      </div>
                      <div className={"h-6 w-48 mr-8"}>
                        <SkeletonLoading />
                      </div>
                    </div>
                  ))
                : purchases.map((item, index) => {
                    const { date, time } = parseDate(item.date);
                    return (
                      <div className="text-lg border-b-2" key={index}>
                        <span className="w-[196px] inline-block">
                          ${item.amount}
                        </span>
                        <span className="w-[170px] inline-block">{time}</span>
                        <span className="w-[268px] inline-block">{date}</span>
                        <span className="w-[306px] h-fit inline-block  align-top truncate pr-4">
                          {item.label}
                        </span>
                        <span>{item.category}</span>
                      </div>
                    );
                  })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
