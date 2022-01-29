import React, { useReducer } from "react";
import axios from "axios";
//import { v4 as uuidv4 } from "uuid";
import TodoContext from "./todoContext";
import todoReducer from "./todoReducer";
import {
  ADD_TODO,
  DELETE_TODO,
  GET_TODOS,
  CLEAR_TODOS,
  SET_CURRENT,
  UPDATE_TODO,
  FILTER_TODOS,
  TODOS_ERROR,
} from "../types";
import { API_URL } from "../../util/apiUrl";

const TodoState = (props) => {
  const initialState = {
    todos: null,
    current: null,
    filtered: null,
    error: null,
  };

  const [state, dispatch] = useReducer(todoReducer, initialState);

  /***********API CRUD OPERATIONS***************************************************** */

  //get todos
  const getTodos = async (todo) => {
    try {
      const res = await axios.get(`${API_URL}api/todos`);
      dispatch({ type: GET_TODOS, payload: res.data });
    } catch (error) {
      dispatch({ type: TODOS_ERROR, payload: error.response.msg });
    }
  };

  //Add todo
  const addTodo = async (todo) => {
    const config = {
      headers: {
        "Content-type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    };

    try {
      const res = await axios.post(`${API_URL}api/todos`, todo, config);
      dispatch({ type: ADD_TODO, payload: res.data });
    } catch (error) {
      dispatch({ type: TODOS_ERROR, payload: error.response.msg });
    }
  };

  //Delete todo
  const deleteTodo = async (id) => {
    try {
      await axios.delete(`${API_URL}api/todos/${id}`);
      dispatch({ type: DELETE_TODO, payload: id });
    } catch (error) {
      dispatch({ type: TODOS_ERROR, payload: error.response.msg });
    }
  };

  //update todo
  const updateTodo = async (todo) => {
    const config = {
      headers: {
        "Content-type": "application/json",
      },

      // headers: {
      //   "Access-Control-Allow-Origin": "*",
      //   "Content-type": "application/json",
      // },
    };

    try {
      const res = await axios.put(
        `${API_URL}api/todos/${todo._id}`,
        todo,
        config
      );
      dispatch({ type: UPDATE_TODO, payload: res.data });
    } catch (error) {
      dispatch({ type: TODOS_ERROR, payload: error.response.msg });
    }
  };

  /************UI  OPERATIONS***************************************************** */

  //set current todo
  const setCurrent = (todo) => dispatch({ type: SET_CURRENT, payload: todo });

  //clear current todo
  const clearCurrent = () => dispatch({ type: SET_CURRENT, payload: null });

  //filter todo
  const filteredTodo = (text) =>
    dispatch({ type: FILTER_TODOS, payload: text });

  //clear filter
  const clearFiltered = (text) =>
    dispatch({ type: FILTER_TODOS, payload: null });

  //clear todos
  const clearTodos = () => {
    dispatch({ type: CLEAR_TODOS });
  };

  return (
    <TodoContext.Provider
      value={{
        todos: state.todos,
        current: state.current,
        filtered: state.filtered,
        error: state.error,
        addTodo,
        deleteTodo,
        setCurrent,
        clearCurrent,
        updateTodo,
        filteredTodo,
        clearFiltered,
        clearTodos,
        getTodos,
      }}
    >
      {props.children}
    </TodoContext.Provider>
  );
};

export default TodoState;
