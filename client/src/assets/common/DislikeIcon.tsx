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
        <FaThumbsDown size="12" color="#94969b" />
      ) : (
        <FaRegThumbsDown size="12" color="#94969b" />
      )}
    </>
  );
}

export default DislikeIcon;
