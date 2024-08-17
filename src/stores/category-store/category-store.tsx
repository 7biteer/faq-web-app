import { create } from "zustand";
import { Category } from "@/interfaces/Category";
import { Test_Category } from "@/DUMMY_DATA";

export type CategoryState = {
  items: Category[];
  selectedTag: Category;
};

export type CategoryActions = {
  onAdd: (Category: Omit<Category, "id">) => void;
  onSelectTag: (id: string) => void;
};

export type CategoryStore = CategoryState & CategoryActions;

export const defaultInitState: CategoryState = {
  items: Test_Category,
  selectedTag: Test_Category[0],
};

export const createCategoryStore = (
  initState: CategoryState = defaultInitState
) => {
  return create<CategoryStore>()((set) => ({
    ...initState,

    onAdd: (category: Omit<Category, "id">) => {
      set((state) => {
        const newCategory: Category = {
          id: Math.round(Math.floor(Math.random() * 100)).toString(),
          ...category,
        };
        const newCategorys = [...state.items, newCategory];
        localStorage.setItem("category", JSON.stringify(newCategorys));
        return { items: newCategorys };
      });
    },

    onSelectTag: (id: string) => {
      set((state) => {
        const selectedTag = state.items.find((item) => item.id === id);
        return { selectedTag: selectedTag };
      });
    },
  }));
};
