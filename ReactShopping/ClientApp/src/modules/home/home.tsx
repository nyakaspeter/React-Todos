import "./home.scss";
import * as React from "react";
import * as PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as userActionCreators from "../../redux/users/actions";
import { AppState } from "../../redux";

interface IHomeComponentState {
}

const initialState: IHomeComponentState = {
};

interface IHomeComponentProps {
  history: any;
  isAuthed: boolean;
  isFetching: boolean;
  error: string;
  fetchAndHandleAuthentication: (history: any) => void;
}

class HomeComponent extends React.Component<IHomeComponentProps, IHomeComponentState> {
  static propTypes = {
    isAuthed: PropTypes.bool.isRequired,
    isFetching: PropTypes.bool.isRequired,
    error: PropTypes.string.isRequired,
    fetchAndHandleAuthentication: PropTypes.func.isRequired
  }
  constructor(props: IHomeComponentProps) {
    super(props);
    this.state = initialState;
  }

  render() {
    return (
      <div className="login-box">
        <div className="container">
          <h1 className="hero-sign-in welcome">Welcome to Home!</h1>
        </div>
      </div>
    )
  }
}

export const Home = connect<any, any, any>(
  (state: AppState) => {
    return ({
      isFetching: state.users.isFetching,
      error: state.users.error,
      isAuthed: state.users.isAuthed
    });
  },

  (dispatch) => bindActionCreators(userActionCreators, dispatch)
)(HomeComponent);

