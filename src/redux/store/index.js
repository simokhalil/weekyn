import createSagaMiddleware from "redux-saga";
import { applyMiddleware, compose, createStore } from "redux";
import { createBrowserHistory } from 'history';
import { reducers } from "../reducers/index";
import { routerMiddleware, syncHistoryWithStore } from "react-router-redux";
import { sagas } from "../sagas/index";

// add the middlewares
let middlewares = [];

// add the router middleware
middlewares.push(routerMiddleware(createBrowserHistory()));

// add the saga middleware
const sagaMiddleware = createSagaMiddleware();
middlewares.push(sagaMiddleware);

// apply the middleware
let middleware = applyMiddleware(...middlewares);

// add the redux dev tools
if (process.env.NODE_ENV !== 'production' && window.devToolsExtension) {
  middleware = compose(middleware, window.devToolsExtension());
}

// create the store
const store = createStore(reducers, middleware);
const history = syncHistoryWithStore(createBrowserHistory(), store);
sagaMiddleware.run(sagas);

// export
export { store, history };
