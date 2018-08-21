import React, { Component } from 'react';
import '../css/App.css';

class App extends Component {
  state = {users: []}

  componentDidMount() {
    fetch('/users?sort=id&order=desc')
      .then(res => res.json())
      .then(users => this.setState({ users }));
  }

  render() {
    return (
      <div className="App">
        <h1>Users</h1>
        {this.state.users.map(user =>
          <div key={user.id}>{user.id} {user.firstname} {user.lastname} {user.username}</div>
        )}
      </div>
    );
  }
}

export default App;