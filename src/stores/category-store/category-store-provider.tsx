import { type ReactNode, createContext, useRef, useContext } from "react";
import { useStore } from "zustand";

import { type CategoryStore, createCategoryStore } from "./category-store";

export type CategoryStoreApi = ReturnType<typeof createCategoryStore>;

export const CategoryStoreContext = createContext<CategoryStoreApi | undefined>(
  undefined,
);

export interface CategoryStoreProviderProps {
  children: ReactNode;
}

export const CategoryStoreProvider = ({
  children,
}: CategoryStoreProviderProps) => {
  const storeRef = useRef<CategoryStoreApi>();
  if (!storeRef.current) {
    storeRef.current = createCategoryStore();
  }

  return (
    <CategoryStoreContext.Provider value={storeRef.current}>
      {children}
    </CategoryStoreContext.Provider>
  );
};

export const useCategoryStore = <T,>(
  selector: (store: CategoryStore) => T,
): T => {
  const categoryStoreContext = useContext(CategoryStoreContext);

  if (!categoryStoreContext) {
    throw new Error(
      `useCategoryStore must be used within CategoryStoreProvider`,
    );
  }

  return useStore(categoryStoreContext, selector);
};
