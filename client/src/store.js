import {applyMiddleware, combineReducers, createStore} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import userReducer from './reducers/userReducer.js';
import notificationReducer from './reducers/notificationReducer.js';
import locationReducer from './reducers/locationReducer.js';
import listingsReducer from './reducers/listingsReducer.js';

const reducer = combineReducers({
  location: locationReducer,
  user: userReducer,
  notification: notificationReducer,
  listings: listingsReducer,
});

const store = createStore(
  reducer,
  composeWithDevTools(
    applyMiddleware(thunk),
  ),
);


export default store;