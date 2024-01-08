import React from 'react';
import BaseInput from './BaseInput';
import { NumberInputProps } from '../../types';


const NumberInput: React.FC<NumberInputProps> = ({ value, onChange,label ,name,min = 0.01,max = 400,step = 0.01,...rest}) => {
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = parseFloat(event.target.value);
        if (!isNaN(newValue)) {
            onChange({value:newValue,name,label});
        }
    };

    return (
        <BaseInput
            type="number"
            value={value}
            label={label}
            onChange={handleChange}
            min={min}
            max={max}
            step={step}
            {...rest} 
        />
    );
};

export default NumberInput;
