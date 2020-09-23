import React from "react";
import axios from "axios";
import "./Surveys.css";
import Title from "../../components/FrontUI/Title/Title";
import Card from "../../components/FrontUI/Card/Card";
import Header from "../../components/FrontUI/Header/Header";
import Refresh from "../../components/FrontUI/Refresh/Refresh";
import Swal from "sweetalert2";

const Surveys = () => {
    const [surveys, setSurveys] = React.useState([]);
    const [disabled, setDisabled] = React.useState(false);
    const [dataForm, setDataForm] = React.useState([]);
    const [emailValidator, setEmailValidator] = React.useState("");
    const [userId, setUserId] = React.useState(0);
    const [errorsMessage, setErrorsMessage] = React.useState({});

    React.useEffect(() => {
        axios.get("/surveys").then(response => {
            setSurveys(response.data);
        });
    }, []);
    /** Check if email is equal to an email into database */
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
                        setTimeout(() => {
                            window.scrollTo(
                                0,
                                document.querySelector(".survey_card")
                                    .scrollHeight + 420
                            );
                        }, 900);
                    }
                }
            });
        } else {
            setEmailValidator("Veuillez remplir ce champ !");
        }
    };
    /** Add form data into an array from the loop  */
    const onChangeFormInput = (e, id) => {
        let target = e.target;
        let value = target.value;

        let form = [...dataForm];
        form[id] = { id: id, answer: value };

        setDataForm(form);
    };
    /** Submit survey with answers to the back API */
    const submitSurvey = e => {
        e.preventDefault();
        dataForm.shift();
        console.log(dataForm);
        axios
            .post("/answers", { answers: dataForm, userId: userId })
            .then(response => {
                Swal.fire({
                    title: "Good Job !",
                    html: `<p>${response.data.text}</p>`,
                    footer: `<a href="${location.protocol}://${location.host}/reponses/${response.data.url}">Voir mes réponses</a>`,
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
                    Object.keys(messages).forEach(index =>
                        setErrorsMessage("Veuillez remplir ce champ.")
                    );
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
        <div className="survey">
            <Header />
            <div className="container">
                <div className="row justify-content-center">
                    <Refresh disabled={disabled} />
                    <div className="col-md-8">
                        <Title />
                        <Card
                            data={surveys}
                            disabled={disabled}
                            setDisabled={setDisabled}
                            onSubmitEmail={onSubmitEmail}
                            onChangeFormInput={onChangeFormInput}
                            submitSurvey={submitSurvey}
                            emailValidator={emailValidator}
                            errorsMessage={errorsMessage}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};
export default Surveys;
