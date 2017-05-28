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

let applyMiddleware = middleware => createStore => reducer => {
        let store = createStore(reducer);
        middleware = middleware(store);
        let dispatch = middleware(store.dispatch);
        return {...store, dispatch}
}

export {createStore, applyMiddleware}