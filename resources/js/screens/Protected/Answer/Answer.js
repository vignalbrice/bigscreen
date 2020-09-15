import React from "react";

const Answer = ({ answer }) => {
    return answer.map(a => (
        <div className="row">
            <div className="row">
                <p className="display-4 text-white">{a.username}</p>
            </div>
            <div className="col-10">
                <table className="table table-striped ">
                    <thead>
                        <tr>
                            <th scope="col">#Numéro de la question</th>
                            <th scope="col">Corps de la question</th>
                            <th scope="col">Réponses</th>
                        </tr>
                    </thead>
                    <tbody>
                        {a.answer.map(item => (
                            <tr key={item.id}>
                                <td>{item.survey_id}</td>
                                <td>{item.survey.label}</td>
                                <td>{item.label}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    ));
};

export default Answer;
