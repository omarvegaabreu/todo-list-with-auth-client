import React, { useState, useContext, useEffect } from "react";
import { Button, Form, Grid, Header, Segment } from "semantic-ui-react";
import AuthContext from "../../context/auth/authContext";
import AlertContext from "../../context/alert/alertContext";
import { validEmail, isAlphaNumeric } from "../../util/validation";

const Register = (props) => {
  const alertContext = useContext(AlertContext);

  const { setAlert } = alertContext;

  const authContext = useContext(AuthContext);

  const { registerUser, error, clearError, isAuthenticated } = authContext;

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  });

  useEffect(() => {
    if (isAuthenticated) {
      props.history.push("/");
    }
    if (error === "User already exists") {
      setAlert(
        `${error}. You will be redirected to the login page.`,
        "ui red message",
        3000
      );
      props.history.push("/");
      clearError();
    }
  }, [error, clearError, setAlert, isAuthenticated, props]);

  const { name, email, password, password2 } = user;

  const onChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const onFormSubmit = (e) => {
    e.preventDefault();

    if (validEmail(email)) {
      setAlert("Please enter a valid email", "ui red message");

      return;
    }

    if (!isAlphaNumeric(password)) {
      setAlert(
        "Password requires numbers,letters, and special [!@#$%^&*]",
        "ui red message"
      );
      return;
    }

    if (
      user.name === "" ||
      user.email === "" ||
      user.password === "" ||
      user.password2 === ""
    ) {
      setAlert("Please fill out all fields.", "ui negative message");
    } else if (user.password !== user.password2) {
      setAlert("Password does not match.", "ui negative message");
    } else {
      registerUser({ name, email, password });
      setAlert("User registered ", "ui green message", 5000);
    }
  };

  return (
    <Grid textAlign="center" style={{ height: "100vh" }} verticalAlign="middle">
      <Grid.Column style={{ maxWidth: 450 }}>
        <Header as="h2" color="blue" textAlign="center">
          Register your account
        </Header>
        <Form onSubmit={onFormSubmit} size="large">
          <Segment stacked>
            <Form.Input
              onChange={onChange}
              value={name}
              name="name"
              fluid
              icon="user"
              iconPosition="left"
              placeholder="Name"
              required
            />
            <Form.Input
              value={email}
              onChange={onChange}
              name="email"
              fluid
              icon="user"
              iconPosition="left"
              placeholder="email@address"
              required
            />
            <Form.Input
              value={password}
              onChange={onChange}
              name="password"
              fluid
              icon="lock"
              iconPosition="left"
              placeholder="Password  (use numbers and letters)"
              type="password"
              required
              minLength="6"
            />
            <Form.Input
              value={password2}
              onChange={onChange}
              name="password2"
              fluid
              icon="lock"
              iconPosition="left"
              placeholder="Confirm password  (use numbers and letters)"
              type="password"
              required
              minLength="6"
            />

            <Button value="register" color="blue" fluid size="large">
              Register
            </Button>
          </Segment>
        </Form>
      </Grid.Column>
    </Grid>
  );
};
export default Register;
