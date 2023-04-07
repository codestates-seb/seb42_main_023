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
        <FaThumbsUp style={{ cursor: 'pointer' }} size="16" color="#0069CA" />
      ) : (
        <FaRegThumbsUp
          style={{ cursor: 'pointer' }}
          size="16"
          color="#0069CA"
        />
      )}
    </>
  );
}

export default LikeIcon;
