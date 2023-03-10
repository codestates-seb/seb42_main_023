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
        <FaBookmark size="12" color="#5C5C5C" />
      ) : (
        <FaRegBookmark size="12" color="#5C5C5C" />
      )}
    </>
  );
}

export default BookmarkIcon;
