import React from 'react';
import {createStore, applyMiddleware} from './redux';

let reducer = (state = 0, action) => {
    if (action) {
        switch (action.type) {
            case 'add':
                return state + 1;
            case 'sub':
                return state - 1;
            default:
                return state;
        }
    } else {
        return state;
    }
}
let logger = store => dispatch => action => {
    console.log('before', store.getState());
    dispatch(action);
    console.log('after', store.getState());
}
let store = applyMiddleware(logger)(createStore)(reducer);
store.subscribe(() => {
    console.log(store.getState());
})
store.dispatch({type: 'add'});