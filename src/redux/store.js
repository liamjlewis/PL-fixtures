import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk'
import { createLogger } from 'redux-logger'
import rootReducer from '../logic/reducers';

const loggerMiddleware = createLogger()

const composeEnhancers =
  (process.env.NODE_ENV !== 'production' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;

const configureStore = (initialState = {}) => {
  return createStore(
    rootReducer,
    initialState,
    composeEnhancers(
      applyMiddleware(
        thunkMiddleware,
        loggerMiddleware
      )),
  );
};

export default configureStore;