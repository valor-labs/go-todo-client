import * as types from './types';

export const addTodo = todo => ({ type: types.ADD_TODO, payload: { todo } });
export const setTodoCompleted = todo => ({ type: types.SET_TODO_COMPLETED, payload: { todo } });
export const changeTodoPriority = todo => ({ type: types.CHANGE_TODO_PRIORITY, payload: { todo } });
