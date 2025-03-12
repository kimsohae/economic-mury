export type Answer = {
  quizId: string;
  optionId: string;
  isCorrect?:boolean;
  correctRate?:number;
}
export type User = {
  progress: number; // 진행도 0~1
  score: number; // 점수
  selectedAnswers: Answer[];
};


export const RANKS = ["stone", "desert", "grass", "plant", "rice", "jungle"] as const;
export type Rank = typeof RANKS[number];

export type Category = 'macro' | 'savings' | 'pension' | 'realEstate' | 'stocks' | 'finance';
export type QuizOption = {
    id: string;
    text: string;
    isCorrect: boolean; // 정답 여부
  };
  
export type Quiz = {
    id: string;
    content: {
      context?: string; // 질문 배경 설명
      question: string; // 질문
    };
    options: QuizOption[];
    explanations: string;
    category: Category;
    correctRate?: number;
};


/** API RESPONSE */
export type UserResult = {
    id: string;
    score: number;
    rank: Rank;
    ranking: {
      total: number;
      position: number;
    }
    wrongAnswers: Answer[];
}
