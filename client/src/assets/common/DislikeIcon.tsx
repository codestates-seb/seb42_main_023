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
        <FaThumbsDown size="12" color="#5C5C5C" />
      ) : (
        <FaRegThumbsDown size="12" color="#5C5C5C" />
      )}
    </>
  );
}

export default DislikeIcon;
