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

export function uppercaseFirstLetter(word) {
  if (!word) {
    return;
  }

  return word[0].toUpperCase() + word.substring(1);
}
