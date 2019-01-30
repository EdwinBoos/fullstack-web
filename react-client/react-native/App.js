import React from "react";
import Axios from "axios";
import { StyleSheet, Text, View } from "react-native";

export default class App extends React.Component {
  state = { users: [], loading: false };

  constructor() {
    super();
    this.source = Axios.CancelToken.source();
  }

  componentDidMount() {
    Axios.get("/users?sort=id&order=desc", { cancelToken: this.source.token })
      .then(users =>
        this.setState({
          users: users.data,
          loading: false
        })
      )
      .catch(error => {
        if (!Axios.isCancel(error)) {
          this.setState({
            users: [],
            loading: false
          });
        }
      });
  }

  componentWillUnmount() {
    this.source.cancel();
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Welcome</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});
