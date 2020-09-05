import React from "react";
import axios from "axios";

const Sidebar = ({ admin, onClickLink, history }) => {
    const onLogout = () => {
        axios
            .post("api/auth/logout")
            .then(response => {
                localStorage.clear();
                let redirect = "/administration";
                history.replace(redirect);
                localStorage.setItem("message", response.data.message);
            })
            .catch(error => console.error(error));
    };

    return (
        <div>
            <ul className="sidebar">
                <div className="sidebar_container">
                    <img src="../images/bigscreen_logo.png" />
                    <li onClick={() => onClickLink("Accueil")}>Accueil</li>
                    <li onClick={() => onClickLink("Questionnaire")}>
                        Questionnaire
                    </li>
                    <li onClick={() => onClickLink("Reponses")}>Réponses</li>
                </div>
                <div className="sidebar_footer">
                    <li>Connecté en tant que :</li>
                    {admin.map((a, i) => (
                        <li key={i}>{a.email}</li>
                    ))}
                    <li onClick={() => onLogout()}>Logout</li>
                </div>
            </ul>
        </div>
    );
};

export default Sidebar;
