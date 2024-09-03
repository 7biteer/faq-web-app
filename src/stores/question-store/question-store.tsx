import { create } from "zustand";
import { Question } from "@/interfaces/Question";
import { Test_Question } from "@/DUMMY_DATA";

export type QuestionState = {
  items: Question[];
};

export type QuestionActions = {
  onAdd: (question: Omit<Question, "id">) => void;
  onRemove: (id: string) => void;
  onUpdate: (id: string, question: Question) => void;
  getById: (id: string) => Question | undefined;
};

export type QuestionStore = QuestionState & QuestionActions;

export const defaultInitState: QuestionState = {
  items: localStorage.getItem("questions")
    ? JSON.parse(localStorage.getItem("questions")!)
    : Test_Question,
};

export const createQuestionStore = (
  initState: QuestionState = defaultInitState,
) => {
  return create<QuestionStore>()((set, get) => ({
    ...initState,
    onAdd: (question: Omit<Question, "id">) => {
      set((state) => {
        const newQuestion: Question = {
          id: Math.round(Math.floor(Math.random() * 100)).toString(),
          ...question,
        };
        const newQuestions = [...state.items, newQuestion];
        localStorage.setItem("questions", JSON.stringify(newQuestions));
        return { items: newQuestions };
      });
    },

    onRemove: (id: string) =>
      set((state) => {
        const newList = state.items.filter((item) => item.id !== id);
        localStorage.setItem("questions", JSON.stringify(newList));
        return { items: newList };
      }),

    onUpdate: (id: string, question: Question) => {
      set((state) => {
        const newQuestionList = state.items.map((item) =>
          item.id === id ? question : item,
        );
        localStorage.setItem("questions", JSON.stringify(newQuestionList));
        return { items: newQuestionList };
      });
    },

    getById: (id: string) => {
      return get().items.find((item) => item.id === id);
    },
  }));
};
