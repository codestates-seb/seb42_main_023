import { apiSlice } from './apiSlice';

// 서울평균집값 데이터 가져오기
export const seoulrentApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getSeoulRentList: builder.query({
      query: ({ param }) => `rent-price/house/seoul`,
    }),
  }),
});
