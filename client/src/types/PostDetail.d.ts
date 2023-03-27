import { validationStateType } from './PostDetail.d';
import { type } from '@testing-library/user-event/dist/type';

export interface PostStateType {
  post: {
    isLike: boolean;
    isDislike: boolean;
    isBookmark: boolean;
    reommendPosts: unknown;
    postDetail: unknown;
    deleteType: unknown;
    isOpenDelete: boolean;
    isOpenFilter: boolean;
    isOpenReport: boolean;
    reportOption: unknown;
    reportType: unknown;
    currentImg: unknown;
    removedImg: unknown;
    totalImg: unknown;
    isOpeneIntro: boolean;
    addedImg: unknown;
  };
}

export interface CommentStateType {
  comment: {
    isCommentLike: boolean;
    isCommentDislike: boolean;
    commentValue: string;
    commentId: unknown;
    isEdit: Array<boolean>;
    isOpeneIntro: boolean;
    page: number;
  };
}

export interface ReplyStateType {
  reply: {
    isReplyLike: boolean;
    isReplyDislike: boolean;
    replyValue: string;
    replyId: number;
    isEdit: Array<boolean>;
    isOpened: Array<boolean>;
    totalReplies: Array;
    replyCont: number;
    isOpeneIntro: boolean;
    page: number;
  };
}

export interface ValidationStateType {
  validation: {
    titleErr: string;
    bodyErr: string;
    tagErr: string;
    reportErr: string;
  };
}

export interface PostInputStateType {
  postInput: {
    body: string;
    tag: Array<object>;
    tagContent: string;
    title: string;
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
  isThumbdown: boolean;
}

export interface CommentType {
  commentId: number;
  memberName: string;
  memberImage: string;
  createdAt: string;
  modifiedAt: string;
  isDeleted: boolean;
  isModified: boolean;
  replyCount: number;
  thumbupCount: number;
  thumbDownCount: number;
  isThumbup: boolean;
  isThumbdown: boolean;
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
  isThumbdown: boolean;
  content: string;
}

export interface CommentProps {
  commentInfo: CommentType;
}

export interface ReplyProps {
  replyInfo: ReplyType;
  idx: number;
}

export interface OnClick {
  onClick(): void;
}
