import React from "react";

const Validations = ({ surveyId, emailValidator, errorsMessage }) => {
    return (
        <div className="survey_validations">
            {surveyId === 1 && emailValidator.length > 0 && (
                <div className="emailValidator errors">
                    <p>{emailValidator}</p>
                </div>
            )}
            {errorsMessage.length > 0 && (
                <div className="errors">{errorsMessage}</div>
            )}
        </div>
    );
};

export default Validations;
