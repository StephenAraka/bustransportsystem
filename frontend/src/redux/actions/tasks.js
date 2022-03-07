import axios from 'axios';
import {
  FETCH_TASKS,
} from './actionTypes';


const getTasks = (response) => ({
  type: FETCH_TASKS,
  payload: response.data
});

const fetchTasks = (userID) => (dispatch) => {

  axios.get('api/todo/')
    .then((response) => dispatch(getTasks(response)))
    .catch((error) => console.log(error));
};

export default fetchTasks;

