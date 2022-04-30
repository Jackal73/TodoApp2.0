import { Text, StyleSheet, View, KeyboardAvoidingView, TouchableOpacity, TextInput, ImageBackground } from 'react-native';
import React, { Component } from 'react';
import { AntDesign } from '@expo/vector-icons';
import colors from '../Colors';

const image = require('../assets/list-screen.png');
export default class AddListModal extends Component {
  backgroundColors = ["rgba(39, 51, 89, 0.4)", "rgba(255, 255, 255, 0.1)", "rgba(89, 91, 217, 0.3)", "rgba(0, 255, 0, .15))", "rgba(209, 89, 219, 0.15)", "rgba(216, 89, 99, 0.15)", "rgba(216, 133, 89, 0.15)"];
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

<ImageBackground source={image} style={styles.backgroundImage}>
        <TouchableOpacity style={{position: "absolute", top: 64, right: 32}} onPress={this.props.closeModal}>
          <AntDesign name="close" size={24} color={colors.white} />
        </TouchableOpacity>

        <View style={{alignSelf: "stretch", marginHorizontal: 32}}>
          <Text style={styles.title}>Create Todo List</Text>
          <TextInput 
            style={[styles.input, {borderColor: this.state.color}]} 
            placeholder="List Name ?" 
            placeholderTextColor={colors.lightGray}            
            selectionColor={colors.white}
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

</ImageBackground>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    // alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: colors.white,
    alignSelf: 'center',
    marginBottom: 16,
  },
  input: {
    borderWidth: 2,
    // borderColor: colors.blue,
    borderRadius: 6,
    height: 50,
    marginTop: 8,
    paddingHorizontal: 16,
    fontSize: 18,
    color: colors.white,
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
  },
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
    alignItems: "center",
    justifyContent: "center"
  }
});