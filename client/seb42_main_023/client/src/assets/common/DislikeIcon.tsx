import React from 'react';
import { FaRegThumbsDown, FaThumbsDown } from 'react-icons/fa';
import { useState } from 'react';

interface Props {
  checked: boolean;
}

function DislikeIcon({ checked }: Props) {
  return (
    <>
      {checked ? (
        <FaThumbsDown style={{ cursor: 'pointer' }} size="12" color="#94969b" />
      ) : (
        <FaRegThumbsDown
          style={{ cursor: 'pointer' }}
          size="12"
          color="#94969b"
        />
      )}
    </>
  );
}

export default DislikeIcon;
