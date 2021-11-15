import {applyMiddleware, combineReducers, createStore} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import userReducer from './reducers/userReducer.js';
import notificationReducer from './reducers/notificationReducer.js';
import locationReducer from './reducers/locationReducer.js';
import listingsReducer from './reducers/listingsReducer.js';
import offersReducer from './reducers/offersReducer.js';

const appReducer = combineReducers({
  location: locationReducer,
  user: userReducer,
  notification: notificationReducer,
  listings: listingsReducer,
  offers: offersReducer
});

const rootReducer = (state, action)=>{
  if(action.type==='LOGOUT'){
    // reset state
    return appReducer(undefined, action);
  }
  return appReducer(state, action);
};

const store = createStore(
  rootReducer,
  composeWithDevTools(
    applyMiddleware(thunk),
  ),
);


export default store;