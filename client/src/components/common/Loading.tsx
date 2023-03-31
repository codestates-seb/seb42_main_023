import React from 'react';
import HashLoader from 'react-spinners/HashLoader';

const Loading: React.FC = () => {
  return (
    <>
      <div>
        <div
          style={{
            width: '1100px',
            height: '2000px',
            zIndex: '10',
          }}
        ></div>
      </div>
    </>
  );
};

export default Loading;
