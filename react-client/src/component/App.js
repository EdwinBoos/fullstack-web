import React, { Component } from "react";
import axios from "axios";
import Paper from "@material-ui/core/Paper";
import { Link } from "react-router-dom";
import CircularProgress from "@material-ui/core/CircularProgress";
import Fade from "@material-ui/core/Fade";
import IconButton from "@material-ui/core/IconButton";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import AddCircleIcon from "@material-ui/icons/AddCircle";

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
	    <IconButton color="secondary" styles={{ marginLeft : -12, marginRight : 20}} aria-label="Menu">
	      <AddCircleIcon/>
	    </IconButton>
            <Typography color="inherit" variant="h6">
              Users
            </Typography>
            <div>
              <Fade in={this.state.loading}>
                <CircularProgress styles={{ marginLeft : 10}} color="secondary" />
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
