import {applyMiddleware, combineReducers, createStore} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import userReducer from './reducers/userReducer.js';
import notificationReducer from './reducers/notificationReducer.js';
import countriesReducer from './reducers/countriesReducer.js';

const reducer = combineReducers({
  user: userReducer,
  notification: notificationReducer,
  countries: countriesReducer
});

const store = createStore(
  reducer,
  composeWithDevTools(
    applyMiddleware(thunk),
  ),
);

export default store;