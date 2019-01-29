import React, { Component } from "react";
import axios from "axios";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import CardActions from "@material-ui/core/CardActions";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import IconButton from "@material-ui/core/IconButton";
import LinearProgress from "@material-ui/core/LinearProgress";
import Fade from "@material-ui/core/Fade";
import Snackbar from "@material-ui/core/Snackbar";
import TextField from "@material-ui/core/TextField";
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
    dialogOpen: false,
    firstnameTextFieldValid: false,
    lastnameTextFieldValid: false,
    firstnameLabel: "First name",
    lastnameLabel: "Last name",
    addAPhotoIconColor: "inherit",
    filename: "",
    firstname: "",
    lastname: "",
    loading: false
  };

  constructor() {
    super();
    this.fileBlob = void 0;
    this.source = axios.CancelToken.source();
    this.firstnameTextField = React.createRef();
    this.lastnameTextField = React.createRef();
  }

  componentDidMount() {
    const { userId } = this.props.match.params;
    this.setState({ user: { photo: { data: "" } }, loading: true });
    axios
      .get(`/users/${userId}`, { cancelToken: this.source.token })
      .then(user =>
        this.setState({
          user: user.data,
          loading: false,
          firstname: user.data.firstname,
          lastname: user.data.lastname
        })
      )
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
    const { userId } = this.props.match.params;
    const userData = new FormData();
    userData.append("firstname", this.firstnameTextField.current.value);
    userData.append("lastname", this.lastnameTextField.current.value);
    userData.append("photo", this.fileBlob);
    this.setState({ user: { photo: { data: "" } }, loading: true });
    axios
      .put(`/users/${userId}/detail`, userData, {
        cancelToken: this.source.token
      })
      .then(user =>
        this.setState({
          user: user.data,
          filename: "",
          addAPhotoIconColor: "inherit",
          loading: false,
          dialogOpen: false
        })
      )
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
    if (event.target.files.length > 0) {
      this.fileBlob = event.target.files[0];
      this.setState({
        filename: event.target.files[0].name,
        addAPhotoIconColor: "secondary"
      });
    }
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

  handleSnackbarClose = event => this.setState({ snackbarOpen: false });

  handleDialogClose = event => this.setState({ dialogOpen: false });

  handleDialogOpen = event =>
    this.setState({
      dialogOpen: true,
      firstnameTextFieldValid: true,
      lastnameTextFieldValid: true
    });

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
            <CardActions>
              <IconButton onClick={this.handleDialogOpen}>
                <EditIcon />
              </IconButton>
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
        <Dialog open={this.state.dialogOpen} onClose={this.handleDialogClose}>
          <DialogTitle>Edit user {this.state.user.username}</DialogTitle>
          <DialogContent>
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
            <DialogContentText>{this.state.filename}</DialogContentText>
          </DialogContent>
          <DialogActions>
            <IconButton component="label">
              <AddAPhotoIcon color={this.state.addAPhotoIconColor} />
              <input
                accept="image/*"
                onChange={this.handlePictureSelected}
                type="file"
                style={{ display: "none" }}
              />
            </IconButton>

            <Button color="primary" onClick={this.handleDialogClose}>
              Cancel
            </Button>
            <Button
              color="primary"
              onClick={this.handleEditUserPress}
              disabled={
                !this.state.firstnameTextFieldValid ||
                !this.state.lastnameTextFieldValid
              }
            >
              Accept
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default User;
