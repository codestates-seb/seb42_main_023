interface Tags {
  tagName: string;
}

export interface PostListItem {
  postId: number;
  imgUrl: string;
  title: string;
  tags: Tags[];
  memberName: string;
  createdAt: string;
  modified_at: string;
  viewCount: number;
  thumbupCount: number;
  commentCount: number;
}
export interface CommentType {
  commentId: number;
  postId: number;
  memberName: string;
  memberImage: string;
  createdAt: string;
  modifiedAt: string;
  isModified: boolean;
  replyCount: number;
  thumbupCount: number;
  thumbdownCount: number;
  isThumbup: boolean;
  isThumbdown: boolean;
  length: number;
  comment: string;
}
