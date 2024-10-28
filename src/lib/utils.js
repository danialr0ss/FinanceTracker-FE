import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function getMostExpensivePurchase(purchases) {
  let mostExpensiveItem = purchases[0];
  for (const item of purchases) {
    if (item?.amount > mostExpensiveItem?.amount) {
      mostExpensiveItem = item;
    }
  }
  return mostExpensiveItem ? mostExpensiveItem?.amount.toFixed(2) : "0.00";
}

export function getMostExpensiveCategory(purchases) {
  const categoryAndPrices = new Map();
  let mostExpensiveCategory = { category: "N/A", amount: 0 };

  for (const item of purchases) {
    if (!categoryAndPrices.has(item?.category)) {
      categoryAndPrices.set(item?.category, item?.amount);
    } else {
      const oldTotalValue = categoryAndPrices.get(item?.category);
      categoryAndPrices.set(item?.category, item?.amount + oldTotalValue);
    }

    if (categoryAndPrices.get(item?.category) > mostExpensiveCategory.amount) {
      mostExpensiveCategory = {
        category: item?.category,
        amount: categoryAndPrices.get(item?.category),
      };
    }
  }

  return mostExpensiveCategory.category;
}

export function uppercaseFirstLetter(sentence) {
  if (!sentence) {
    return;
  }
  const words = sentence.split(" ");
  let newSentence = "";
  for (const word of words) {
    newSentence = word[0].toUpperCase() + word.substring(1);
    +" ";
  }

  return newSentence.trim();
}

export const months = [
  { name: "January", number: 0 },
  { name: "February", number: 1 },
  { name: "March", number: 2 },
  { name: "April", number: 3 },
  { name: "May", number: 4 },
  { name: "June", number: 5 },
  { name: "July", number: 6 },
  { name: "August", number: 7 },
  { name: "September", number: 8 },
  { name: "October", number: 9 },
  { name: "November", number: 10 },
  { name: "December", number: 11 },
];

export const years = Array.from(
  { length: new Date().getFullYear() - 1950 + 1 },
  (_, index) => index + 1950
);

export const formatDate = (date) => {
  const dateObject = new Date(date);
  return `${dateObject.getDate()} ${months[dateObject.getMonth()].name} ${dateObject.getFullYear()}`;
};
