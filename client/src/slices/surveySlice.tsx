import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { questionDataType } from '../types/RecommendedLoan';

interface SurveyState {
  currentQuestion: questionDataType | null;
  resultId: string | null;
  isChecked: boolean;
  next: string | number;
}

const initialState: SurveyState = {
  currentQuestion: null,
  resultId: null,
  isChecked: false,
  next: '',
};

const surveySlice = createSlice({
  name: 'survey',
  initialState,
  reducers: {
    // 현재 질문
    setCurrentQuestion: (
      state,
      action: PayloadAction<questionDataType | null>,
    ) => {
      state.currentQuestion = action.payload;
    },
    // 결과 id
    setResultId: (state, action: PayloadAction<string | null>) => {
      state.resultId = action.payload;
    },
    // 유저가 선택했는지에 대한 boolean 값
    setIsChecked: (state, action: PayloadAction<boolean>) => {
      state.isChecked = action.payload;
    },
    // 다음 질문 또는 결과에 대한 정보
    setNext: (state, action: PayloadAction<string | number>) => {
      state.next = action.payload;
    },
  },
});

export default surveySlice;
export const { setCurrentQuestion, setResultId, setIsChecked, setNext } =
  surveySlice.actions;
