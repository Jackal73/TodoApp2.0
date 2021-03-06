import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  Modal,
  ActivityIndicator,
  ImageBackground,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import colors from "./Colors";
import TodoList from "./components/TodoList";
import AddListModal from "./components/AddListModal";
import Fire from "./Fire";
import _ from "lodash";

const image = require("./assets/backimg.png");

const _console = _.clone(console);
console.warn = (message) => {
  if (message.indexOf("Setting a timer") <= -1) {
    _console.warn(message);
  }
};
export default class App extends Component {
  state = {
    addTodoVisible: false,
    lists: [],
    user: {},
    loading: true,
  };

  componentDidMount() {
    firebase = new Fire((error, user) => {
      if (error) {
        return alert("Uh oh, something went wrong!");
      }

      firebase.getLists((lists) => {
        this.setState({ lists, user }, () => {
          this.setState({ loading: false });
        });
      });

      this.setState({ user });
    });
  }

  componentWillUnmount() {
    firebase.detach();
  }

  toggleAddTodoModal() {
    this.setState({ addTodoVisible: !this.state.addTodoVisible });
  }

  renderList = (list) => {
    return <TodoList list={list} updateList={this.updateList} deleteList={this.deleteList} />;
  };

  addList = (list) => {
    firebase.addList({
      name: list.name,
      color: list.color,
      todos: [],
    });
  };

  updateList = (list) => {
    firebase.updateList(list);
  };

  deleteList = (list) => {
    firebase.deleteList(list);
  };

  render() {
    if (this.state.loading) {
      return (
        <View style={styles.container}>
          <ActivityIndicator size="large" color={colors.blue} />
        </View>
      );
    }
    return (
      <View style={styles.container}>
        <ImageBackground source={image} style={styles.backgroundImage}>
          <View>
            <Modal
              animationType="slide"
              visible={this.state.addTodoVisible}
              onRequestClose={() => this.toggleAddTodoModal()}
            >
              <AddListModal closeModal={() => this.toggleAddTodoModal()} addList={this.addList} />
            </Modal>

            <View style={{ flexDirection: "row" }}>
              <View style={styles.divider} />
              <Text style={styles.title}>
                Listit <Text style={{ fontWeight: "bold", color: colors.darkGray }}>2.0</Text>
              </Text>
              <View style={styles.divider} />
            </View>

            <View style={{ marginVertical: 72, alignItems: "center" }}>
              <TouchableOpacity style={styles.addList} onPress={() => this.toggleAddTodoModal()}>
                <AntDesign name="plus" size={16} color={colors.white} />
                <Text style={styles.add}>Add a list</Text>
              </TouchableOpacity>
            </View>

            <View style={{ height: 300, paddingLeft: 32 }}>
              <FlatList
                data={this.state.lists}
                keyExtractor={(item) => item.id.toString()}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                renderItem={({ item }) => this.renderList(item)}
                keyboardShouldPersistTaps="always"
              />
            </View>
          </View>
        </ImageBackground>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    // alignItems: "center",
    justifyContent: "center",
  },
  divider: {
    backgroundColor: colors.darkGray,
    height: 1,
    flex: 1,
    alignSelf: "center",
  },
  title: {
    fontSize: 50,
    fontWeight: "bold",
    color: colors.lightGray,
    paddingHorizontal: 48,
  },
  addList: {
    width: 100,
    borderWidth: 3,
    borderColor: colors.darkGray,
    borderRadius: 6,
    padding: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  add: {
    color: colors.white,
    fontWeight: "600",
    fontSize: 14,
    marginTop: 8,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
    alignItems: "center",
    justifyContent: "center",
  },
});
