import React, { useContext, useRef, useEffect } from "react";
import TodoContext from "../context/todo/todoContext";
import { Form } from "semantic-ui-react";

const FilteredTodos = () => {
  const todoContext = useContext(TodoContext);
  const text = useRef("");
  const { filteredTodo, clearFiltered, filtered, todos } = todoContext;

  useEffect(() => {
    if (filtered === null && todos !== null && todos.length > 0) {
      text.current.value = "";
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onInputChange = (e) => {
    const textValue = text.current.value;
    if (textValue !== "" || textValue !== undefined || textValue !== null) {
      filteredTodo(e.target.value);
    } else {
      clearFiltered(null);
    }
  };

  const renderedFiltered =
    todos !== null && todos.length > 0 ? (
      <Form>
        <Form.Field>
          <label>Find to-do</label>
          <Form.Input
            ref={text}
            type="text"
            placeholder="Filter To-do"
            onChange={onInputChange}
          />
        </Form.Field>
      </Form>
    ) : undefined;

  return <div>{renderedFiltered}</div>;
};

export default FilteredTodos;
