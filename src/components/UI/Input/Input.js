import React from 'react';

import classes from './Input.css'

const input = (props) => {

    let inputElement = null
    let vallidationMessage = null
    const inputClasses = [classes.InputElement]

    if (props.invalid && props.shouldValidate && props.touched){
        inputClasses.push(classes.Invalid)
        vallidationMessage = <p className={classes.ValidationError}>Please enter a valid value</p>
    }

    switch (props.elementType) {
        case ('input'):
            inputElement = <input 
                className={inputClasses.join(' ')} 
                onChange={props.changed}
                value={props.value}
                {...props.elementConfig}
            />
            break;
        case ('textArea'):
                inputElement = <textarea 
                    className={inputClasses.join(' ')}  
                    onChange={props.changed}
                    value={props.value}
                    {...props.elementConfig}
                />
                break;
        case ('select'):
            inputElement = (
                <select 
                    className={inputClasses.join(' ')}  
                    onChange={props.changed}
                    value={props.value}
                >
                {props.elementConfig.options.map(op => {
                    return <option key={op.value} value={op.value}>{op.displayValue}</option>
                })}
                </select>
            )
            break;
    
        default:
            inputElement = <input 
                className={inputClasses.join(' ')} 
                onChange={props.changed}
                value={props.value}
                {...props.elementConfig}
            />
            break;
    }
    
    return (
        <div className={classes.Input}>
            <label className={classes.Label}>{props.label}</label>
            {vallidationMessage}
            {inputElement}
        </div>
    );
};

export default input;