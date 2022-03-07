import { combineReducers } from 'redux';
import user from './user';
import tasks from './tasks';

export default combineReducers({
  user,
  tasks
});
