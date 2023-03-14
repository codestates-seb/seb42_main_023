import React from 'react';
import { FaRegThumbsUp, FaThumbsUp } from 'react-icons/fa';
import { useState } from 'react';

interface Props {
  checked: boolean;
}

interface Style {
  style: object;
}

function LikeIcon({ checked }: Props) {
  return (
    <>
      {checked ? (
        <FaThumbsUp style={{ cursor: 'pointer' }} size="12" color="#94969b" />
      ) : (
        <FaRegThumbsUp
          style={{ cursor: 'pointer' }}
          size="12"
          color="#94969b"
        />
      )}
    </>
  );
}

export default LikeIcon;
