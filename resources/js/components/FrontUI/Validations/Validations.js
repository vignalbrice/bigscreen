import React from "react";

const Validations = ({ surveyId, emailValidator, errorsMessage, index }) => {
    return (
        <div className="survey_validations">
            {errorsMessage.length > 0 && (
                <div className="errors">{errorsMessage}</div>
            )}
            {surveyId === 1 && emailValidator.length > 0 && (
                <div className="emailValidator errors">
                    <p>{emailValidator}</p>
                </div>
            )}
        </div>
    );
};

export default Validations;
