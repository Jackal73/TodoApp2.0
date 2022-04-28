import { Text, StyleSheet, View, KeyboardAvoidingView, TouchableOpacity, TextInput } from 'react-native';
import React, { Component } from 'react';
import { AntDesign } from '@expo/vector-icons';
import colors from '../Colors';


export default class AddListModal extends Component {
  backgroundColors = ["#5cd859", "#24a6d9", "#595bd9", "#8022d9", "#d159db", "#d85963", "#d88559"];
  state ={
    name: "",
    color: this.backgroundColors[4]
  };

  createTodo = () => {
    const {name, color} = this.state

    const list = {name, color};

    this.props.addList(list);

    this.setState({name: ""});
    this.props.closeModal();
  };

  renderColors() {
    return this.backgroundColors.map(color => {
      return (
        <TouchableOpacity key={color} style={[styles.colorSelect, {backgroundColor: color}]} onPress={() => this.setState({color})} />
      )
    })
  }

  render() {
    return (
      <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === "ios" ? "padding" : "height"}>
        <TouchableOpacity style={{position: "absolute", top: 64, right: 32}} onPress={this.props.closeModal}>
          <AntDesign name="close" size={24} color={colors.black} />
        </TouchableOpacity>

        <View style={{alignSelf: "stretch", marginHorizontal: 32}}>
          <Text style={styles.title}>Create Todo List</Text>
          <TextInput 
            style={styles.input} 
            placeholder="List Name ?" 
            onChangeText={text => this.setState({name: text})}
          />

          <View style={{flexDirection: "row", justifyContent: "space-between", marginTop: 12}}>
            {this.renderColors()}
          </View>

          <TouchableOpacity style={[styles.create, { backgroundColor: this.state.color}]} onPress={this.createTodo}>
            <Text style={{color: colors.white, fontWeight: "normal"}}>
              Create!
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: colors.black,
    alignSelf: 'center',
    marginBottom: 16,
  },
  input: {
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.blue,
    borderRadius: 6,
    height: 50,
    marginTop: 8,
    paddingHorizontal: 16,
    fontSize: 18
  },
  create: {
    marginTop: 24,
    height: 50,
    borderRadius: 6,
    alignItems: "center",
    justifyContent: "center"
  },
  colorSelect: {
    width: 30,
    height: 30,
    borderRadius: 4
  }
});