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
        <FaBookmark style={{ cursor: 'pointer' }} size="14" color="#0069CA" />
      ) : (
        <FaRegBookmark
          style={{ cursor: 'pointer' }}
          size="14"
          color="#0069CA"
        />
      )}
    </>
  );
}

export default BookmarkIcon;
