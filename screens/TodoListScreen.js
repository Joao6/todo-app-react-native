import React from "react";
import {
  View,
  AsyncStorage,
  ActivityIndicator,
  Text,
  Image
} from "react-native";
import { Fab, Icon } from "native-base";
import TodoListItem from "../components/TodoListItem";
import Header from "../components/Header";

class TodoListScreen extends React.Component {
  static navigationOptions = {
    header: null
  };

  state = {
    todos: [],
    isLoading: true
  };

  async componentDidMount() {
    this.updateState();
    this.focusListener = this.props.navigation.addListener("didFocus", () => {
      this.updateState();
    });
  }

  componentWillUnmount() {
    this.focusListener.remove();
  }

  updateState = async () => {
    this.setState({ isLoading: true });
    let todosAs = await AsyncStorage.getItem("todos");
    if (todosAs != null) {
      todosAs = JSON.parse(todosAs);
      todosAs.sort((a, b) => b.priority - a.priority);
      this.setState({ todos: todosAs, isLoading: false });
    } else {
      this.setState({ isLoading: false });
    }
  };

  updateTodo = async updatedTodo => {
    const todos = this.state.todos;
    let indexOfUpdate = todos.findIndex(todo => {
      return todo.id === updatedTodo.id;
    });
    todos[indexOfUpdate] = updatedTodo;
    this.setState({ todos });
    await AsyncStorage.setItem("todos", JSON.stringify(todos));
  };

  deleteTodo = async updatedTodo => {
    let todos = this.state.todos;
    todos = todos.filter(todo => {
      return todo.id !== updatedTodo.id;
    });
    this.setState({ todos });
    await AsyncStorage.setItem("todos", JSON.stringify(todos));
  };

  render() {
    const { todos, isLoading } = this.state;
    return (
      <View style={{ flex: 1 }}>
        <Header />
        {!isLoading ? (
          <View>
            {todos.length > 0 ? (
              <View>
                {todos.map(todo => (
                  <TodoListItem
                    key={todo.id}
                    todo={todo}
                    updateTodo={this.updateTodo}
                    deleteTodo={this.deleteTodo}
                  />
                ))}
              </View>
            ) : (
              <View style={{ justifyContent: "center", alignItems: "center" }}>
                <Image
                  style={{ height: 120 }}
                  source={require("../assets/empty.png")}
                />
                <Text>Nenhuma tarefa adicionada ainda!</Text>
              </View>
            )}
          </View>
        ) : (
          <View style={{ flex: 1, justifyContent: "center" }}>
            <ActivityIndicator size="large" color="#333" />
          </View>
        )}
        <Fab
          style={{ backgroundColor: "#5067FF" }}
          position="bottomRight"
          onPress={() => this.props.navigation.navigate("TodoFormScreen")}
        >
          <Icon name="add" />
        </Fab>
      </View>
    );
  }
}

export default TodoListScreen;
