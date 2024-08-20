import { create } from "zustand";
import { Answer, CreateUpdateAnswer } from "@/interfaces/Answer";
import { Test_Answer } from "@/DUMMY_DATA";

export type AnswerState = {
  items: Answer[];
};

export type AnswerActions = {
  getByQuestionId: (questionId: string) => Answer[];
  onAdd: (answer: CreateUpdateAnswer) => void;
  onRemove: (id: string) => void;
  onUpdate: (id: string, Answer: CreateUpdateAnswer) => void;
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

    onAdd: (answer: CreateUpdateAnswer) => {
      set((state) => {
        const newAnswer: Answer = {
          id: Math.round(Math.floor(Math.random() * 100)).toString(),
          ...answer,
          likeCount: 0,
          dislikeCount: 0,
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

    onUpdate: (id: string, answer: CreateUpdateAnswer) => {
      set((state) => {
        const newAnswerList = state.items.map((item) =>
          item.id === id
            ? {
                ...answer,
                id: item.id,
                likeCount: item.likeCount,
                dislikeCount: item.dislikeCount,
              }
            : item
        );
        localStorage.setItem("answers", JSON.stringify(newAnswerList));
        return { items: newAnswerList };
      });
    },
  }));
};
