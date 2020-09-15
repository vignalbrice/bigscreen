import React from "react";
import axios from "axios";
import "./Surveys.css";
import Title from "../../components/FrontUI/Title/Title";
import Card from "../../components/FrontUI/Card/Card";
import Header from "../../components/FrontUI/Header/Header";
import Refresh from "../../components/FrontUI/Refresh/Refresh";

const Surveys = () => {
    const [surveys, setSurveys] = React.useState([]);
    const [disabled, setDisabled] = React.useState(false);

    React.useEffect(() => {
        axios.get("/surveys").then(response => {
            setSurveys(response.data);
        });
    }, []);

    return (
        <div>
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
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};
export default Surveys;
