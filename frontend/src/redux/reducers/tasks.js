
import {
  FETCH_TASKS
} from '../actions/actionTypes';

const initialState = {
  tasks: []
};

const tasks = (state = initialState, action) => {
  switch (action.type) {
  case FETCH_TASKS:
    return {
      ...state,
      tasks: action.payload
    };

  default:
    return initialState;
  }
};
export default tasks;
