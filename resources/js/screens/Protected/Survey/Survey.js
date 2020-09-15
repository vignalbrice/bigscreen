import React from "react";
const Survey = ({ survey }) => {
    return (
        <div>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th scope="col">#Numéro de la question</th>
                        <th scope="col">Corps de la question</th>
                        <th scope="col">Type de question(A,B,C)</th>
                    </tr>
                </thead>
                <tbody>
                    {survey.map(s => (
                        <tr key={s.id}>
                            <td>{s.id}</td>
                            <td>{s.label}</td>
                            <td>{s.survey_type}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Survey;
