import React from "react";
import axios from "axios";
import Input from "../Input/Input/Input";
import Buttons from "../Buttons/Buttons";
import Validations from "../Validations/Validations";
import CardHeader from "../CardHeader/CardHeader";
import Swal from "sweetalert2";
const Card = ({ data, isAnswer }) => {
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
            axios
                .post("/email", email)
                .then(response => {
                    /*if (response.data.error) {
                        Swal.fire({
                            title: "Oops.. une erreur est survenue!",
                            text: response.data.error,
                            icon: "error",
                            showConfirmButton: true,
                            showCancelButton: false,
                            showCloseButton: false
                        });
                    } else {*/
                    setEmailValidator(response.data.message);
                    setUserId(response.data.id);
                    if (response.data.isValid === true) {
                        handleClickToRefCard(1);
                    }
                    // }
                })
                .catch(error =>
                    setEmailValidator(error.response?.data?.errors?.email[0])
                );
        } else {
            setEmailValidator("Veuillez remplir ce champ !");
        }
    };
    const handleClickToRefCard = id =>
        window.scrollTo(0, cardRef[id + 1].current.offsetTop);

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
                console.log(response.data);
                Swal.fire({
                    title: "Good Job !",
                    text: response.data.text,
                    footer: `<a href="http://${window.location.host}/reponses/${response.data.url}">Voir mes réponses</a>`,
                    icon: "success",
                    showConfirmButton: false,
                    showCancelButton: false,
                    showCloseButton: false
                });
            })
            .catch(error => {
                setErrorsMessage(error.response.data.errors);
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
                                      handleClickToRefCard={
                                          handleClickToRefCard
                                      }
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
                                  />
                                  {emailValidator &&
                                      emailValidator.length > 0 && (
                                          <Validations
                                              emailValidator={emailValidator}
                                              errorsMessage={errorsMessage}
                                              surveyId={survey.id}
                                          />
                                      )}
                                  <Buttons
                                      surveyId={survey.id}
                                      handleClickToRefCard={
                                          handleClickToRefCard
                                      }
                                      onSubmitEmail={onSubmitEmail}
                                  />
                              </div>
                          );
                      })}
            </div>
        </form>
    );
};

export default Card;
