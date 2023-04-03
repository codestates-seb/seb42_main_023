<<<<<<< HEAD
import { validationStateType } from './PostDetail.d';
import { type } from '@testing-library/user-event/dist/type';

export interface PostStateType {
  post: {
    isOpenFilter: boolean;
    reportOption: unknown;
    reportType: unknown;
    currentImg: unknown;
    removedImg: unknown;
    totalImg: unknown;
    addedImg: unknown;
    remainImg: unknown;
    selectedMember: unknown;
  };
}

export interface CommentStateType {
  comment: {
    commentValue: string;
    commentId: unknown;
    isEdit: Array<boolean>;
    filter: string;
    filterOpen: boolean;
    orderby: string;
    page: unknwon;
  };
}

export interface ReplyStateType {
  reply: {
    replyValue: string;
    replyId: number;
    isEdit: Array<boolean>;
    isOpened: Array<boolean>;
    totalReplies: Array;
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
    isEdit: boolean;
=======
export interface StateType {
  postSlice: {
    isLike: boolean;
    isDislike: boolean;
    isBookmark: boolean;
    isCommentLike: boolean;
    isCommentDislike: boolean;
    isReplyLike: boolean;
    isReplyDislike: boolean;
    popularPosts: unknown;
    postDetail: unknown;
    comments: unknown;
    replies: unknown;
    isOpend: unknown;
    totalReplies: Array;
>>>>>>> 6038065ce9f8ca42c1f373aae8d2621ff9d4483d
  };
}

export interface PostType {
  recommends: Array<PostType>;
  commentCount: number;
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
  postId: number;
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
  isOpenIntro: boolean;
  isCommentOpenIntro: boolean;
  isReplyOpenIntro: boolean;
  setIsOpenCommentIntro?: (bool: boolean) => void;
  setIsOpenReplyIntro?: (bool: boolean) => void;
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

<<<<<<< HEAD
export interface CommentProps {
  commentInfo: CommentType;
  setPage?: (num: number) => void;
  replyCnt: number;
  setReplyCnt: (cnt: number) => void;
  refetch: () => void;
}

export interface ReplyProps {
  key: number;
  replyInfo: ReplyType;
  idx: number;
  replyPage: number;
  setIsOpenReport?: (bool: boolean) => void;
  setIsOpenDelete?: (bool: boolean) => void;
  setDeleteType?: (str: string) => void;
  isOpenReport: boolean;
  isOpenDelete: boolean;
  replyCount: number;
}

export interface ReplyInputProps {
  commentInfo: CommentType;
  replyCnt: number;
  setReplyCnt: (cnt: number) => void;
  refetch: () => void;
}

export interface CommentInputProps {
  setCommentCnt: (cnt: number) => void;
  commentCnt: number;
}

export interface ReportProps {
  setIsOpenReport?: (bool: boolean) => void;
  setIsOpenDelete?: (bool: boolean) => void;
  setDeleteType?: (str: string) => void;
  isOpenIntro: boolean;
  isOpenReport: boolean;
  isOpenDelete: boolean;
  isOpenIntro: boolean;
  isCommentOpenIntro: boolean;
  isReplyOpenIntro: boolean;
  setIsOpenCommentIntro?: (bool: boolean) => void;
  setIsOpenReplyIntro?: (bool: boolean) => void;
}

export interface OnClick {
  onClick(): void;
=======
interface Props {
  replyInfo: ReplyType;
>>>>>>> 6038065ce9f8ca42c1f373aae8d2621ff9d4483d
}
