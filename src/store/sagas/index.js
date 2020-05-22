import { takeEvery, all, takeLatest } from 'redux-saga/effects'

import * as actionTypes from  '../actions/actionTypes'
import * as authSagas from './auth'
import { fetchIngredientsSaga } from './burgerBuilder'
import * as ordersSaga from './orders'

export function* watchAuth() {
    yield all ([
        takeEvery(actionTypes.AUTH_INITIATE_LOGOUT, authSagas.logoutSaga),
        takeEvery(actionTypes.AUTH_CHECK_TIMEOUT, authSagas.authTimeoutSaga),
        takeEvery(actionTypes.AUTH_USER, authSagas.authSaga),
        takeEvery(actionTypes.AUTH_CHECK_LOCAL_STORAGE, authSagas.authCheckStateSaga)
    ])
    
}

export function* watchBurgerBuilder() {
    yield takeEvery(actionTypes.FETCH_INGREDIENTS, fetchIngredientsSaga)
}

export function* watchOrders() {
    yield takeLatest(actionTypes.PURCHASE_BURGER, ordersSaga.purchaseBurgerSaga)
    yield takeEvery(actionTypes.FETCH_ORDERS, ordersSaga.fetchOrdersSaga)
}
