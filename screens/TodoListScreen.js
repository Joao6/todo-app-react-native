import React from 'react'
import { Text, View, AsyncStorage } from 'react-native'
import { Button, Fab, Icon } from 'native-base'
import TodoListItem from '../components/TodoListItem';

class TodoListScreen extends React.Component {

  state = {
    todos: []
  }

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
    let todosAs = await AsyncStorage.getItem("todos");
    if (todosAs != null) {
      todosAs = JSON.parse(todosAs);
      todosAs.sort((a, b) => b.priority - a.priority);
      this.setState({ todos: todosAs });
    }
  }

  updateTodo = async (updatedTodo) => {
    const todos = this.state.todos;
    let indexOfUpdate = todos.findIndex((todo) => {
      return todo.id === updatedTodo.id;
    });
    todos[indexOfUpdate] = updatedTodo;
    this.setState({ todos })
    await AsyncStorage.setItem("todos", JSON.stringify(todos));
  }

  deleteTodo = async (updatedTodo) => {
    let todos = this.state.todos;
    todos = todos.filter((todo) => {
      return todo.id !== updatedTodo.id;
    });
    this.setState({ todos })
    await AsyncStorage.setItem("todos", JSON.stringify(todos));
  }

  render() {
    const { todos } = this.state;
    return (
      <View style={{ flex: 1 }}>
        {todos.map(todo => <TodoListItem
          key={todo.id}
          todo={todo}
          updateTodo={this.updateTodo}
          deleteTodo={this.deleteTodo} />)}

        <Fab
          style={{ backgroundColor: '#5067FF' }}
          position="bottomRight"
          onPress={() => this.props.navigation.navigate('TodoFormScreen')}>
          <Icon name="add" />
        </Fab>
      </View>
    )
  }
};

export default TodoListScreen;

