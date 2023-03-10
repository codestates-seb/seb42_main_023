import React from 'react';
import { FaRegThumbsUp, FaThumbsUp } from 'react-icons/fa';
import { useState } from 'react';

interface Props {
  checked: boolean;
}

function LikeIcon({ checked }: Props) {
  const [check, setCheck] = useState(checked);
  return (
    <>
      {check ? (
        <FaThumbsUp size="12" color="#5C5C5C" />
      ) : (
        <FaRegThumbsUp size="12" color="#5C5C5C" />
      )}
    </>
  );
}

export default LikeIcon;
