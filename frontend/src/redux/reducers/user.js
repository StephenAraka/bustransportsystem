import { SAVE_USER, REMOVE_USER } from '../actions/actionTypes';

const user = (user = { accessToken: false, data: {}, error: '' }, action) => {
  switch (action.type) {
  case SAVE_USER:
    return {
      accessToken: action.payload.id,
      data: {
        id: action.payload.id,
        name: action.payload.name,
      }
    };

  case REMOVE_USER:
    return {
      accessToken: false,
      data: {},
      error: ''
    };

  default:
    return user;
  }
};

export default user;
