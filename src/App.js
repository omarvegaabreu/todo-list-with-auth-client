import React, { Fragment } from "react";
import AuthState from "./context/auth/AuthState";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import NavBar from "./components/layout/NavBar";
import Home from "./components/pages/Home";
import About from "./components/pages/About";
import TodoState from "./context/todo/TodoState";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import AlertState from "./context/alert/AlertState";
import Alerts from "./components/layout/Alerts";
import setAuthToken from "./util/setAuthToken";
import PrivateRoute from "./components/private-route/PrivateRoute";
import "./App.css";

const USER_TOKEN = localStorage.token;

if (USER_TOKEN) {
  setAuthToken(USER_TOKEN);
}

const App = () => {
  return (
    <AuthState>
      <TodoState>
        <AlertState>
          <Router>
            <Fragment>
              <NavBar />
              <div className="container ">
                <Alerts />
                <Switch>
                  <PrivateRoute exact path="/" component={Home}></PrivateRoute>
                  <Route exact path="/about" component={About}></Route>
                  <Route exact path="/login" component={Login}></Route>
                  <Route exact path="/register" component={Register}></Route>
                  <Route component={Home}></Route>
                </Switch>
              </div>
            </Fragment>
          </Router>
        </AlertState>
      </TodoState>
    </AuthState>
  );
};

export default App;
