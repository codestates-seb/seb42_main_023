import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// 신고 API
export const reportApi = createApi({
  reducerPath: 'reportApi',
  baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_SERVER_ADDRESS }),
  tagTypes: ['Report'],
  endpoints: (builder) => ({
    // 신고 조회
    getReport: builder.query({
      query: ({}) => `reports`,
      providesTags: (result, error, arg) => {
        return [{ type: 'Report', id: 'report' }];
      },
    }),
    // 신고 추가
    setReport: builder.mutation({
      query: ({
        reportReason,
        description,
        targetType,
        postId,
        commentId,
        replyId,
        reporterName,
      }) => {
        return {
          url: `reports`,
          method: 'POST',
          body: { targetType },
        };
      },

      invalidatesTags: (result, error, arg) => [
        { type: 'Report', id: 'report' },
      ],
    }),
  }),
});
