export interface PostStateType {
  post: {
    isLike: boolean;
    isDislike: boolean;
    isBookmark: boolean;
    reommendPosts: unknown;
    postDetail: unknown;
    type: unknown;
    isOpenDelete: boolean;
    isOpenFilter: boolean;
  };
}

export interface CommentStateType {
  comment: {
    isCommentLike: boolean;
    isCommentDislike: boolean;
    commentValue: string;
    commentId: unknown;
    isEdit: unknown;
  };
}

export interface ReplyStateType {
  reply: {
    isReplyLike: boolean;
    isReplyDislike: boolean;
    replyValue: string;
    replyId: number;
    isEdit: unknown;
    isOpened: unknown;
    totalReplies: Array;
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

export interface CommentProps {
  commentInfo: CommentType;
}

export interface ReplyProps {
  replyInfo: ReplyType;
  idx: number;
}
