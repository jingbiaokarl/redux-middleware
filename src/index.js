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
let logger1 = store => next => action => {
    console.log('before1', store.getState());
    next(action);
    console.log('after1', store.getState());
}
let logger2 = store => next => action => {
    console.log('before2', store.getState());
    next(action);
    console.log('after2', store.getState());
}
/*let thunk = store => dispatch => action =>{
   if(typeof action == 'function')
       return action(dispatch);
   dispatch(action);
}*/
/*let isPromise = (obj)=> obj.then;
let promise =  store => dispatch => action =>{
    return isPromise(action)?action.then(dispatch):dispatch(action);
}*/
let store = applyMiddleware(logger2,logger1)(createStore)(reducer);
store.subscribe(() => {
    console.log(store.getState());
})
/*
store.dispatch((dispatch)=>{
    setTimeout(function(){
        dispatch({type: 'add'});
    },2000)
});*/
/*
store.dispatch(new Promise(function(resolve,reject){
    setTimeout(function(){
        resolve({type:'add'});
    },2000)
}));*/
store.dispatch({type:'add'});
