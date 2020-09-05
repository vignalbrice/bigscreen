import React from "react";
import Select from "../Select/Select";

const Input = ({ surveyId, onChangeFormInput, options, disabled }) => {
    return (
        <div className="survey_answers">
            {options !== undefined ? (
                <Select
                    options={options}
                    onChangeFormInput={onChangeFormInput}
                    surveyId={surveyId}
                    disabled={disabled}
                />
            ) : surveyId === 20 ? (
                <textarea
                    onChange={e => onChangeFormInput(e, surveyId)}
                    cols={10}
                    rows={2}
                    placeholder="Remplissez ce champ"
                    maxLength={255}
                    disabled={disabled && disabled}
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
                        disabled={disabled && disabled}
                    />
                </>
            )}
        </div>
    );
};

export default Input;
