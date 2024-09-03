import { create } from "zustand";
import { Answer, CreateUpdateAnswer } from "@/interfaces/Answer";
import { Test_Answer } from "@/DUMMY_DATA";

export type AnswerState = {
  items: Answer[];
};

export type AnswerActions = {
  getByQuestionId: (questionId: string) => Answer[];
  getById: (id: string) => Answer | undefined;
  onAdd: (answer: CreateUpdateAnswer) => void;
  onRemove: (id: string) => void;
  onUpdate: (id: string, Answer: CreateUpdateAnswer) => void;
  onLike: (id: string) => void;
  onDislike: (id: string) => void;
};

export type AnswerStore = AnswerState & AnswerActions;

export const defaultInitState: AnswerState = {
  items: localStorage.getItem("answers")
    ? JSON.parse(localStorage.getItem("answers")!)
    : Test_Answer,
};

export const createAnswerStore = (
  initState: AnswerState = defaultInitState,
) => {
  return create<AnswerStore>()((set, get) => ({
    ...initState,

    getByQuestionId: (questionId: string) => {
      return get().items.filter((item) => item.questionId === questionId);
    },

    getById: (id: string) => {
      return get().items.find((item) => item.id === id);
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
            : item,
        );
        localStorage.setItem("answers", JSON.stringify(newAnswerList));
        return { items: newAnswerList };
      });
    },

    onLike: (id) => {
      set((state) => {
        const newAnswerList = state.items.map((item) =>
          item.id === id
            ? {
                ...item,
                likeCount: item.likeCount + 1,
              }
            : item,
        );

        localStorage.setItem("answers", JSON.stringify(newAnswerList));
        return { items: newAnswerList };
      });
    },

    onDislike: (id) => {
      set((state) => {
        const newAnswerList = state.items.map((item) =>
          item.id === id
            ? {
                ...item,
                dislikeCount: item.dislikeCount + 1,
              }
            : item,
        );

        localStorage.setItem("answers", JSON.stringify(newAnswerList));
        return { items: newAnswerList };
      });
    },
  }));
};
