import React, { Component } from 'react';
import '../css/App.css';
import axios from 'axios';
import Card from '@material-ui/core/Card'
import Button from '@material-ui/core/Button'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'

const styles = {
  root : { flexGrow : 1 }
}
class App extends Component {
  state = {users: []}

  componentDidMount() {
    axios.get('/users?sort=id&order=desc')
         .then(users => this.setState({ users : users.data }));
  }

  render() {
    return (
      <div className="classes.root">
	<AppBar>  
         <Toolbar> 
	   <Typography color="inherit" variant="H6">
	     Users
	   </Typography>
         </Toolbar>
        </AppBar>
	<Card>
	<List>
	{ 
           this.state.users.map(user =>
              <ListItem key={user.id}>{user.id} {user.firstname} {user.lastname} {user.username}</ListItem>
        )}
	</List>
        </Card>	
        <Button variant="contained" color="primary">
        Add 
	</Button>

      </div>
    );
  }
}

export default App;
