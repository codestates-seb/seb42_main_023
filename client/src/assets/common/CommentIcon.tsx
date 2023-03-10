import React from 'react';
import { FaRegCommentDots, FaCommentDots } from 'react-icons/fa';
import { useState } from 'react';

interface Props {
  checked: boolean;
}

function CommentIcon({ checked }: Props) {
  const [check, setCheck] = useState(checked);
  return (
    <>
      {check ? (
        <FaCommentDots size="12" color="#5C5C5C" />
      ) : (
        <FaRegCommentDots size="12" color="#5C5C5C" />
      )}
    </>
  );
}

export default CommentIcon;
