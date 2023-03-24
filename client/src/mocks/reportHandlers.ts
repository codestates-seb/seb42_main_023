import { rest } from 'msw';
import { singleReport, reportList } from './reportData';

export const reportHanlders = [
  //미처리 신고글 get
  rest.get(`/reportsstandby?page=1&orderby=all`, (req, res, ctx) => {
    const data = reportList;
    return res(ctx.status(200), ctx.json(data));
  }),

  //처리된 신고글 get
  rest.get(`/reports/deleted`, (req, res, ctx) => {
    const data = reportList;
    return res(ctx.status(200), ctx.json(data));
  }),

  rest.get(`/reports/1`, (req, res, ctx) => {
    const data = singleReport;
    return res(ctx.status(200), ctx.json(data));
  }),
];
