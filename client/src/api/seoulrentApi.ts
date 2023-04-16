import { apiSlice } from './apiSlice';

export const seoulrentApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getSeoulRentList: builder.query({
      query: ({ param }) => `rent-price/house/seoul`,
    }),
  }),
});
