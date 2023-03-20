interface NextQuestion {
  id: number;
  content: string;
  next: number;
}

interface Result {
  id: number;
  content: string;
  result: string;
}

type Next = NextQuestion | Result;

export interface questionDataType {
  id: number;
  question: string;
  subinfo?: string;
  answers: Next[];
}
