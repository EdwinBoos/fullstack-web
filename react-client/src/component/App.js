import React, { Component } from "react";
import axios from "axios";
import Paper from "@material-ui/core/Paper";
import { Link } from "react-router-dom";
import LinearProgress from "@material-ui/core/LinearProgress";
import Fade from "@material-ui/core/Fade";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import Fab from "@material-ui/core/Fab";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import AppBar from "@material-ui/core/AppBar";
import Snackbar from "@material-ui/core/Snackbar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import DeleteIcon from "@material-ui/icons/Delete";

class App extends Component {
  state = {
    users: [],
    loading: false,
    snackbarMessage: "",
    snackbarOpen: false
  };

  constructor() {
    super();
    this.source = axios.CancelToken.source();
  }

  componentDidMount() {
    this.setState({
      users: [],
      loading: true,
      snackbarMessage: "",
      snackbarOpen: false
    });
    axios
      .get("/users?sort=id&order=desc", { cancelToken: this.source.token })
      .then(users =>
        this.setState({
          users: users.data,
          loading: false,
          snackbarMessage: "",
          snackbarOpen: false
        })
      )
      .catch(error => {
        if (!axios.isCancel(error)) {
          this.setState({
            users: [],
            loading: false,
            snackbarOpen: true,
            snackbarMessage: error.request.responseText
          });
        }
      });
  }

  componentWillUnmount() {
    this.source.cancel();
  }

  handleSnackbarClose = event => this.setState({ snackbarOpen: false });

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
          this.setState({
            users: [],
            loading: false,
            snackbarOpen: true,
            snackbarMessage: error.request.responseText
          });
        }
      });
  };

  render() {
    return (
      <div>
        <AppBar position="static">
          <Toolbar>
            <Typography color="inherit" variant="h6">
              Users
            </Typography>
          </Toolbar>
        </AppBar>
        <Paper>
          <Fade in={this.state.loading}>
            <LinearProgress color="secondary" />
          </Fade>
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
                <ListItemText
                  secondary={`${user.firstname} ${user.lastname}`}
                  primary={user.username}
                />
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
          <Grid container justify="center">
            <Fab
              onClick={this.handleNewUserPress}
              color="secondary"
              aria-label="Menu"
            >
              <AddCircleIcon />
            </Fab>
          </Grid>
        </Paper>
        <Snackbar
          autoHideDuration={5000}
          onClose={this.handleSnackbarClose}
          open={this.state.snackbarOpen}
          message={this.state.snackbarMessage}
          anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        />
      </div>
    );
  }
}

export default App;
