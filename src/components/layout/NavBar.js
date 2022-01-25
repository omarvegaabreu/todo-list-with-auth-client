import React, { useContext, useEffect } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Menu, Icon, List } from "semantic-ui-react";
import AuthContext from "../../context/auth/authContext";
import TodoContext from "../../context/todo/todoContext";

const NavBar = ({ title, icon }) => {
  const authContext = useContext(AuthContext);
  const todoContext = useContext(TodoContext);
  const { clearTodos } = todoContext;
  const { user, loadUser, logout, isAuthenticated } = authContext;

  useEffect(() => {
    loadUser();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onLogout = () => {
    logout();
    clearTodos();
  };

  const authenticatedNav = (
    <Menu stackable className="navbar">
      <Menu.Item header>
        <Icon color="blue" name={icon} size="big" />
        <List.Content>{title}</List.Content>
      </Menu.Item>
      <Menu.Item header>
        {/* <Menu.Item as={Link} to="/Home" name="home" /> */}
        <List.Icon color="blue" name="users" />
        <List.Content>{user && user.name}</List.Content>
        <a onClick={onLogout} href="#!">
          <Icon color="blue" name={"log out"} size="big" />
        </a>
      </Menu.Item>
    </Menu>
  );

  const guestNav = (
    <>
      <Menu.Item color="teal">
        <Icon color="blue" name={icon} size="big" />
        <List.Content>{title}</List.Content>
      </Menu.Item>
      <Menu.Item as={Link} to="/login" name="login" />
      <Menu.Item as={Link} to="/register" name="register" />
      <Menu.Item as={Link} to="/about" name="about" />
    </>
  );

  return (
    <Menu stackable className="navbar">
      {isAuthenticated ? authenticatedNav : guestNav}
    </Menu>
  );
};

//type check for props
NavBar.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.string,
};

//Default Props
NavBar.defaultProps = {
  title: " To-do",
  icon: "clipboard list",
};

export default NavBar;
