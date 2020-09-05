import React from "react";
import "./Admin.css";
import Sidebar from "../../../components/BackUI/Sidebar/Sidebar";
import Survey from "../Survey/Survey";
import Answer from "../Answer/Answer";
import axios from "axios";
import Dashboard from "../Dashboard/Dashboard";

const Admin = ({ history }) => {
    const [admin, setAdmin] = React.useState([]);
    const [sidebarBtn, setSidebarBtn] = React.useState(true);
    const [activeLink, setActiveLink] = React.useState("Accueil");
    const [survey, setSurvey] = React.useState([]);
    const [answer, setAnswer] = React.useState([]);
    const [pieCharts, setPieCharts] = React.useState([]);
    const [radarCharts, setRadarCharts] = React.useState([]);

    axios.defaults.headers.common[
        "Authorization"
    ] = `Bearer ${localStorage.getItem("token")}`;

    React.useEffect(() => {
        let user = JSON.parse(localStorage.getItem("user"));
        setAdmin([...admin, user]);
        axios
            .get("api/auth/survey")
            .then(response => {
                setSurvey(response.data);
            })
            .catch(error => {
                console.log(error);
            });
        axios
            .get("api/auth/answer")
            .then(response => {
                setAnswer(response.data.answer);
            })
            .catch(error => {
                console.log(error);
            });
        axios
            .get("api/auth/charts")
            .then(response => {
                setPieCharts(response.data.pie);
                setRadarCharts(response.data.radar);
            })
            .catch(error => {
                console.log(error);
            });
    }, []);
    const onClickLink = link => {
        setActiveLink(link);
    };

    return (
        <div className="admin">
            <Sidebar
                admin={admin}
                onClickLink={onClickLink}
                history={history}
            />
            <input
                type="checkbox"
                id="sidebar-btn"
                className="sidebar-btn"
                checked={sidebarBtn}
                onChange={() => setSidebarBtn(!sidebarBtn)}
            />
            <label htmlFor="sidebar-btn"></label>
            <div className="row content">
                {activeLink === "Accueil" ? (
                    <Dashboard
                        pieCharts={pieCharts}
                        radarCharts={radarCharts}
                    />
                ) : activeLink === "Questionnaire" ? (
                    <Survey survey={survey} />
                ) : (
                    activeLink === "Reponses" && <Answer answer={answer} />
                )}
            </div>
        </div>
    );
};

export default Admin;
