interface NextQuestion {
  content: string;
  next: number;
}

interface Result {
  content: string;
  result: string;
}

type Next = NextQuestion | Result;

export interface questionDataType {
  id: number;
  question: string;
  answers: Next[];
}

export interface resultDataType {
  id: string;
  content: string;
  link: string;
}
