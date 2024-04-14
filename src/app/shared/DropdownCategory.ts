import { Card } from "./Card";
import { SpendCategory } from "./SpendCategory";

export interface Category {
  value: number,
  label: string,
  inactive: boolean
}

// Função para converter SpendCategory para Category
export function convertSpendCategoryToCategory(spendCategory: SpendCategory): Category {
  return {
    value: spendCategory.categoryId,
    label: spendCategory.description,
    inactive: false // TODO futuramente trazer do banco
  };
}

// Função para converter Card para Category
export function convertCardCategoryToCategory(card: Card): Category {
  return {
    value: card.id,
    label: `${card.cardName} / ${card.finalDigits}` ,
    inactive: false // TODO futuramente trazer do banco
  };
}
