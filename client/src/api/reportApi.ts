import { apiSlice } from './apiSlice';

export const reportApi = apiSlice
  .enhanceEndpoints({ addTagTypes: ['report'] })
  .injectEndpoints({
    endpoints: (builder) => ({
      // 미처리 신고글 전체 조회 [관리자 페이지]
      getReportsStandBy: builder.query({
        query: ({ page = 1, orderby = 'all' }) =>
          `reportsstandby?page=${page}&orderby=${orderby}`,
        providesTags: ['report'],
      }),
      // 처리된 신고글 전체 조회 [관리자 페이지]
      getReportsDeleted: builder.query({
        query: ({ page = 1, orderby = 'all' }) =>
          `reportsdeleted?page=${page}&orderby=${orderby}`,
        providesTags: ['report'],
      }),
      // 신고 세부 내용 조회 [관리자 페이지]
      getReportReview: builder.query({
        query: (reportId) => `reports/${reportId}`,
        providesTags: ['report'],
      }),
      // 신고글 삭제 [관리자 페이지]
      deleteReport: builder.mutation({
        query: ({ reportId }) => ({
          url: `/reports/${reportId}`,
          method: 'DELETE',
        }),
        invalidatesTags: ['report'],
      }),
      // 신고 추가 [일반 유저 페이지]
      postReport: builder.mutation({
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
        invalidatesTags: ['report'],
      }),
    }),
  });

export const {
  useGetReportsStandByQuery,
  useGetReportsDeletedQuery,
  useGetReportReviewQuery,
  useDeleteReportMutation,
  usePostReportMutation,
} = reportApi;
