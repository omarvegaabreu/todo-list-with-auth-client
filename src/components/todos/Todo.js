// import { Filter } from "@mui/icons-material";
import React, { Fragment, useContext, useEffect } from "react";
import TodoContext from "../../context/todo/todoContext";
import TodoItem from "./TodoItem";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import LoadingSpinner from "../layout/Spinner";
import { Message, Icon } from "semantic-ui-react";
const Todos = () => {
  const todoContext = useContext(TodoContext);
  const { todos, filtered, getTodos, loading } = todoContext;

  useEffect(
    () => getTodos(),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  if (todos !== null && todos.length === 0) {
    return (
      <Message icon>
        <Icon name="circle notched" loading />
        <Message.Content>
          <Message.Header>Do you have something to do ?</Message.Header>I am
          waiting to render your content.
        </Message.Content>
      </Message>
    );
  }

  return (
    <Fragment>
      {todos !== null && !loading ? (
        <TransitionGroup>
          {filtered !== null
            ? filtered.map((filtered) => (
                <CSSTransition
                  key={filtered._id}
                  timeout={1000}
                  classNames="item"
                >
                  <TodoItem todos={filtered} />
                </CSSTransition>
              ))
            : todos.map((todo) => (
                <CSSTransition key={todo._id} timeout={1000} classNames="item">
                  <TodoItem todos={todo} />
                </CSSTransition>
              ))}
        </TransitionGroup>
      ) : (
        <LoadingSpinner />
      )}
    </Fragment>
  );
};

export default Todos;
