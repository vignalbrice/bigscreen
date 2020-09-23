import React from "react";

const Answer = ({ answer }) => {
    return answer.length > 0 ? (
        answer.map((a, i) => (
            <div className="row" key={i}>
                <div className="col-12 ml-1">
                    <p className="h1 text-white">{a.username}</p>
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
        ))
    ) : (
        <>
            <p className="h1 text-white text-center">
                Oops..Aucunes réponses pour le moment.
            </p>
        </>
    );
};

export default Answer;
