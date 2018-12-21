import React, { Component } from "react";
import axios from "axios";
import Card from "@material-ui/core/Card";
import CircularProgress from "@material-ui/core/CircularProgress";
import Fade from "@material-ui/core/Fade";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";

class User extends Component {
  state = { user: {}, loading: false };

  componentDidMount() {
    this.setState({ user: {}, loading: true });
    const { userId } = this.props.match.params
    axios
      .get(`/users/${userId}`)
      .then(user => this.setState({ user: user.data, loading: false }))
      .catch(error => this.setState({ user: {}, loading: false }));
  }

  render() {
    return (
      <div className="classes.root">
        <AppBar position="static">
          <Toolbar>
            <Typography color="inherit" variant="h6">
              User {this.state.user.username}
            </Typography>
            <div>
              <Fade in={this.state.loading}>
                <CircularProgress color="secondary" />
              </Fade>
            </div>
          </Toolbar>
        </AppBar>
        <Card>
	</Card>
      </div>
    );
  }
}

export default User;
