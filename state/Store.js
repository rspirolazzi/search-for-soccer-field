import { applyMiddleware, combineReducers, createStore } from 'redux';
import { effectsMiddleware } from 'redux-effex';

import CurrentUserReducer from './CurrentUserReducer';
import StadiumsReducer from './StadiumsReducer';
import Effects from '../effects';

export default createStore(
  combineReducers({
    currentUser: CurrentUserReducer,
    stadiums: StadiumsReducer,
  }),
  applyMiddleware(effectsMiddleware(Effects)),
)

