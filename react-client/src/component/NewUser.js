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
  state = { loading : false };

  constructor() {
    super();
    this.firstnameTextField = React.createRef(); 
    this.lastnameTextField = React.createRef();  
    this.usernameTextField = React.createRef(); 
    this.source = axios.CancelToken.source();
  }

  componentDidMount() {
  }

  componentWillUnmount() {
    this.source.cancel();
  }

  handleDonePress = event =>
  { 
    const firstname = this.firstnameTextField.current.value
    const lastname = this.lastnameTextField.current.value
    const username = this.usernameTextField.current.value
    const userData = { firstname, lastname, username };
    this.setState({ loading: true });
    axios
      .post(`/users`, userData, { cancelToken: this.source.token })
      .then((user) => this.setState({ loading: false }))
      .catch(error => {
        if (!axios.isCancel(error)) {
          this.setState({ loading: false });
        }
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
	     <TextField inputRef={this.firstnameTextField} margin="normal" label="First name" />
	     <TextField inputRef={this.lastnameTextField} margin="normal" label="Last name" />
	     <TextField inputRef={this.usernameTextField} margin="normal" label="Username" />
          </CardContent>
          <CardActions>
            <IconButton component="label">
              <AddAPhotoIcon />
              <input
                accept="image/*"
                onChange={this.handlePictureSelected}
                type="file"
                style={{ display: "none" }}
              />
            </IconButton>
            <IconButton onClick={this.handleDonePress} >
              <DoneIcon />
            </IconButton>
           </CardActions>
        </Card>
       </div>
    );
  }
}

export default NewUser;
