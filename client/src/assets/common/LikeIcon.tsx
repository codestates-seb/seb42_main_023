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
        <FaThumbsUp size="12" color="#94969b" />
      ) : (
        <FaRegThumbsUp size="12" color="#94969b" />
      )}
    </>
  );
}

export default LikeIcon;
