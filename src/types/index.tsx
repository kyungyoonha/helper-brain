export interface Neuron {
  id: string;
  star: number;
  question_text: string;
  question_url: string;
  category1: string;
  category2: string;
  category3: string;
  answer1_text: string;
  answer1_url: string;
  answer2_text: string;
  answer2_url: string;
  answer3_text: string;
  answer3_url: string;
  createdAt: string; // '2023-10-05'
  updatedAt: string; // '2023-10-05'
  status: string;
}

export interface Dashboard {
  id: string | null;
  date: string;
  totalCorrectCount: number;
  totalIncorrectCount: number;
  total: number;
}
