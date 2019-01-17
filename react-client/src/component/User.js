import React, { Component } from "react";
import axios from "axios";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import CardActions from "@material-ui/core/CardActions";
import IconButton from "@material-ui/core/IconButton";
import LinearProgress from "@material-ui/core/LinearProgress";
import Fade from "@material-ui/core/Fade";
import Snackbar from "@material-ui/core/Snackbar";
import Grid from "@material-ui/core/Grid";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import AddAPhotoIcon from "@material-ui/icons/AddAPhoto";
import EditIcon from "@material-ui/icons/Edit";

class User extends Component {
  state = {
    user: { photo: { data: "" } },
    snackbarMessage: "",
    snackbarOpen: false,
    loading: false
  };

  constructor() {
    super();
    this.source = axios.CancelToken.source();
  }

  componentDidMount() {
    const { userId } = this.props.match.params;
    this.setState({ user: { photo: { data: "" } }, loading: true });
    axios
      .get(`/users/${userId}`, { cancelToken: this.source.token })
      .then(user => this.setState({ user: user.data, loading: false }))
      .catch(error => {
        if (!axios.isCancel(error)) {
          this.setState({
            user: { photo: { data: "" } },
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

  handleEditUserPress = event => {
    const userData = {
      username: "",
      firstname: "",
      lastname: ""
    };
    const { userId } = this.props.match.params;
    this.setState({ user: { photo: { data: "" } }, loading: true });
    axios
      .put(`/users/${userId}/detail`, userData, {
        cancelToken: this.source.token
      })
      .then(user => this.setState({ user: user.data, loading: false }))
      .catch(error => {
        if (!axios.isCancel(error)) {
          this.setState({
            user: { photo: { data: "" } },
            loading: false,
            snackbarOpen: true,
            snackbarMessage: error.request.responseText
          });
        }
      });
  };

  handlePictureSelected = event => {
    const userData = new FormData();
    const { userId } = this.props.match.params;
    if (event.target.files.length > 0) {
      userData.append("photo", event.target.files[0]);
      this.setState({ user: { photo: { data: "" } }, loading: true });
      axios
        .put(`/users/${userId}/detail`, userData, {
          cancelToken: this.source.token
        })
        .then(user => this.setState({ user: user.data, loading: false }))
        .catch(error => {
          if (!axios.isCancel(error)) {
            this.setState({
              user: { photo: { data: "" } },
              loading: false,
              snackbarOpen: true,
              snackbarMessage: error.request.responseText
            });
          }
        });
    }
  };

  render() {
    return (
      <div className="classes.root">
        <AppBar position="static">
          <Toolbar>
            <Typography color="inherit" variant="h6">
              {this.state.user.username}
            </Typography>
            <div />
          </Toolbar>
        </AppBar>
        <Fade in={this.state.loading}>
          <LinearProgress color="secondary" />
        </Fade>
        <Grid container justify="center">
          <Card>
            <CardMedia
              image={`data:image/jpeg;base64,${btoa(
                new Uint8Array(this.state.user.photo.data).reduce(
                  (data, byte) => data + String.fromCharCode(byte),
                  ""
                )
              )}`}
              style={{ paddingTop: "56.25%", height: 0, width: 1100 }}
            />
            <CardContent>
              <Typography variant="inherit">
                first name: {this.state.user.firstname}
              </Typography>
              <Typography variant="inherit">
                last name: {this.state.user.lastname}
              </Typography>
            </CardContent>
            <CardActions style={{ justifyContent: "center" }}>
              <IconButton component="label">
                <AddAPhotoIcon />
                <input
                  accept="image/*"
                  onChange={this.handlePictureSelected}
                  type="file"
                  style={{ display: "none" }}
                />
              </IconButton>
              <IconButton onClick={this.handleEditUserPress}>
                <EditIcon />
              </IconButton>
            </CardActions>
          </Card>
        </Grid>
        <Snackbar
          autoHideDuration={5000}
          onClose={event => this.setState({ snackbarOpen: false })}
          open={this.state.snackbarOpen}
          message={this.state.snackbarMessage}
          anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        />
      </div>
    );
  }
}

export default User;
