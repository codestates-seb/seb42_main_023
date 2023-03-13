import React from 'react';
import { FaRegCommentDots, FaCommentDots } from 'react-icons/fa';
import { useState } from 'react';

interface Props {
  checked: boolean;
}

function CommentIcon({ checked }: Props) {
  return (
    <>
      {checked ? (
        <FaCommentDots size="12" color="#94969b" />
      ) : (
        <FaRegCommentDots size="12" color="#94969b" />
      )}
    </>
  );
}

export default CommentIcon;
