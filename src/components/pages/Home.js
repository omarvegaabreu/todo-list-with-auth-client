import React, { useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import Todos from "../todos/Todo";
import TodoForm from "../todos/TodoForm";
import FilteredTodos from "../FilteredTodos";
import AuthContext from "../../context/auth/authContext";
import Login from "../auth/Login";
import { Button, Divider, Grid, Segment } from "semantic-ui-react";

const Home = () => {
  const authContext = useContext(AuthContext);
  const { loadUser, isAuthenticated } = authContext;

  useEffect(() => {
    loadUser();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isAuthenticated) {
    return (
      <Segment>
        <Grid columns={2} relaxed="very">
          <Grid.Column>
            <TodoForm />
          </Grid.Column>
          <Grid.Column>
            <FilteredTodos /> <Todos />
          </Grid.Column>
        </Grid>

        <Divider vertical />
      </Segment>
    );
  }

  return (
    <Segment placeholder>
      <Grid columns={2} relaxed="very" stackable>
        <Grid.Column>
          <Login />
        </Grid.Column>

        <Grid.Column verticalAlign="middle">
          <Link to="/register">
            <Button content="Sign up" icon="signup" size="big" />
          </Link>
          ;
        </Grid.Column>
      </Grid>

      <Divider vertical>Or</Divider>
    </Segment>
  );
};

export default Home;
