import React from "react";

import { AuthStoreProvider } from "./auth-store/auth-store-provider";
import { QuestionStoreProvider } from "./question-store/question-store-provider";
import { AnswerStoreProvider } from "./answer-store/answer-store-provider";
import { CategoryStoreProvider } from "./category-store/category-store-provider";

function StoreProviders({ children }: { children: React.ReactNode }) {
  return (
    <AuthStoreProvider>
      <QuestionStoreProvider>
        <AnswerStoreProvider>
          <CategoryStoreProvider>{children}</CategoryStoreProvider>
        </AnswerStoreProvider>
      </QuestionStoreProvider>
    </AuthStoreProvider>
  );
}

export default StoreProviders;
