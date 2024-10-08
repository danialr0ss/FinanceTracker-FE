import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import ExpensesCard from "./ExpensesCard";
import AddCard from "./AddCard";
import Spinner from "@/components/Spinner";
export default function Purchases() {
  const [isLoading, setIsLoading] = useState(true);
  const selectedCategory = useSelector(
    (state) => state.history.currentCategory
  );
  const imageSrc = "/homeImage.jpg";

  const reversedPurchases = [...selectedCategory?.purchases].reverse();

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
    <div className={"w-full h-full bg-white border-2 rounded-xl p-8"}>
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
            <Spinner size={44} />
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
  );
}
