import React, { useState, useContext, useEffect } from "react";
import { Button, Form, Grid, Header, Segment } from "semantic-ui-react";
import AuthContext from "../../context/auth/authContext";
import AlertContext from "../../context/alert/alertContext";

const Login = (props) => {
  const alertContext = useContext(AlertContext);

  const { setAlert } = alertContext;

  const authContext = useContext(AuthContext);

  const { loginUser, error, clearError, isAuthenticated } = authContext;

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  });

  useEffect(() => {
    if (isAuthenticated) {
      props.history.push("/");
    } else if (
      error === "Please check your email, and try again" &&
      error === "Invalid password, please try again."
    ) {
      setAlert("Invalid email and password combination.", "ui red message.");
      clearError();
    } else if (error === "Invalid password, please try again.") {
      setAlert(`Invalid password, please try again.`, "ui red message", 10000);
      clearError();
    } else if (error === "Please check your email, and try again") {
      setAlert(`Invalid email, please try again.`, "ui red message", 10000);
      clearError();
    } else {
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error, clearError, isAuthenticated, props, loginUser]);

  const { email, password } = user;

  const onChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const onFormSubmit = (e) => {
    e.preventDefault();

    if (user.email === "" || user.password === "") {
      setAlert("Please fill out all fields.", "ui negative message");
    } else {
      loginUser({ email, password });
    }
  };

  return (
    <Grid textAlign="center" style={{ height: "100vh" }} verticalAlign="middle">
      <Grid.Column style={{ maxWidth: 450 }}>
        <Header as="h2" color="blue" textAlign="center">
          User Login
        </Header>
        <Form onSubmit={onFormSubmit} size="large">
          <Segment stacked>
            <Form.Input
              value={email}
              onChange={onChange}
              name="email"
              fluid
              icon="user"
              iconPosition="left"
              placeholder="E-mail address"
            />
            <Form.Input
              value={password}
              onChange={onChange}
              name="password"
              fluid
              icon="lock"
              iconPosition="left"
              placeholder="Password"
              type="password"
            />

            <Button value="login" color="blue" fluid size="large">
              Login
            </Button>
          </Segment>
        </Form>
      </Grid.Column>
    </Grid>
  );
};
export default Login;
