import * as React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";
import { Main, NotFound } from "..";
import { Home, Dashboard, Login } from "../../modules";
import { Todos } from "../../modules/todos/todos";

export class Routes extends React.Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/">
            <Redirect to="/home" />
          </Route>
          <Main path="/home" component={Home} checkAuthentication={true} />
          <Main
            path="/dashboard"
            component={Dashboard}
            checkAuthentication={true}
          />
          <Main path="/todos" component={Todos} checkAuthentication={false} />
          <Main path="/login" component={Login} checkAuthentication={false} />
          <Main path="*" component={NotFound} checkAuthentication={false} />
        </Switch>
      </Router>
    );
  }
}
