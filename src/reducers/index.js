import * as types from '../actions/types';

const createReducer = handlers => (state, action) => {
  if (!handlers.hasOwnProperty(action.type)) {
    return state;
  }

  return handlers[action.type](state, action);
};

const modifyTodo = (state, { payload }) => ({
  ...state,
  todo: payload.todo
});

export default createReducer({
  [types.ADD_TODO]: modifyTodo,
  [types.SET_TODO_COMPLETED]: modifyTodo,
  [types.CHANGE_TODO_PRIORITY]: modifyTodo,
});
