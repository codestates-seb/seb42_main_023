export interface Report {
  reportId: number;
  reportedAt: string;
  reportCategory: string;
  targetType: string;
  content: string;
  writer: string;
  reporter: string;
  description: string;
  postId: number;
}
