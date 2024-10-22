"use client";
import ShortcutButton from "@/components/ShortcutButton";
import { BiCategory } from "react-icons/bi";
import { FaRegCalendarCheck } from "react-icons/fa6";
import AddPurchaseButton from "@/components/AddPurchaseButton";
import SettingsButton from "@/components/SettingsButton";
import { useEffect, useState } from "react";
import SkeletonLoading from "@/components/SkeletonLoading";
import { useGetPurchaseByMonthQuery } from "@/store/slices/api/purchaseApi";
import SignoutButton from "@/components/SignoutButton";

export default function Home() {
  const now = new Date();
  const {
    data,
    error,
    isLoading: isLoadingPurchases,
  } = useGetPurchaseByMonthQuery({
    month: now.getMonth(),
    year: now.getFullYear(),
  });
  const purchases = data?.purchases || [];
  const totalMonthlyAmount = parseFloat(data?.total) | 0;
  const [username, setUsername] = useState("");

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
      title: "Purchases By Category",
      icon: BiCategory,
      href: "/purchases-by-categories",
    },
    {
      title: "Purchase History",
      icon: FaRegCalendarCheck,
      href: "/purchases-by-month",
    },
  ];

  function getMostExpensivePurchase() {
    let mostExpensiveItem = purchases[0];
    for (const item of purchases) {
      if (item?.amount > mostExpensiveItem?.amount) {
        mostExpensiveItem = item;
      }
    }
    return mostExpensiveItem ? mostExpensiveItem?.amount.toFixed(2) : "0.00";
  }

  function getMostExpensiveCategory() {
    const categoryAndPrices = new Map();
    let mostExpensiveCategory = { category: "N/A", amount: 0 };

    for (const item of purchases) {
      if (!categoryAndPrices.has(item?.category)) {
        categoryAndPrices.set(item?.category, item?.amount);
      } else {
        const oldTotalValue = categoryAndPrices.get(item?.category);
        categoryAndPrices.set(item?.category, item?.amount + oldTotalValue);
      }

      if (
        categoryAndPrices.get(item?.category) > mostExpensiveCategory.amount
      ) {
        mostExpensiveCategory = {
          category: item?.category,
          amount: categoryAndPrices.get(item?.category),
        };
      }
    }

    return mostExpensiveCategory.category;
  }
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
    return `${dateObj.getDate()}-${dateObj.getMonth()}-${dateObj.getFullYear()}`;
  }

  return (
    <div className="w-full h-full p-16 bg-backgroundColor">
      <div className="flex flex-col  w-full h-full p-12 border-2 rounded-xl bg-white space-y-12">
        <h1 className="text-3xl font-bold px-16 inline-flex">
          {`Good ${greet()}, `}
          {username || (
            <div className={"w-[200px]"}>
              <SkeletonLoading />
            </div>
          )}
        </h1>

        <div className="flex flex-1 justify-evenly gap-16">
          <AddPurchaseButton />
          {shortcuts.map((item, index) => (
            <ShortcutButton
              key={index}
              title={item?.title}
              href={item?.href}
              icon={item?.icon}
            />
          ))}
          <SettingsButton />
          <SignoutButton />
        </div>
        <div className="flex flex-1 justify-evenly">
          <div className="">
            <h2 className="text-2xl pb-8 font-bold">Recent Purchases</h2>
            <div className="border-2 rounded-xl px-8 py-4 w-[750px] h-[300px] overflow-scroll">
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
                    <span className="w-72 truncate">{item?.category}</span>
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
          <div>
            <h2 className="text-2xl pb-8 font-bold">Summary</h2>
            <div className="border-2 rounded-xl px-8 py-4 w-[750px] h-[300px] ">
              <div className="text-xl">
                <div className="p-4 flex justify-between">
                  <p className="font-bold">Total Monthly Spending : </p>
                  {isLoadingPurchases ? (
                    <div className="w-[250px] h-[25px]">
                      <SkeletonLoading />
                    </div>
                  ) : (
                    <p>${totalMonthlyAmount.toFixed(2)}</p>
                  )}
                </div>
                <div className="p-4 flex justify-between">
                  <p className="font-bold">Most Expensive Purchase : </p>
                  {isLoadingPurchases ? (
                    <div className="w-[250px] h-[25px] ">
                      <SkeletonLoading />
                    </div>
                  ) : (
                    <p>${getMostExpensivePurchase()}</p>
                  )}
                </div>
                <div className="p-4 flex justify-between">
                  <p className="font-bold">Most Spent On Category : </p>
                  {isLoadingPurchases ? (
                    <div className="w-[250px] h-[25px]">
                      <SkeletonLoading />
                    </div>
                  ) : (
                    <p className="w-80 truncate text-end">
                      {getMostExpensiveCategory()}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
