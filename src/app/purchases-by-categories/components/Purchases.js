import { useSelector } from "react-redux";
import ExpensesCard from "./ExpensesCard";
import AddCard from "./AddCard";
import Image from "next/image";
export default function Purchases() {
  const selectedCategory = useSelector(
    (state) => state.history.currentCategory
  );

  const reversedPurchases = [...selectedCategory?.purchases].reverse();

  return (
    <div className={"w-full h-full bg-white border-4 rounded-xl p-8"}>
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
        <div className="w-full h-full flex flex-col justify-evenly items-center ">
          <Image
            priority
            src="/homeImage.jpg"
            alt="illustration"
            className="object-contain overflow-hidden w-auto h-auto"
            width={800}
            height={800}
          />
        </div>
      )}
    </div>
  );
}
