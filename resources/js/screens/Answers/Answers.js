import React from "react";
import axios from "axios";
import "./Answers.css";
import Header from "../../components/FrontUI/Header/Header";
import Card from "../../components/FrontUI/Card/Card";
import Title from "../../components/FrontUI/Title/Title";

const Answers = ({ match }) => {
    const [answers, setAnswers] = React.useState([]);
    const [date, setDate] = React.useState("");
    React.useEffect(() => {
        axios.get(`/results/${match.params.answerUrl}`).then(res => {
            setAnswers(res.data.answers);
            setDate(res.data.answers[0]?.created_at);
        });
    }, []);
    return (
        <>
            <Header />
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-8">
                        <div className="answers">
                            <Title isAnswer={true} date={date} />
                            <Card data={answers} isAnswer={true} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Answers;
