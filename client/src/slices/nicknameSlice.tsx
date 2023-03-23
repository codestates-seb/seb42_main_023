import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const nicknameSlice = createSlice({
  name: 'nickname',
  initialState: {
    nicknameErr: '',
  },
  reducers: {
    // 닉네임 유효성 검사 에러
    setNicknameErr: (state, action: PayloadAction<string>) => {
      state.nicknameErr = action.payload;
    },
  },
});

export default nicknameSlice;
export const { setNicknameErr } = nicknameSlice.actions;
