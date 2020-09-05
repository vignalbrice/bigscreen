import React from "react";

const Buttons = ({
    surveyId,
    handleClickToRefCard,
    onSubmitEmail,
    isAnswer
}) => {
    return (
        <div className="survey_buttons">
            {isAnswer ? (
                surveyId === 20 ? (
                    <button
                        type="button"
                        className="btn btn_survey"
                        onClick={() => window.scrollTo({ top: 0 })}
                    >
                        Fin des résultats
                    </button>
                ) : (
                    <a
                        className="btn_survey"
                        type="button"
                        onClick={() => handleClickToRefCard(surveyId)}
                    >
                        Suivant
                    </a>
                )
            ) : surveyId === 20 ? (
                <button type="submit" className="btn btn_survey">
                    Finaliser
                </button>
            ) : surveyId === 1 ? (
                <a
                    className={`btn_survey`}
                    type="button"
                    onClick={onSubmitEmail}
                >
                    Suivant
                </a>
            ) : (
                <a
                    className="btn_survey"
                    type="button"
                    onClick={() => handleClickToRefCard(surveyId)}
                >
                    Suivant
                </a>
            )}
        </div>
    );
};

export default Buttons;
