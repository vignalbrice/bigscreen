import React from "react";

const TextInput = ({ surveyId, onChangeFormInput, disabled }) => {
    return (
        <>
            {surveyId === 20 ? (
                <textarea
                    onChange={e => onChangeFormInput(e, surveyId)}
                    cols={10}
                    rows={2}
                    placeholder="Remplissez ce champ"
                    maxLength={255}
                    disabled={disabled && disabled}
                    required
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
                        required
                    />
                </>
            )}
        </>
    );
};

export default TextInput;
