import ShortcutButton from "@/components/ShortcutButton";
import { BiCategory } from "react-icons/bi";
import { FaRegCalendarCheck } from "react-icons/fa6";
import { GrPieChart } from "react-icons/gr";
import UpdateBalanceButton from "@/components/UpdateBalanceButton";

export default function Home() {
  const username = "User";

  function greet() {
    const date = new Date();
    const time = date.getHours();
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
      title: "Purchases By Month",
      icon: FaRegCalendarCheck,
      href: "/purchases-by-month",
    },
    {
      title: "Purchase Breakdown",
      icon: GrPieChart,
      href: "",
    },
  ];

  const recentPurchases = [
    {
      amount: "$11020.00",
      date: "15-06-24",
      category: "Entertainment and Leisure",
    },
    {
      amount: "$21.23",
      date: "16-03-23",
      category: "Travel",
    },
    {
      amount: "$56.65",
      date: "14-12-24",
      category: "Food",
    },
    {
      amount: "$514.65",
      date: "14-06-24",
      category: "Food",
    },
  ];

  const summary = {
    mostExpensivePurchase: "$321.23",
    remainingBudget: "$2321.12",
    mostExpensiveCategory: "Entertainment and Leisure",
  };

  return (
    <div className="min-w-[1850px] w-screen p-16 bg-backgroundColor">
      <div className="flex flex-col  w-full h-full p-12 border-2 rounded-xl bg-white space-y-12">
        <h1 className="text-3xl font-bold">{`Good ${greet()}, ${username}`}</h1>
        <div className="flex flex-1 justify-evenly gap-16">
          {shortcuts.map((item, index) =>
            item.dialog ? (
              <item.dialog key={index}>
                <ShortcutButton
                  title={item.title}
                  href={item.href}
                  icon={item.icon}
                />
              </item.dialog>
            ) : (
              <ShortcutButton
                key={index}
                title={item.title}
                href={item.href}
                icon={item.icon}
              />
            )
          )}
          <UpdateBalanceButton />
        </div>
        <div className="flex flex-1 justify-evenly">
          <div className="">
            <h2 className="text-2xl pb-8 font-bold">Recent Purchases</h2>
            <div className="border-2 rounded-xl p-8 w-[750px] h-[300px] overflow-scroll">
              <div className="text-xl font-bold m-4">
                <span className="w-48 inline-block">Date</span>
                <span className="w-40 inline-block">Amount</span>
                <span>Category</span>
              </div>
              {recentPurchases.map((item, index) => (
                <div className="text-xl m-4" key={index}>
                  <span className="w-48 inline-block">{item.amount}</span>
                  <span className="w-40 inline-block">{item.date}</span>
                  <span className="w-72 truncate">{item.category}</span>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h2 className="text-2xl pb-8 font-bold">Summary</h2>
            <div className="border-2 rounded-xl p-8 w-[750px] h-[300px] ">
              <div className="text-xl">
                <div className="p-4 flex justify-between">
                  <p className="font-bold">Remaining Budget : </p>
                  <p>{summary.remainingBudget}</p>
                </div>
                <div className="p-4 flex justify-between">
                  <p className="font-bold">Most Expensive Purchase : </p>
                  <p>{summary.mostExpensivePurchase}</p>
                </div>
                <div className="p-4 flex justify-between">
                  <p className="font-bold">Most Spent On Category : </p>
                  <p className="w-80 truncate text-end">
                    {summary.mostExpensiveCategory}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
