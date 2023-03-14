import React from 'react';
import BlueBtn from '../common/BlueBtn';

const Q1: React.FC = () => {
  return (
    <>
      <div>고객님은 만 19세 이상 34세 이하의 청년이십니까?</div>
      <BlueBtn
        width="300px"
        height="50px"
        content="네"
        onClick={() => console.log('yes')}
      />
      <BlueBtn
        width="300px"
        height="50px"
        content="아니요"
        onClick={() => console.log('no')}
      />
    </>
  );
};

export default Q1;
