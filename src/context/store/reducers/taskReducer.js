export const taskInitialState = {
  tasks: [],
  currentTask: null,
  userTasks: [],
  isTaskLoading: false,
  error: null,
};

export function taskReducer(state, action) {
  switch (action.type) {
    case "TASK_REQUEST":
      return { ...state, isTaskLoading: true, error: null };

    case "SET_TASKS":
      return { ...state, tasks: action.payload, isTaskLoading: false };

    case "ADD_TASK":
      return {
        ...state,
        tasks: [...(state.tasks || []), action.payload],
        isTaskLoading: false,
      };

    case "UPDATE_TASK":
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

    case "DELETE_TASK":
      return {
        ...state,
        tasks: state.tasks.filter((t) => t.id !== action.payload),
        currentTask:
          state.currentTask && state.currentTask.id === action.payload
            ? null
            : state.currentTask,
      };

    case "SET_USER_TASKS":
      return { ...state, userTasks: action.payload, isTaskLoading: false };

    case "TASK_FAILURE":
      return { ...state, isTaskLoading: false, error: action.payload };

    default:
      return state;
  }
}
