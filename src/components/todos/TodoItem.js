import React, { useContext } from "react";
import { Button, Card } from "semantic-ui-react";
import TodoContext from "../../context/todo/todoContext";

export const TodoItem = ({ todos }) => {
  const { _id, todo, todoDescription } = todos;

  const todoContext = useContext(TodoContext);

  const { deleteTodo, setCurrent, clearCurrent } = todoContext;

  const onDelete = () => {
    deleteTodo(_id);
    clearCurrent();
  };

  const onEdit = () => {
    setCurrent(todos);
  };
  return (
    <Card fluid className="card bg-light">
      <Card.Content>
        <Card.Header>{todo}</Card.Header>

        <Card.Description>
          {todoDescription ? <p>{todoDescription}</p> : null}
        </Card.Description>
      </Card.Content>
      <Card.Content extra>
        <div className="ui two buttons">
          <Button basic color="green" onClick={onEdit}>
            Edit
          </Button>
          <Button basic color="red" onClick={onDelete}>
            Delete
          </Button>
        </div>
      </Card.Content>
    </Card>
  );
};

export default TodoItem;
