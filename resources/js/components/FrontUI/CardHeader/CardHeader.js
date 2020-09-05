import React from "react";

const CardHeader = ({ surveyId, survey }) => {
    return (
        <>
            <p className="survey_questions">{` Question ${surveyId}/20`}</p>
            <p className="survey_label">{survey.label}</p>
        </>
    );
};

export default CardHeader;
