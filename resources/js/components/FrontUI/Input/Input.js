import React from "react";
import TextInput from "./TextInput/TextInput";
import Select from "./Select/Select";
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
            ) : (
                <TextInput
                    disabled={disabled}
                    onChangeFormInput={onChangeFormInput}
                    surveyId={surveyId}
                />
            )}
        </div>
    );
};

export default Input;
