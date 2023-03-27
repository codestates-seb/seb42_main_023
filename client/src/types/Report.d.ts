export interface PageInfo {
  page: number;
  size: number;
  totalElement: number;
  totalPages: number;
  orderby: string;
}

export interface ReportLists {
  description: string;
  postId: number;
  reportCategory: string;
  reportId: number;
  reportedAt: string;
  targetType: string;
  writer: string;
}

export interface Report {
  pageInfo: PageInfo;
  reports: ReportLists[];
}

export interface SingleReport {
  reportId: number;
  reportedAt: string;
  reportCategory: string;
  targetType: string;
  writer: string;
  reporter: string;
  description: string;
  postId: number;
}
