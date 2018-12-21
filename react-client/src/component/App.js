import React, { Component } from "react";
import axios from "axios";
import Paper from "@material-ui/core/Paper";
import { Link } from "react-router-dom";
import CircularProgress from "@material-ui/core/CircularProgress";
import Fade from "@material-ui/core/Fade";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";

class App extends Component {
  state = { users: [], loading: false };

  componentDidMount() {
    this.setState({ users: [], loading: true });
    axios
      .get("/users?sort=id&order=desc")
      .then(users => this.setState({ users: users.data, loading: false }))
      .catch(error => this.setState({ users: [], loading: false }));
  }

  render() {
    return (
      <div className="classes.root">
        <AppBar position="static">
          <Toolbar>
            <Typography color="inherit" variant="h6">
              Users
            </Typography>
            <div>
              <Fade in={this.state.loading}>
                <CircularProgress color="secondary" />
              </Fade>
            </div>
          </Toolbar>
        </AppBar>
        <Paper>
          <List style={{ overflow: "auto" }}>
            {this.state.users.map((user, index) => (
              <ListItem
                key={index}
                button
                component={Link}
                to={`/users/${user.id}`}
              >
                <ListItemIcon>
                  <AccountCircleIcon> </AccountCircleIcon>
                </ListItemIcon>
                <ListItemText>{user.username}</ListItemText>
              </ListItem>
            ))}
          </List>
        </Paper>
      </div>
    );
  }
}

export default App;
