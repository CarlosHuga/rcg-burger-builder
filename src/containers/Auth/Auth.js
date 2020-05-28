import React, { useState, useEffect } from 'react';
import Input from '../../components/UI/Input/Input'
import Button from '../../components/UI/Button/Button'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'

import classes from './Auth.css'
import * as actions from '../../store/actions/index'

import Spinner from '../../components/UI/Spinner/Spinner'
import { updateObject, checkValidity } from '../../shared/utility'

const auth = (props) => {
    
    const [, setFormIsValid] = useState(false)
    const [isSignUp, setIsSignUp] = useState(false)
    const [controls, setControls] = useState({
        email: {
            elementType: 'input',
            elementConfig: {
                type: 'email',
                placeholder: 'Mail Address'
            },
            value: '',
            validation: {
                required: true,
                isEmail: true
            },
            valid: false,
            touched: false

        },
        password: {
            elementType: 'input',
            elementConfig: {
                type: 'password',
                placeholder: 'Password'
            },
            value: '',
            validation: {
                required: true,
                minLength: 6
            },
            valid: false,
            touched: false

        }
    })
      
    const {buildingBurger, authRedirectPath, onSetAuthRedirectPath} = props 

    useEffect(() => {
        if (!buildingBurger && authRedirectPath !== '/'){
            onSetAuthRedirectPath()
        }
    },[buildingBurger,authRedirectPath, onSetAuthRedirectPath])

    const inputChangedHandler = (event, controlName) => {
        //console.log(event.target.value)
        const updatedControlElement = updateObject(controls[controlName], {
            value: event.target.value,
            valid: checkValidity(event.target.value, controls[controlName].validation),
            touched: true
        })
        const updatedControlForm = updateObject(controls,{[controlName] : updatedControlElement} )
    
        let checkFormIsValid = true
        for (let inp in updatedControlForm){
            checkFormIsValid = (updatedControlForm[inp].valid) && checkFormIsValid
        }

        setControls(updatedControlForm)
        setFormIsValid(checkFormIsValid)
    }

    const submitHandler = (event) => {
        event.preventDefault()
        props.onAuth(
            controls.email.value, 
            controls.password.value,
            isSignUp)
    }

    const switchAuthModeHanlder = () => {
        setIsSignUp(prevState => !prevState)
    }
        
    
    let authRedirect = null
    if (props.isAuthenticated) {
        authRedirect = <Redirect to={props.authRedirectPath}/>
    }
    const formElementsArray = []
    for (let key in controls){
        formElementsArray.push({
            id: key,
            config: controls[key]
        })
    }
    let form = formElementsArray.map(formE => {
        return <Input 
            invalid={!formE.config.valid}
            shouldValidate={formE.config.validation}
            touched={formE.config.touched}
            key={formE.id}
            elementType={formE.config.elementType}
            elementConfig={formE.config.elementConfig}
            value={formE.config.value}
            changed={(event) => inputChangedHandler(event, formE.id)}
        />
    })
    if (props.loading) {
        form = <Spinner/>
    }

    let errorMessage = null
    if (props.error) {
        errorMessage = <p>{props.error.message}</p>
    }
    return (
        <div className={classes.Auth}>
            {authRedirect}
            {errorMessage}
            <form onSubmit={submitHandler}>
                {form}
                <Button btnType="Success">SUBMIT</Button>
            </form>
            <Button 
                clicked={switchAuthModeHanlder} 
                btnType="Danger"
            >
                SWITCH TO {isSignUp ? 'SIGN-IN' : 'SIGN-UP'}
            </Button>
        </div>
    )
    
}

const mapStateToProps = (state) => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        isAuthenticated: state.auth.token !== null ,
        buildingBurger: state.burgerBuilder.building,
        authRedirectPath: state.auth.authRedirectPath
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onAuth: (email,password,isSignUp) => dispatch(actions.auth(email,password,isSignUp)),
        onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath('/'))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(auth);