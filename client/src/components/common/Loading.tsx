import React from 'react';
import HashLoader from 'react-spinners/HashLoader';

const Loading: React.FC = () => {
  return (
    <>
      <div className="contentWrap">
        <div
          style={{
            position: 'fixed',
            height: '500vh',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            zIndex: '10',
          }}
        >
          <HashLoader color="#0069CA" />
        </div>
      </div>
    </>
  );
};

export default Loading;
