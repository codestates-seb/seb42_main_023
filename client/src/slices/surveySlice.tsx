import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { questionDataType } from '../types/RecommendedLoan';

interface SurveyState {
  currentQuestion: questionDataType | null;
  resultId: string | null;
}

const initialState: SurveyState = {
  currentQuestion: null,
  resultId: null,
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
  },
});

export default surveySlice;
export const { setCurrentQuestion, setResultId } = surveySlice.actions;
