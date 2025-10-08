import { TASK_ACTIONS } from "../actionTypes";

export const taskInitialState = {
  tasks: [],
  currentTask: null,
  userTasks: [],
  isTaskLoading: false,
  isUserTaskLoading:false,
  error: null,
};

export function taskReducer(state, action) {
  switch (action.type) {
    case TASK_ACTIONS.TASK_REQUEST:
      return { ...state, isTaskLoading: true, error: null };

    case TASK_ACTIONS.SET_TASKS:
      return { ...state, tasks: action.payload, isTaskLoading: false };

    case TASK_ACTIONS.ADD_TASK:
      return {
        ...state,
        tasks: [...(state.tasks || []), action.payload],
        isTaskLoading: false,
      };

    case TASK_ACTIONS.UPDATE_TASK:
      return {
        ...state,
        tasks: state.tasks.map((t) =>
          t.id === action.payload.id ? { ...t, ...action.payload } : t
        ),
        currentTask:
          state.currentTask && state.currentTask.id === action.payload.id
            ? { ...state.currentTask, ...action.payload }
            : state.currentTask,
      };

    case TASK_ACTIONS.DELETE_TASK:
      return {
        ...state,
        tasks: state.tasks.filter((t) => t.id !== action.payload),
        currentTask:
          state.currentTask && state.currentTask.id === action.payload
            ? null
            : state.currentTask,
      };

     case TASK_ACTIONS.USER_TASK_REQUEST:
      return { ...state, isUserTaskLoading: true, error: null };

    case TASK_ACTIONS.SET_USER_TASKS:
      return { ...state, userTasks: action.payload, isUserTaskLoading: false };

    case TASK_ACTIONS.TASK_FAILURE:
      return { ...state, isUserTaskLoading: false, error: action.payload };

    default:
      return state;
  }
}
