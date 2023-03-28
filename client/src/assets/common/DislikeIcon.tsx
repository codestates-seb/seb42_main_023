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
        <FaThumbsDown style={{ cursor: 'pointer' }} size="16" color="#CA0000" />
      ) : (
        <FaRegThumbsDown
          style={{ cursor: 'pointer' }}
          size="16"
          color="#CA0000"
        />
      )}
    </>
  );
}

export default DislikeIcon;
