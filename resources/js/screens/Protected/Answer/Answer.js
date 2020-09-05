import React from "react";

const Answer = ({ answer }) => {
    return answer.map(a => (
        <div className="row">
            {a.map(item => item.email)}
            <table className="table bg-dark table-bordered">
                <thead>
                    <tr>
                        <th scope="col">#Numéro de la question</th>
                        <th scope="col">Corps de la question</th>
                        <th scope="col">Réponses</th>
                    </tr>
                </thead>
                <tbody>
                    {a.map(item => (
                        <tr key={item.id}>
                            <td>{item.id}</td>
                            <td>{item.survey.label}</td>
                            <td>{item.label}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    ));
};

export default Answer;
