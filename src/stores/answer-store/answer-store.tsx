import { create } from "zustand";
import { Answer } from "@/interfaces/Answer";
import { Test_Answer } from "@/DUMMY_DATA";

export type AnswerState = {
  items: Answer[];
};

export type AnswerActions = {
  getByQuestionId: (questionId: string) => Answer[];
  onAdd: (answer: Omit<Answer, "id">) => void;
  onRemove: (id: string) => void;
  onUpdate: (id: string, Answer: Answer) => void;
};

export type AnswerStore = AnswerState & AnswerActions;

export const defaultInitState: AnswerState = {
  items: Test_Answer,
};

export const createAnswerStore = (
  initState: AnswerState = defaultInitState
) => {
  return create<AnswerStore>()((set, get) => ({
    ...initState,

    getByQuestionId: (questionId: string) => {
      return get().items.filter((item) => item.questionId === questionId);
    },

    onAdd: (answer: Omit<Answer, "id">) => {
      set((state) => {
        const newAnswer: Answer = {
          id: Math.round(Math.floor(Math.random() * 100)).toString(),
          ...answer,
        };
        const newAnswers = [...state.items, newAnswer];
        localStorage.setItem("answers", JSON.stringify(newAnswers));
        return { items: newAnswers };
      });
    },

    onRemove: (id: string) =>
      set((state) => {
        const newList = state.items.filter((item) => item.id !== id);
        localStorage.setItem("answers", JSON.stringify(newList));
        return { items: newList };
      }),

    onUpdate: (id: string, answer: Answer) => {
      set((state) => {
        const newAnswerList = state.items.map((item) =>
          item.id === id ? answer : item
        );
        localStorage.setItem("answers", JSON.stringify(newAnswerList));
        return { items: newAnswerList };
      });
    },
  }));
};
