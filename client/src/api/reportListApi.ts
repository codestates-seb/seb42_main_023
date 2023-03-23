import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// interface Info {
//   page: number;
//   size: number;
//   totalElement: number;
//   totalPage: number;
// }

// interface Report {
//   reportId: number;
//   reportedAT: string;
//   reportCategory: string;
//   targetType: string;
//   title: string;
//   writer: string;
//   reporter: string;
//   description: string;
//   postId: number | null;
//   commentId: number | null;
//   replyId: number | null;
// }

// interface ReportsStandBy {
//   pageInfo: Info;
//   reports: Report;
// }

// interface QueryArg {
//   page: number;
//   orderby: string;
// }

// 미처리 신고글 get 요청, page와 orderby에 따라 달라지는 리스트.
// export const reportListApi = createApi({
//   baseQuery: fetchBaseQuery({ baseUrl: 'https://thedragonmoney.com' }),
//   tagTypes: ['report'],
//   endpoints: (builder) => ({
//     getReportsStandBy: builder.query<ReportsStandBy, QueryArg>({
//       query: ({ page = 1, orderby = 'all' }) =>
//         `reportsstandby?page=${page}&orderby=${orderby}`,
//       providesTags: ['report'],
//     }),
//     deleteReport: builder.mutation({
//       query: ({ reportId }) => ({
//         url: `/reports/${reportId}`,
//         method: 'DELETE',
//       }),
//       invalidatesTags: ['report'],
//     }),
//   }),
// });

// // TODO: 처리된 신고글 조회. page와 orderby에 따라 달라지는 리스트.

// // 신고 세부 내용 조회
// export const reportReviewApi = createApi({
//   baseQuery: fetchBaseQuery({ baseUrl: 'https://thedragonmoney.com' }),
//   endpoints: (builder) => ({
//     getReportReview: builder.query({
//       query: (reportId) => `reports/${reportId}`,
//     }),
//   }),
// });

// export const { useGetReportsStandByQuery, useDeleteReportMutation } =
//   reportListApi;

// export const { useGetReportReviewQuery } = reportReviewApi;
