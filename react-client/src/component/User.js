import React, { Component } from "react";
import axios from "axios";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import CardActions from "@material-ui/core/CardActions";
import IconButton from "@material-ui/core/IconButton";
import CircularProgress from "@material-ui/core/CircularProgress";
import Fade from "@material-ui/core/Fade";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";

class User extends Component {
  state = { user: {}, loading: false };

  constructor() {
    super();
    this.CancelToken = axios.CancelToken;
    this.source = this.CancelToken.source();
  }

  componentDidMount() {
    this.setState({ user: {}, loading: true });
    const { userId } = this.props.match.params;
    axios
      .get(`/users/${userId}`, { cancelToken: this.source.token })
      .then(user => this.setState({ user: user.data, loading: false }))
      .catch(error => {
        if (!axios.isCancel(error)) {
          this.setState({ users: {}, loading: false });
        }
      });
  }

  componentWillUnmount() {
    this.source.cancel();
  }

  render() {
    return (
      <div className="classes.root">
        <AppBar position="static">
          <Toolbar>
            <Typography color="inherit" variant="h6">
              {this.state.user.username}
            </Typography>
            <div>
              <Fade in={this.state.loading}>
                <CircularProgress color="secondary" />
              </Fade>
            </div>
          </Toolbar>
        </AppBar>
        <Card style={{ maxWidth: 1200 }}>
          <CardMedia
            style={{ height: 250, paddingTop: "30%" }}
            image={require("../img/foo.jpg")}
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
            <IconButton>
              <DeleteIcon />
            </IconButton>
            <IconButton>
              <EditIcon />
            </IconButton>
          </CardActions>
        </Card>
      </div>
    );
  }
}

export default User;
