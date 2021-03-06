import React from "react";
import axios from "axios";
import "./Answers.css";
import Header from "../../components/FrontUI/Header/Header";
import Card from "../../components/FrontUI/Card/Card";
import Title from "../../components/FrontUI/Title/Title";

const Answers = ({ match }) => {
    /** Get all answers */
    const [answers, setAnswers] = React.useState([]);
    /** Get created date of answers */
    const [date, setDate] = React.useState("");
    React.useEffect(() => {
        axios.get(`/results/${match.params.reponsesUrl}`).then(res => {
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
                        <div>
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
