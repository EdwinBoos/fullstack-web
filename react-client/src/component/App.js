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
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import DeleteIcon from "@material-ui/icons/Delete";

class App extends Component {
  state = { users: [], loading: false };

  constructor() {
    super();
    this.source = axios.CancelToken.source();
  }

  componentDidMount() {
    this.setState({ users: [], loading: true });
    axios
      .get("/users?sort=id&order=desc", { cancelToken: this.source.token })
      .then(users => this.setState({ users: users.data, loading: false }))
      .catch(error => {
        if (!axios.isCancel(error)) {
          this.setState({ users: [], loading: false });
        }
      });
  }

  componentWillUnmount() {
    this.source.cancel();
  }

  handleNewUserPress = event => this.props.history.push("/newUser");

  handleDeleteUserPress = (userId, event) => {
    this.setState({ users: [], loading: true });
    axios
      .delete(`/users/${userId}?sort=id&order=desc`, {
        cancelToken: this.source.token
      })
      .then(users => this.setState({ users: users.data, loading: false }))
      .catch(error => {
        if (!axios.isCancel(error)) {
          this.setState({ users: [], loading: false });
        }
      });
  };

  render() {
    return (
      <div className="classes.root">
        <AppBar position="static">
          <Toolbar>
            <IconButton
              onClick={this.handleNewUserPress}
              color="secondary"
              aria-label="Menu"
            >
              <AddCircleIcon />
            </IconButton>
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
                <ListItemText secondary={user.id} primary={user.username} />
                <ListItemSecondaryAction>
                  <IconButton
                    key={user.id}
                    onClick={event =>
                      this.handleDeleteUserPress(user.id, event)
                    }
                  >
                    <DeleteIcon />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            ))}
          </List>
        </Paper>
      </div>
    );
  }
}

export default App;
