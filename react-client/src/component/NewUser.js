import React, { Component } from "react";
import Axios from "axios";
import LinearProgress from "@material-ui/core/LinearProgress";
import Fade from "@material-ui/core/Fade";
import Grid from "@material-ui/core/Grid";
import Snackbar from "@material-ui/core/Snackbar";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import IconButton from "@material-ui/core/IconButton";
import AddAPhotoIcon from "@material-ui/icons/AddAPhoto";
import DoneIcon from "@material-ui/icons/Done";

class NewUser extends Component {
  state = {
    firstnameTextFieldValid: false,
    lastnameTextFieldValid: false,
    usernameTextFieldValid: false,
    loading: false,
    firstnameLabel: "First name",
    lastnameLabel: "Last name",
    usernameLabel: "User name",
    snackbarMessage: "",
    snackbarOpen: false,
    addAPhotoIconColor: "inherit",
    filename: "",
    firstname: "",
    lastname: "",
    username: ""
  };

  constructor() {
    super();
    this.fileBlob = void 0;
    this.firstnameTextField = React.createRef();
    this.lastnameTextField = React.createRef();
    this.usernameTextField = React.createRef();
    this.source = Axios.CancelToken.source();
  }

  componentWillUnmount() {
    this.source.cancel();
  }

  handleDonePress = event => {
    const userData = new FormData();
    userData.append("photo", this.fileBlob);
    userData.append("firstname", this.firstnameTextField.current.value);
    userData.append("lastname", this.lastnameTextField.current.value);
    userData.append("username", this.usernameTextField.current.value);
    this.setState({ loading: true });
    Axios
      .post(`/users`, userData, { cancelToken: this.source.token })
      .then(() => {
        this.setState({
          loading: false,
          firstnameTextFieldValid: false,
          lastnameTextFieldValid: false,
          usernameTextFieldValid: false,
          firstnameLabel: "First name",
          lastnameLabel: "Last name",
          usernameLabel: "User name",
          snackbarMessage: "",
          snackbarOpen: false,
          addAPhotoIconColor: "inherit",
          filename: "",
          firstname: "",
          lastname: "",
          username: ""
        });
      })
      .catch(error => {
        if (!Axios.isCancel(error)) {
          const unprocessableEntityError = 422;
          if (error.request.status === unprocessableEntityError) {
            this.setState({
              loading: false,
              usernameTextFieldValid: false,
              snackbarOpen: false,
              usernameLabel: error.request.responseText
            });
          } else {
            this.setState({
              loading: false,
              snackbarOpen: true,
              snackbarMessage: error.request.responseText
            });
          }
        }
      });
  };

  handleFirstNameTextFieldChange = event => {
    const valid = new RegExp(/^(?=.{1,50}$)[a-z]+(?:['_.\s][a-z]+)*$/i).test(
      event.target.value
    );
    this.setState({
      firstname: event.target.value,
      firstnameTextFieldValid: valid
    });
  };

  handleLastNameTextFieldChange = event => {
    const valid = new RegExp(/^(?=.{1,50}$)[a-z]+(?:['_.\s][a-z]+)*$/i).test(
      event.target.value
    );
    this.setState({
      lastname: event.target.value,
      lastnameTextFieldValid: valid
    });
  };

  handleUserNameTextFieldChange = event => {
    const valid = event.target.value ? true : false;
    this.setState({
      username: event.target.value,
      usernameTextFieldValid: valid
    });
  };

  handlePictureSelected = event => {
    if (event.target.files.length > 0) {
      this.fileBlob = event.target.files[0];
      this.setState({
        filename: event.target.files[0].name,
        addAPhotoIconColor: "secondary"
      });
    }
  };

  handleSnackbarClose = event => this.setState({ snackbarOpen: false });

  render() {
    return (
      <div className="classes.root">
        <AppBar position="static">
          <Toolbar>
            <Typography color="inherit" variant="h6">
              Add a new user
            </Typography>
          </Toolbar>
        </AppBar>
        <Fade in={this.state.loading}>
          <LinearProgress color="secondary" />
        </Fade>
        <Grid container justify="center">
          <Card style={{ width: 1100 }}>
            <CardContent>
              <Grid container justify="center">
                <TextField
                  error={!this.state.firstnameTextFieldValid}
                  inputRef={this.firstnameTextField}
                  onChange={this.handleFirstNameTextFieldChange}
                  value={this.state.firstname}
                  margin="normal"
                  label={this.state.firstnameLabel}
                />
                <TextField
                  error={!this.state.lastnameTextFieldValid}
                  inputRef={this.lastnameTextField}
                  onChange={this.handleLastNameTextFieldChange}
                  value={this.state.lastname}
                  margin="normal"
                  label={this.state.lastnameLabel}
                />
                <TextField
                  error={!this.state.usernameTextFieldValid}
                  inputRef={this.usernameTextField}
                  onChange={this.handleUserNameTextFieldChange}
                  value={this.state.username}
                  margin="normal"
                  label={this.state.usernameLabel}
                />
              </Grid>
            </CardContent>
            <CardActions style={{ justifyContent: "center" }}>
              <IconButton component="label">
                <AddAPhotoIcon color={this.state.addAPhotoIconColor} />
                <input
                  accept="image/*"
                  onChange={this.handlePictureSelected}
                  type="file"
                  style={{ display: "none" }}
                />
              </IconButton>
              <IconButton
                disabled={
                  !this.state.usernameTextFieldValid ||
                  !this.state.firstnameTextFieldValid ||
                  !this.state.lastnameTextFieldValid
                }
                onClick={this.handleDonePress}
              >
                <DoneIcon />
              </IconButton>
              <Typography color="inherit">{this.state.filename}</Typography>
            </CardActions>
          </Card>
        </Grid>
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

export default NewUser;
