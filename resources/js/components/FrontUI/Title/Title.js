import React from "react";
import moment from "moment";

const Title = ({ isAnswer, date }) => {
    return (
        <div className="survey_title">
            <p>
                {isAnswer
                    ? ` Vous trouverez ci-dessous les réponses que vous avez apportées à notre sondage le ${moment(
                          date
                      ).format("DD.MM.YY")} à ${moment(date).format("HH:mm")}`
                    : "Merci de répondre à toutes les questions et de valider le formulaire en bas de page."}
            </p>
        </div>
    );
};

export default Title;
