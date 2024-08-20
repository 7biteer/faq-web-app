export interface CreateQuestion {
  userId: string;
  tag: string[];
  title: string;
  description: string;
}

export interface Question {
  id: string;
  userId: string;
  tag: string[];
  title: string;
  description: string;
}
