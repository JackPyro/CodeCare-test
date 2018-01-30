import {combineReducers} from 'redux';
import {reducer as events} from './events';

const reducers = combineReducers({
  events,
});

export default reducers;
