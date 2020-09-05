import React from "react";

const Select = ({ options, onChangeFormInput, surveyId }) => {
    return (
        <select size={5} onChange={e => onChangeFormInput(e, surveyId)}>
            {options?.map((option, index) => (
                <option value={option} key={index}>
                    {option}
                </option>
            ))}
        </select>
    );
};

export default Select;
