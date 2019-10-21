import React from 'react';

const Input = (props) => {
const { id, type, value, onValueChange } = props;
    console.log('input', type)

    return (
        <div className="form__group"><label className="form__label" htmlFor={id}>{id} address</label><input
            className="form__input" id={id} type={type} placeholder="you@example.com" required="required"
            value={value} onChange={e => onValueChange(id, e.target.value)}/>
        </div>
    );
};
export default Input