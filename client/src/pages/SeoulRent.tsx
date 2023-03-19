import React from 'react';
import { MainContainer, SurveyBox } from './RecommendLoan';
import NavRealEstate from '../components/common/NavRealEstate';

function SeoulRent() {
  return (
    <MainContainer>
      <NavRealEstate />
      <div className="content-container">
        <SurveyBox>
          {/* {currentQuestion! ? (
          <Intro nextQuestionHandler={nextQuestionHandler} />
        ) : (
          <Question />
        )} */}

          {/* <Result /> */}
        </SurveyBox>
      </div>
    </MainContainer>
  );
}

export default SeoulRent;
