import React from "react";
import axios from "axios";
import Input from "../Input/Input/Input";
import Buttons from "../Buttons/Buttons";
import Validations from "../Validations/Validations";
import CardHeader from "../CardHeader/CardHeader";
import Swal from "sweetalert2";
const Card = ({ data, isAnswer, disabled, setDisabled }) => {
    const [dataForm, setDataForm] = React.useState([]);

    const [emailValidator, setEmailValidator] = React.useState("");

    const [userId, setUserId] = React.useState(0);

    const [errorsMessage, setErrorsMessage] = React.useState("");

    const cardRef = data.reduce((acc, value) => {
        acc[value.id] = React.createRef();
        return acc;
    }, {});

    const onSubmitEmail = e => {
        e.preventDefault();
        let email = { email: dataForm[1]?.answer };
        if (email.email?.length > 0) {
            axios.post("/email", email).then(response => {
                if (response.data.error) {
                    Swal.fire({
                        title: "Oops.. une erreur est survenue!",
                        text: response.data.error,
                        icon: "error",
                        showConfirmButton: true,
                        showCancelButton: false,
                        showCloseButton: false
                    });
                    setDisabled(response.data.disabled);
                } else {
                    setEmailValidator(response.data.message);
                    setUserId(response.data.id);
                    if (response.data.isValid === true) {
                        window.scrollTo(
                            0,
                            document.querySelector(".survey_card")
                                .scrollHeight + 420
                        );
                    }
                }
            });
        } else {
            setEmailValidator("Veuillez remplir ce champ !");
        }
    };
    const nextRefCard = id =>
        window.scrollTo(0, cardRef[id + 1].current.offsetTop);
    const previousRefCard = id =>
        window.scrollTo(0, cardRef[id - 1].current.offsetTop);

    const onChangeFormInput = (e, id) => {
        let target = e.target;
        let value = target.value;

        let form = [...dataForm];
        form[id] = { id: id, answer: value };

        setDataForm(form);
    };

    const submitSurvey = e => {
        e.preventDefault();
        dataForm.shift();
        axios
            .post("/answers", { answers: dataForm, userId: userId })
            .then(response => {
                Swal.fire({
                    title: "Good Job !",
                    html: `<p>${response.data.text}</p>`,
                    footer: `<a href="http://${window.location.host}/reponses/${response.data.url}">Voir mes réponses</a>`,
                    icon: "success",
                    showConfirmButton: false,
                    showCancelButton: false,
                    showCloseButton: false
                });
            })
            .catch(error => {
                let status = error.response.status;
                let messages = error.response.data.errors;
                if (typeof messages === "object") {
                    Object.keys(messages).forEach(index => {
                        setErrorsMessage(messages[index][0]);
                    });
                    Swal.fire({
                        title: "Oops..une erreur est survenue",
                        html: `<p>${messages.answers}</p>`,
                        icon: "error"
                    });
                } else {
                    alert("Une erreur est survenue (" + status + ")");
                }
            });
    };
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
                    : data.map(survey => {
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
                                      />
                                  ) : (
                                      errorsMessage &&
                                      errorsMessage.length >
                                          0(
                                              <Validations
                                                  errorsMessage={errorsMessage}
                                                  emailValidator={
                                                      emailValidator
                                                  }
                                                  surveyId={survey.id}
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
