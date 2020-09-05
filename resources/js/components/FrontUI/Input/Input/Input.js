import React from "react";
import Select from "../Select/Select";

const Input = ({ surveyId, onChangeFormInput, options }) => {
    return (
        <div className="survey_answers">
            {options !== undefined ? (
                <Select
                    options={options}
                    onChangeFormInput={onChangeFormInput}
                    surveyId={surveyId}
                />
            ) : surveyId === 20 ? (
                <textarea
                    onChange={e => onChangeFormInput(e, surveyId)}
                    cols={10}
                    rows={2}
                    placeholder="Remplissez ce champ"
                    maxLength={255}
                />
            ) : (
                <>
                    <input
                        type={
                            surveyId === 1
                                ? "email"
                                : surveyId === 2
                                ? "number"
                                : "text"
                        }
                        onChange={e => onChangeFormInput(e, surveyId)}
                        placeholder={
                            surveyId === 1
                                ? "Renseignez votre email"
                                : surveyId === 2
                                ? "Renseignez votre age"
                                : "Remplissez ce champ"
                        }
                        maxLength={255}
                    />
                </>
            )}
        </div>
    );
};

export default Input;
