import React from "react";
import { StyleSheet } from "react-native";
import { ListItem, Text, CheckBox, Body, Button, Icon } from "native-base";

export default class TodoListItem extends React.Component {
  render() {
    const { todo, deleteTodo, updateTodo } = this.props;

    return (
      <ListItem>
        <CheckBox
          checked={todo.completed}
          onPress={() =>
            updateTodo({
              ...todo,
              completed: !todo.completed
            })
          }
        />
        <Body>
          <Text style={styles.title}>{todo.title}</Text>
          <Text style={styles.priority}>Prioridade: {todo.priority}</Text>
        </Body>
        <Button transparent onPress={() => deleteTodo(todo)}>
          <Icon name={"trash"} />
        </Button>
      </ListItem>
    );
  }
}

const styles = StyleSheet.create({
  title: {
    fontSize: 16,
    fontWeight: "bold"
  },
  priority: {
    fontSize: 14,
    color: "#A5A5A5"
  }
});
