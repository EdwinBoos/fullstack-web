import React, { Component } from "react";
import axios from "axios";
import CircularProgress from "@material-ui/core/CircularProgress";
import Fade from "@material-ui/core/Fade";
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
    firstname: "",
    lastname: "",
    username: ""
  };

  constructor() {
    super();
    this.firstnameTextField = React.createRef();
    this.lastnameTextField = React.createRef();
    this.usernameTextField = React.createRef();
    this.source = axios.CancelToken.source();
  }

  componentWillUnmount() {
    this.source.cancel();
  }

  handleDonePress = event => {
    const firstname = this.firstnameTextField.current.value;
    const lastname = this.lastnameTextField.current.value;
    const username = this.usernameTextField.current.value;
    const userData = { firstname, lastname, username };
    this.setState({ loading: true });
    axios
      .post(`/users`, userData, { cancelToken: this.source.token })
      .then(() => {
        this.setState({
          loading: false,
          firstnameTextFieldValid: false,
          lastnameTextFieldValid: false,
          usernameTextFieldValid: false,
          firstname: "",
          lastname: "",
          username: ""
        });
      })
      .catch(error => {
        if (!axios.isCancel(error)) {
          this.setState({ loading: false });
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

  render() {
    return (
      <div className="classes.root">
        <AppBar position="static">
          <Toolbar>
            <Typography color="inherit" variant="h6">
              Add a new user
            </Typography>
            <div>
              <Fade in={this.state.loading}>
                <CircularProgress color="secondary" />
              </Fade>
            </div>
          </Toolbar>
        </AppBar>
        <Card style={{ maxWidth: 1200 }}>
          <CardContent>
            <TextField
	      error={!this.state.firstnameTextFieldValid}
              inputRef={this.firstnameTextField}
              onChange={this.handleFirstNameTextFieldChange}
              value={this.state.firstname}
              margin="normal"
              label="First name"
            />
            <TextField
	      error={!this.state.lastnameTextFieldValid}
              inputRef={this.lastnameTextField}
              onChange={this.handleLastNameTextFieldChange}
              value={this.state.lastname}
              margin="normal"
              label="Last name"
            />
            <TextField
	      error={!this.state.usernameTextFieldValid}
              inputRef={this.usernameTextField}
              onChange={this.handleUserNameTextFieldChange}
              value={this.state.username}
              margin="normal"
              label="Username"
            />
          </CardContent>
          <CardActions>
            <IconButton disabled={true} component="label">
              <AddAPhotoIcon />
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
          </CardActions>
        </Card>
      </div>
    );
  }
}

export default NewUser;
