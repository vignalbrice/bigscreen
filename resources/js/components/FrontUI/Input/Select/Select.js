import React from "react";

const Select = ({ options, onChangeFormInput, surveyId, disabled }) => {
    return (
        <select
            size={5}
            onChange={e => onChangeFormInput(e, surveyId)}
            disabled={disabled && disabled}
            required
        >
            {options?.map((option, index) => (
                <option value={option} key={index}>
                    {option}
                </option>
            ))}
        </select>
    );
};

export default Select;
