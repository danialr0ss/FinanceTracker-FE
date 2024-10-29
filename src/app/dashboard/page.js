"use client";
import ShortcutButton from "@/components/ShortcutButton";
import { FaRegCalendarCheck } from "react-icons/fa6";
import AddPurchaseButton from "@/components/AddPurchaseButton";
import SettingsButton from "@/components/SettingsButton";
import { useEffect, useState } from "react";
import SkeletonLoading from "@/components/SkeletonLoading";
import { useGetPurchasesQuery } from "@/store/slices/api/purchaseApi";
import SignoutButton from "@/components/SignoutButton";
import LoadingSpinner from "@/components/LoadingSpinner";
import { AiOutlineSwap } from "react-icons/ai";

import {
  uppercaseFirstLetter,
  getMostExpensiveCategory,
  getMostExpensivePurchase,
} from "@/lib/utils";

export default function Home() {
  const now = new Date();
  const month = now.getMonth() + 1; // month is 0 indexed
  const year = now.getFullYear();
  const { data, isLoading: isLoadingPurchases } = useGetPurchasesQuery({
    month: month,
    year: year,
  });

  // show latest purchase first
  let purchases = data?.purchases || [];
  const totalMonthlyAmount = parseFloat(data?.total) | 0;
  const [username, setUsername] = useState("");
  const [isLoadingPage, setIsLoadingPage] = useState(false);
  function greet() {
    const time = now.getHours();
    if (time < 12) {
      return "Morning";
    } else if (time < 17) {
      return "Afternoon";
    }
    return "Evening";
  }

  const shortcuts = [
    {
      title: "Manage Purchases",
      icon: AiOutlineSwap,
      href: "/manage-purchases",
    },
    {
      title: "Purchase History",
      icon: FaRegCalendarCheck,
      href: "/purchases-by-month",
    },
  ];

  const summary = [
    {
      label: "Total Monthly Spending : ",
      value: `$${totalMonthlyAmount.toFixed(2)}`,
    },
    {
      label: "Most Expensive Purchase : ",
      value: `$${getMostExpensivePurchase(purchases)}`,
    },
    {
      label: "Most Spent On Category: ",
      value: uppercaseFirstLetter(getMostExpensiveCategory(purchases)),
    },
  ];

  useEffect(() => {
    const cookie = document.cookie;
    const usernameValueIndex = cookie.indexOf("username=") + 9;
    // make a substring that starts with the value of username
    const usernameSubstring = cookie.substring(usernameValueIndex);
    const lastIndex =
      usernameSubstring.indexOf(";") === -1
        ? usernameSubstring.length
        : usernameSubstring.indexOf(";");
    const username = usernameSubstring.substring(0, lastIndex);

    setUsername(username);
  }, []);

  function formatDate(date) {
    const dateObj = new Date(date);
    //getMonth is 0 index, putting 0 is January
    return `${dateObj.getDate()}-${dateObj.getMonth() + 1}-${dateObj.getFullYear()}`;
  }

  return (
    <div className="h-full p-outer-padding bg-backgroundColor relative">
      {isLoadingPage && (
        <div className="absolute h-full w-full backdrop-blur-lg z-10 top-0 left-0">
          <LoadingSpinner className="w-64 h-64 absolute  transform top-1/2 left-1/2 z-10 -translate-x-1/2 -translate-y-1/2 " />
        </div>
      )}
      <div className="flex flex-1 flex-col w-full h-full p-inner-padding border-2 rounded-xl bg-white space-y-12">
        <h1 className="text-3xl font-bold inline-flex">
          {`Good ${greet()}, `}
          {username || (
            <div className={"w-[200px]"}>
              <SkeletonLoading />
            </div>
          )}
        </h1>
        <div className="flex justify-between gap-16">
          <AddPurchaseButton />
          {shortcuts.map((item, index) => (
            <ShortcutButton
              key={index}
              title={item?.title}
              href={item?.href}
              icon={item?.icon}
              onClick={() => setIsLoadingPage(true)}
            />
          ))}
          <SettingsButton />
          <SignoutButton />
        </div>
        <div className="flex justify-between  gap-24 h-[266px]">
          <div className="space-y-8 w-full h-full">
            <h2 className="text-2xl font-bold">Recent Purchases</h2>
            <div className="border-2 rounded-xl px-8 py-4 w-full h-full overflow-scroll">
              <div className="text-xl font-bold m-4">
                <span className="w-52 inline-block">Date</span>
                <span className="w-44 inline-block">Amount</span>
                <span>Category</span>
              </div>
              {isLoadingPurchases ? (
                Array.from({ length: 5 }).map((_, index) => (
                  <div key={index} className="mx-4 my-8 flex flex-row">
                    <div className="w-[150px] h-[25px] mr-14">
                      <SkeletonLoading />
                    </div>
                    <div className="w-[120px] h-[25px] mr-14">
                      <SkeletonLoading />
                    </div>
                    <div className="w-[180px] h-[25px] mr-14">
                      <SkeletonLoading />
                    </div>
                  </div>
                ))
              ) : purchases.length !== 0 ? (
                purchases.slice(0, 5).map((item, index) => (
                  <div className="text-xl mx-4 my-8" key={index}>
                    <span className="w-52 inline-block">
                      {formatDate(item?.date)}
                    </span>
                    <span className="w-44 inline-block">
                      ${item?.amount.toFixed(2)}
                    </span>
                    <span className="w-72 truncate">
                      {uppercaseFirstLetter(item?.category)}
                    </span>
                  </div>
                ))
              ) : (
                <div className="text-xl mx-4 my-8">
                  <span className="w-52 inline-block">N/A</span>
                  <span className="w-44 inline-block">N/A</span>
                  <span className="w-72 truncate">N/A</span>
                </div>
              )}
            </div>
          </div>
          <div className="space-y-8 w-full h-full">
            <h2 className="text-2xl font-bold">Summary</h2>
            <div className="border-2 rounded-xl px-8 py-4 w-full h-full">
              <div className="text-xl">
                {summary.map((item) => (
                  <div className="p-4 flex justify-between" key={item.label}>
                    <p className="font-bold">{item.label}</p>
                    {isLoadingPurchases ? (
                      <div className="w-[250px] h-[25px]">
                        <SkeletonLoading />
                      </div>
                    ) : (
                      <p>{item.value}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
