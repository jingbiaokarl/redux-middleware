const createStore = (reducer) => {
    let state;
    let listeners = [];

    const getState = () => state;

    const dispatch = (action) => {
        state = reducer(state, action);
        listeners.forEach(listener => listener());
    };

    const subscribe = (listener) => {
        listeners.push(listener);
        return () => {
            listeners = listeners.filter(l => l !== listener);
        }
    };

    dispatch({});

    return {getState, dispatch, subscribe};
};

let applyMiddleware = (...middlewares) => createStore => reducer => {
        let store = createStore(reducer);
        middlewares = middlewares.map(middleware=>middleware(store));
        let dispatch = compose(...middlewares)(store.dispatch);
        return {...store, dispatch}
}

function compose(...funcs) {
    return args => funcs.reduceRight((composed, f) => f(composed), args);
}

export {createStore, applyMiddleware}