import React from 'react';
import { FaRegBookmark, FaBookmark } from 'react-icons/fa';
import { useState } from 'react';

interface Props {
  checked: boolean;
}

function BookmarkIcon({ checked }: Props) {
  return (
    <>
      {checked ? (
        <FaBookmark size="12" color="#94969b" />
      ) : (
        <FaRegBookmark size="12" color="#94969b" />
      )}
    </>
  );
}

export default BookmarkIcon;
