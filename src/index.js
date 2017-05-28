import React from 'react';
import {createStore} from './redux';

let reducer = (state=0,action)=>{
    if(action){
        switch(action.type){
            case 'add':
                return state +1;
            case 'sub':
                return state -1;
            default:
                return state;
        }
    }else{
        return state;
    }
}
let store = createStore(reducer);
store.subscribe(()=>{
    alert(store.getState());
})
store.dispatch({type:'add'});