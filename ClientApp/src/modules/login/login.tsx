import * as React from "react";
import * as PropTypes from "prop-types";
import * as userActionCreators from "../../redux/users/actions";
import { Resources } from "../../resources";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { AppState } from "../../redux";

interface ILoginComponentState {
  username: string;
  password: string;
}

interface ILoginComponentProps {
    history: any;
    isAuthed: boolean;
    isFetching: boolean;
    error: string;
    fetchAndHandleAuthentication: (history: any, username: string, password: string) => void;
  }

class LoginComponent extends React.Component<ILoginComponentProps, ILoginComponentState> {
    static propTypes = {
      isAuthed: PropTypes.bool.isRequired,
      isFetching: PropTypes.bool.isRequired,
      error: PropTypes.string.isRequired,
      fetchAndHandleAuthentication: PropTypes.func.isRequired
    }
    constructor(props: ILoginComponentProps) {
      super(props);
      
      this.state = {
        username: '',
        password: '',
      };

      this.handleChange = this.handleChange.bind(this);
      this.handleAuth = this.handleAuth.bind(this);
    }

    handleAuth(e: any) {
      e.preventDefault();

      const { username, password } = this.state;

      this.props.fetchAndHandleAuthentication(this.props.history, username, password);
    }
  
    handleChange(e: any) {
      const { name, value } = e.target;
      this.setState({ [name]: value } as ILoginComponentState);
    }

    render() {
      const { username, password } = this.state;
      return (
        <div className="login-box">
          <div className="container">
            <div className="card col-md-6 mt-5 mx-auto">
                <div className="card-body">
                <h3>Login</h3>
                <form>
                    <div className="d-flex flex-column form-group">
                    <div className="mb-2">
                        <label htmlFor="username">Username</label>
                        <input type="text" className="form-control" name="username" value={username} onChange={this.handleChange}/>
                    </div>
                    <div>
                        <label htmlFor="password">Password</label>
                        <input type="password" className="form-control" name="password" value={password} onChange={this.handleChange} required />
                    </div>
                    </div>
                    <button className="btn btn-primary w-100" type="submit" onClick={this.handleAuth}>
                    <i className="fas fa-cog fa-spin"></i><span>{Resources.Home.SignIn}</span>
                    </button>
                </form>
                </div>
            </div>
          </div>
        </div>
      )
    }
  }
  
  export const Login = connect<any, any, any>(
    (state: AppState) => {
      return ({
        isFetching: state.users.isFetching,
        error: state.users.error,
        isAuthed: state.users.isAuthed
      });
    },
  
    (dispatch) => bindActionCreators(userActionCreators, dispatch)
  )(LoginComponent);