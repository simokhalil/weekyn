import createSagaMiddleware from "redux-saga";
import { applyMiddleware, compose, createStore } from "redux";
import { createBrowserHistory } from 'history';
import { routerMiddleware, syncHistoryWithStore } from "react-router-redux";

import { reducers } from "../reducers";
import sagas from "../sagas";

// add the saga middleware
const sagaMiddleware = createSagaMiddleware();

// add the middlewares
let middlewares = [
  sagaMiddleware,
  routerMiddleware(createBrowserHistory()),
];

if (process.env.NODE_ENV === 'development') {
  const { logger } = require('redux-logger');
  middlewares.push(logger);
}

// add the redux dev tools
/* if (process.env.NODE_ENV !== 'production' && window.devToolsExtension) {
  middleware = compose(middleware, window.devToolsExtension());
} */

// create the store
const store = createStore(
  reducers,
  compose(applyMiddleware(...middlewares))
);

const history = syncHistoryWithStore(createBrowserHistory(), store);
sagaMiddleware.run(sagas);

// export
export { store, history };
