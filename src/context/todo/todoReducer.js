import {
  GET_TODOS,
  ADD_TODO,
  DELETE_TODO,
  SET_CURRENT,
  CLEAR_CURRENT,
  UPDATE_TODO,
  CLEAR_TODOS,
  FILTER_TODOS,
  TODOS_ERROR,
} from "../types";

// eslint-disable-next-line import/no-anonymous-default-export
export default (state, action) => {
  switch (action.type) {
    case GET_TODOS:
      return {
        ...state,
        todos: action.payload,
        loading: false,
      };
    case ADD_TODO:
      return {
        ...state,
        todos: [action.payload, ...state.todos],
        loading: false,
      };
    case UPDATE_TODO:
      return {
        ...state,
        todos: state.todos.map((todo) => {
          return todo._id === action.payload._id ? action.payload : todo;
        }),
        loading: false,
      };
    case DELETE_TODO:
      return {
        ...state,
        todos: state.todos.filter((todo) => todo._id !== action.payload),
        loading: false,
      };
    case SET_CURRENT:
      return {
        ...state,
        current: action.payload,
      };
    case CLEAR_CURRENT:
      return {
        ...state,
        current: null,
      };
    case FILTER_TODOS:
      return {
        ...state,
        filtered: state.todos.filter((todo) => {
          const regex = new RegExp(`${action.payload}`, "gi");
          return todo.todo.match(regex) || todo.todoDescription.match(regex);
        }),
      };

    case CLEAR_TODOS: {
      return {
        ...state,
        todos: null,
        current: null,
        filtered: null,
        error: null,
      };
    }

    case TODOS_ERROR: {
      return {
        ...state,
        error: action.payload,
      };
    }

    default:
      return state;
  }
};
