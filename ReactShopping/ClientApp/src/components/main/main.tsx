import "./main.scss";
import * as React from "react";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as userActionCreators from "../../redux/users/actions";
import { Footer, Navigation } from "..";
import { AppState } from "../../redux";

interface IMainContainerProps {
  component: any;
  isAuthed: boolean;
  path?: string;
  exact?: boolean;
  checkAuthentication: boolean;
}

const MainContainer: React.StatelessComponent<IMainContainerProps> = (props) => {
  const { component: Component, ...rest } = props;
  return <Route {...rest} render={matchProps =>
    (props.checkAuthentication && !props.isAuthed) ?
      (
        <Redirect to="/login" />
      ) :
      (
        <div className="wrapper">
          <Navigation history={matchProps.history} />
          <Component {...matchProps} />
          <div className="push"></div>
          <Footer />
        </div>
      )
  } />
}

export const Main = connect(
  (state: AppState) => {
    return ({ 
      isAuthed: state.users.isAuthed 
    });
  },

  (dispatch) => bindActionCreators(userActionCreators, dispatch)
)(MainContainer);