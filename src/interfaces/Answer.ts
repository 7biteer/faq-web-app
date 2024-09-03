export interface Answer {
  id: string;
  userId: string;
  text: string;
  questionId: string;
  likeCount: number;
  dislikeCount: number;
}

export interface CreateUpdateAnswer {
  id?: string;
  userId: string;
  text: string;
  questionId: string;
}
