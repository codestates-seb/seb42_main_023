export type NewType = StateType & SecondStateType;
export interface StateType {
  postSlice: {
    isLike: boolean;
    isDislike: boolean;
    isBookmark: boolean;
    isCommentLike: boolean;
    isCommentDislike: boolean;
    isReplyLike: boolean;
    isReplyDislike: boolean;
    reommendPosts: unknown;
    postDetail: unknown;
    comments: unknown;
    replies: unknown;
    isOpend: unknown;
    totalReplies: Array;
    commentId: unknown;
  };
}

export interface SecondStateType {
  comment: {
    commentVal: string;
    replyVal: string;
    currentComment: unknown;
    isEdit: unknown;
  };
}

export interface PostType {
  postId: number;
  memberName: string;
  memberImage: string;
  createdAt: string;
  modifiedAt: string;
  isModified: boolean;
  viewCount: number;
  thumbupCount: number;
  thumbDownCount: number;
  title: string;
  content: string;
  isBookmarked: boolean;
  isThumbup: boolean;
  isThumbDown: boolean;
}

export interface CommentType {
  commentId: number;
  memberName: string;
  memberImage: string;
  createdAt: string;
  modifiedAt: string;
  isModified: boolean;
  replyCount: number;
  thumbupCount: number;
  thumbDownCount: number;
  isThumbup: boolean;
  isThumbDown: boolean;
  length: number;
  content: string;
}

export interface ReplyType {
  commentId: number;
  replyId: number;
  memberName: string;
  memberImage: string;
  createdAt: string;
  modifiedAt: string;
  isModified: boolean;
  thumbupCount: number;
  thumbDownCount: number;
  isThumbup: boolean;
  isThumbDown: boolean;
  content: string;
}

interface Props {
  replyInfo: ReplyType;
}
