
import "./footer.scss";
import * as React from "react";

export class Footer extends React.Component {
  render() {
    return (
      <footer>
        <div className="container-fluid footer">
          <div className="row">
            <div className="col-md-12">
              <ul className="pull-right list-unstyled">
                <li>
                    ©Autsoft {new Date().getFullYear()}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    )
  }
}

  