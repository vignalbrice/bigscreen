import React from "react";
import Input from "../Input/Input/Input";
import Buttons from "../Buttons/Buttons";
import Validations from "../Validations/Validations";
import CardHeader from "../CardHeader/CardHeader";
const Card = ({
    data,
    isAnswer,
    disabled,
    emailValidator,
    errorsMessage,
    setDisabled,
    onSubmitEmail,
    onChangeFormInput,
    submitSurvey
}) => {
    const cardRef = data.reduce((acc, value) => {
        acc[value.id] = React.createRef();
        return acc;
    }, {});

    const nextRefCard = id =>
        window.scrollTo(0, cardRef[id + 1].current.offsetTop);
    const previousRefCard = id =>
        window.scrollTo(0, cardRef[id - 1].current.offsetTop);

    return (
        <form onSubmit={submitSurvey}>
            <div className="timeline">
                {isAnswer
                    ? data.map(d => {
                          return (
                              <div
                                  className={`survey_card`}
                                  key={d.id}
                                  ref={cardRef[d.id]}
                              >
                                  <CardHeader
                                      survey={d.survey}
                                      surveyId={d.survey.id}
                                  />
                                  <div className="survey_answers">
                                      {d.label}
                                  </div>
                                  <Buttons
                                      surveyId={d.id}
                                      nextRefCard={nextRefCard}
                                      isAnswer={isAnswer}
                                  />
                              </div>
                          );
                      })
                    : data.map((survey, i) => {
                          // convertis notre chaîne de caractère d'option en tableau si l'option n'est pas null
                          const options = survey.option?.split(",");
                          return (
                              <div
                                  className={`survey_card`}
                                  key={survey.id}
                                  ref={cardRef[survey.id]}
                              >
                                  <CardHeader
                                      survey={survey}
                                      surveyId={survey.id}
                                  />
                                  <Input
                                      options={options}
                                      onChangeFormInput={onChangeFormInput}
                                      surveyId={survey.id}
                                      disabled={disabled}
                                  />
                                  {emailValidator &&
                                  emailValidator.length > 0 ? (
                                      <Validations
                                          errorsMessage={errorsMessage}
                                          emailValidator={emailValidator}
                                          surveyId={survey.id}
                                          index={i}
                                      />
                                  ) : (
                                      errorsMessage &&
                                      errorsMessage.length > 0 && (
                                          <Validations
                                              errorsMessage={errorsMessage}
                                              emailValidator={emailValidator}
                                              surveyId={survey.id}
                                              index={i}
                                          />
                                      )
                                  )}
                                  {disabled === false && (
                                      <Buttons
                                          surveyId={survey.id}
                                          nextRefCard={nextRefCard}
                                          previousRefCard={previousRefCard}
                                          onSubmitEmail={onSubmitEmail}
                                      />
                                  )}
                              </div>
                          );
                      })}
            </div>
        </form>
    );
};

export default Card;
