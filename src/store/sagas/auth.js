import { delay } from 'redux-saga'
import { put,call } from 'redux-saga/effects'
import * as actions from '../actions/index'
import axios from 'axios'

export function* logoutSaga(action) {
    yield call([localStorage, 'removeItem'], 'token')
    yield call([localStorage, 'removeItem'], 'userId')
    yield call([localStorage, 'removeItem'], 'expirationDate')
    yield put(actions.logoutSucceed())
}

export function* authTimeoutSaga(action) {
    yield(delay(action.expTime*1000))
    yield put(actions.logout())
}

export function* authSaga(action) {
    
    yield put(actions.authStart())
    const authData = {
        email: action.email,
        password: action.password,
        returnSecureToken: true
    }
    let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAtDEivn1gCg_pUdGJI1yMRh8QfT27IwJY'
    if (!action.isSignUp) {
        url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAtDEivn1gCg_pUdGJI1yMRh8QfT27IwJY'
    }

    try {
        const response = yield axios.post(url, authData)
        const expDate = new Date(new Date().getTime() + response.data.expiresIn * 1000)
        yield localStorage.setItem('token', response.data.idToken)
        yield localStorage.setItem('userId', response.data.localId)
        yield localStorage.setItem('expirationDate', expDate)
        yield put(actions.authSuccess(response.data.idToken, response.data.localId))
        yield put(actions.checkAuthTimeout(response.data.expiresIn))
        
    } catch (error) {
        yield put(actions.authFailed(error.response.data.error))
    }

}

export function* authCheckStateSaga(action) {

    const token = yield localStorage.getItem('token')
    if (!token) {
        yield put(actions.logout())
    } else {
        const expDate = yield new Date(localStorage.getItem('expirationDate'))
        if (expDate < new Date()) {
            yield put(actions.logout())
        } else {
            const userId = yield localStorage.getItem('userId')
            yield put(actions.authSuccess(token, userId))
            yield put(actions.checkAuthTimeout((expDate - new Date())/1000))
        }
            
    }
    
}