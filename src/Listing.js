import React, { Component } from "react";

export default class Listing extends Component {
  constructor(props) {
    super(props);
    this.state = {
      emails: []
    };
  }


  componentDidMount() {
    this.getEmails();
    
  }

  

  getEmails = () => {
    const emails = localStorage.getItem("emails");
    const loggedInEmail = localStorage.getItem("isLoggedIn");

    const data = JSON.parse(emails);

    let dataArr = [];

    switch (this.props.type) {
      case "inbox":
        dataArr = data.filter((it) => it.to === loggedInEmail);
        break;
      case "sent":
        dataArr = data.filter((it) => it.from === loggedInEmail);
        break;
      default:
        dataArr = data.filter((it) => it.to === loggedInEmail);
        break;
    }

    this.setState({
      emails: dataArr,
    });
  };

  handleRefresh = () => {
    console.log('hi');
    this.getEmails();
  };

  render() {
    return (
      <>
        <div className="row">
          <div className="padRem col-md-3">
            <h2>Inbox(16)</h2>
            <button
              type="button"
              onClick={this.handleRefresh}
              className="btn btn-sm"
            >
              <i className="fa-solid fa-arrows-rotate"></i>&nbsp;Refresh
            </button>
            <button type="button" className="btn btn-sm">
              <i className="fa-solid fa-eye"></i>
            </button>
            <button type="button" className="btn btn-sm">
              <i className="fa-solid fa-exclamation"></i>
            </button>
            <button type="button" className="btn btn-sm">
              <i className="fa-solid fa-trash"></i>
            </button>
          </div>
          <div className="col-md-5"></div>

          <div className="padR col-md-4">
            <div className="row" style={{ position: "relative" }}>
              <span className="col-md-8">
                <input
                  type="text"
                  style={{
                    borderColor: "#ccc",
                    borderWidth: "1px",
                    position: "relative",
                    top: "3px",
                  }}
                  className="form-control-plaintext"
                  id="search"
                  placeholder=" Search email"
                />
              </span>
              <span className="marg col-md-1">
                <label htmlFor="search" className="col-sm-1 col-form-label">
                  <button
                    type="button"
                    style={{ padding: "5px 20px" }}
                    className="btn btn-success btn-md"
                  >
                    Search
                  </button>
                </label>
              </span>
            </div>
          </div>
        </div>
        <div>
          <table className="table table-striped">
            <tbody>
              {this.state.emails.map(({ to, cc, body, isRead }, idx) => (
                <tr
                  style={{
                    position: "relative",
                    fontWeight: isRead ? "normal" : "bolder",
                  }}
                  className="row"
                  key={idx}
                >
                  <input
                    style={{
                      position: "absolute",
                      left: "10px",
                      top: "6px",
                    }}
                    className="form-check-input"
                    type="checkbox"
                    value=""
                    id="flexCheckDefault"
                  />
                  <td
                    style={{ textAlign: "left", paddingLeft: "50px" }}
                    className="col-md-4"
                  >
                    {to}
                  </td>
                  <td style={{ textAlign: "left" }} className="col-md-4">
                    {cc}
                  </td>
                  <td style={{ textAlign: "right" }} className="col-md-4">
                    {body}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </>
    );
  }
}
