import React from "react";
import axios from "axios";
import "./Surveys.css";
import Swal from "sweetalert2";
import Title from "../../components/FrontUI/Title/Title";
import Card from "../../components/FrontUI/Card/Card";
import Header from "../../components/FrontUI/Header/Header";

const Surveys = () => {
    const [surveys, setSurveys] = React.useState([]);

    React.useEffect(() => {
        axios.get("/surveys").then(response => {
            setSurveys(response.data);
        });
    }, []);

    return (
        <>
            <Header />
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-8">
                        <Title />
                        <Card data={surveys} />
                    </div>
                </div>
            </div>
        </>
    );
};
export default Surveys;
