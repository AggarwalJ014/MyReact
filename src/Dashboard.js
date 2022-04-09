import React from "react";
import { Switch } from "react-router-dom";
import { Route } from "react-router-dom";
import { Link } from "react-router-dom";
import CreateEmail from "./CreateEmail";
import "./Dashboard.css";
import Listing from "./Listing";

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
  }

  handleClick = () => {
    localStorage.removeItem("isLoggedIn");
    this.props.history.push("/login");
  };

  render() {
    return (
      <>
        <nav className="navbar navbar-default">
          <div className="container-fluid">
            <ul className="nav navbar-nav navbar-right">
              <div className="logout" onClick={this.handleClick}>
                <i className="fa-solid fa-right-from-bracket">Logout</i>
              </div>
            </ul>
          </div>
        </nav>
        <div className="row">
          <div className="col-md-1"></div>
          <div className="col-md-2">
            <div className="row">
              <div style={{ textAlign: "center" }}>
                <CreateEmail />
              </div>
            </div>
            <p></p>
            <div className="row">
              <h3 className="padd">Folders</h3>
              <a
                href="/dashboard/inbox"
                role="button"
                className="btnn btn btn-default btn-lg"
              >
                <i className="fa-solid fa-inbox padd"></i>&nbsp;Inbox
              </a>
              <a
                href="/dashboard/sent"
                role="button" 
                className="btnn btn btn-default btn-lg"
              >
                <i className="fa-solid fa-envelope padd"></i>&nbsp;Sent Mail
              </a>
              <button type="button" className="btnn btn btn-default btn-lg">
                <i className="fa-solid fa-circle padd"></i>&nbsp;Important
              </button>
              <button type="button" className="btnn btn btn-default btn-lg">
                <i className="fa-solid fa-file padd"></i>&nbsp;Drafts
              </button>
              <br />
              <button type="button" className="btnn btn btn-default btn-lg">
                <i className="fa-solid fa-trash padd"></i>&nbsp;Trash
              </button>
            </div>
            <br />

            <div className="row">
              <h3 className="padd">Categories</h3>
              <p>
                <i className="one fa-solid fa-circle"></i>&nbsp;Work
              </p>
              <p>
                <i className="two fa-solid fa-circle"></i>&nbsp;Documents
              </p>
              <p>
                <i className="thr fa-solid fa-circle"></i>&nbsp;Social
              </p>
              <p>
                <i className="four fa-solid fa-circle"></i>&nbsp;Advertising
              </p>
              <br />
              <p>
                <i className="five fa-solid fa-circle"></i>&nbsp;Clients
              </p>
            </div>
          </div>
          <div className="col-md-9">
            <Switch>
              <Route
                exact
                path={`/dashboard/inbox`}
                render={(props) => <Listing {...props} type="inbox" />}
              />
              <Route
                exact
                path={`/dashboard/sent`}
                render={(props) => <Listing {...props} type="sent" />}
              />
              <Route
                exact
                path={`/dashboard/`}
                render={(props) => <Listing {...props} type="inbox" />}
              />
            </Switch>
          </div>
        </div>
      </>
    );
  }
}

export default Dashboard;
