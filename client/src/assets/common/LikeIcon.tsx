import React from 'react';
import { FaRegThumbsUp, FaThumbsUp } from 'react-icons/fa';
import { useState } from 'react';

interface Props {
  checked: boolean;
}

function LikeIcon({ checked }: Props) {
  return (
    <>
      {checked ? (
        <FaThumbsUp size="12" color="#5C5C5C" />
      ) : (
        <FaRegThumbsUp size="12" color="#5C5C5C" />
      )}
    </>
  );
}

export default LikeIcon;
