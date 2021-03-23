// Copyright (c) Microsoft. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.
import "./navigation.scss";
import * as React from "react";
import {
  BrowserRouter as Router,
  Route,
  Link,
  NavLink
} from "react-router-dom";
import * as PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as userActionCreators from "../../redux/users/actions";
import { Resources } from "../../resources";
import { UserState, AppState } from "../../redux";

interface INavigationComponentState {}

const initialState: INavigationComponentState = {};

interface INavigationComponentProps {
  history: any;
  isAuthed: boolean;
  isFetching: boolean;
  error: string;
  unauthUser: () => void;
  fetchAndHandleAuthentication: (history: any) => void;
}

class NavigationComponent extends React.Component<
  INavigationComponentProps,
  INavigationComponentState
> {
  static propTypes = {
    isAuthed: PropTypes.bool.isRequired,
    isFetching: PropTypes.bool.isRequired,
    error: PropTypes.string.isRequired,
    unauthUser: PropTypes.func.isRequired
  };

  constructor(props: INavigationComponentProps) {
    super(props);
    this.state = initialState;
  }
  handleUnauth = () => {
    this.props.unauthUser();
    this.props.history.push("/");
  };
  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <a className="navbar-brand" href="#">
          ReactShopping
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <NavLink
                exact
                activeClassName="active"
                className="nav-link"
                to="/home"
              >
                {Resources.Navigation.Home}
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                exact
                activeClassName="active"
                className="nav-link"
                to="/dashboard"
              >
                {Resources.Navigation.Dashboard}
              </NavLink>
            </li>
          </ul>
        </div>
        {this.props.isAuthed && (
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <a className="nav-link" onClick={this.handleUnauth}>
                {Resources.Navigation.SignOut}
              </a>
            </li>
          </ul>
        )}
      </nav>
    );
  }
}

export const Navigation = connect<any, any, any>(
  (state: AppState) => {
    return {
      isAuthed: state.users.isAuthed,
      isFetching: state.users.isFetching,
      error: state.users.error
    };
  },

  dispatch => bindActionCreators(userActionCreators, dispatch)
)(NavigationComponent);
