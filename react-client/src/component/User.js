import React, { Component } from "react";
import axios from "axios";
import Card from "@material-ui/core/Card";
import CircularProgress from "@material-ui/core/CircularProgress";
import Fade from "@material-ui/core/Fade";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
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
              User
            </Typography>
            <div>
              <Fade in={this.state.loading}>
                <CircularProgress color="secondary" />
              </Fade>
            </div>
          </Toolbar>
        </AppBar>
        <Card>
        </Card>
      </div>
    );
  }
}

export default App;
