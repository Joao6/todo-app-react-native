import React from 'react'
import { View, TextInput, AsyncStorage, Text, StyleSheet, Keyboard } from 'react-native'
import { Button } from 'native-base'

class TodoFormScreen extends React.Component {
  state = {
    todo: {
      id: "",
      title: "",
      priority: 0,
      completed: false
    }
  }

  addTodo = async (todo) => {
    Keyboard.dismiss();
    let todos = await AsyncStorage.getItem("todos");
    if (todos != null) {
      todos = JSON.parse(todos);
    } else {
      todos = [];
    }

    todo.id = Date.now();
    todos.push(todo);
    await AsyncStorage.setItem("todos", JSON.stringify(todos));
    this.props.navigation.navigate("TodoListScreen");
  }
  render() {
    return (
      <View style={{ padding: 15 }}>
        <Text style={styles.title}>Insira as informações da sua nova tarefa</Text>

        <TextInput
          style={styles.input}
          placeholder="Insira um título"
          underlineColorAndroid="grey"
          onChangeText={(text) => this.setState({ todo: { ...this.state.todo, title: text } })} />

        <TextInput
          style={styles.input}
          underlineColorAndroid="grey"
          placeholder="Prioridade"
          keyboardType="numeric"
          onChangeText={(text) => this.setState({ todo: { ...this.state.todo, priority: parseInt(text) } })} />

        <Button block success onPress={() => this.addTodo(this.state.todo)}>
          <Text style={styles.textButton}>Salvar</Text>
        </Button>
      </View>
    )
  }
}

export default TodoFormScreen;

const styles = StyleSheet.create({
  title: {
    fontSize: 16,
    marginBottom: 15
  },
  input: {
    marginBottom: 15,
    height: 40,
    paddingLeft: 5,
  },
  textButton: {
    color: "#FFF",
  }
})