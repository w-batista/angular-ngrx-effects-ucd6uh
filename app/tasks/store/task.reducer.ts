import { Task } from './../model/task';
import { TaskAction, TaskActionTypes } from './task.actions';
import { taskInitialState, TaskState } from './task.state';

export function taskReducer(
  state = taskInitialState, action: TaskAction): TaskState {

  switch (action.type) {

    case TaskActionTypes.LOAD_SUCCESS:
      return Object.assign({}, state, {
        isLoading: false,
        error: null,
        tasks: action.payload.tasks
      });

    case TaskActionTypes.CREATE_SUCCESS:
      return Object.assign({}, state, {
        error: null,
        tasks: [...state.tasks, action.payload.task]
      });

    case TaskActionTypes.UPDATE_SUCCESS:
      return Object.assign({}, state, {
        error: null,
        tasks: state.tasks.map((task: Task) => {
          return task.id === action.payload.id ? action.payload.task : task;
        })
      });

    case TaskActionTypes.REMOVE_SUCCESS:
      return Object.assign({}, state, {
        error: null,
        tasks: state.tasks.filter((task: Task) => {
          return task.id !== action.payload.id;
        })
      });

    default:
      return state;
  }
};