import { type ReactNode, createContext, useRef, useContext } from "react";
import { useStore } from "zustand";

import { type AnswerStore, createAnswerStore } from "./answer-store";

export type AnswerStoreApi = ReturnType<typeof createAnswerStore>;

export const AnswerStoreContext = createContext<AnswerStoreApi | undefined>(
  undefined,
);

export interface AnswerStoreProviderProps {
  children: ReactNode;
}

export const AnswerStoreProvider = ({ children }: AnswerStoreProviderProps) => {
  const storeRef = useRef<AnswerStoreApi>();
  if (!storeRef.current) {
    storeRef.current = createAnswerStore();
  }

  return (
    <AnswerStoreContext.Provider value={storeRef.current}>
      {children}
    </AnswerStoreContext.Provider>
  );
};

export const useAnswerStore = <T,>(selector: (store: AnswerStore) => T): T => {
  const answerStoreContext = useContext(AnswerStoreContext);

  if (!answerStoreContext) {
    throw new Error(`useAnswerStore must be used within AnswerStoreProvider`);
  }

  return useStore(answerStoreContext, selector);
};
