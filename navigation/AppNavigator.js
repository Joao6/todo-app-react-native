import { createAppContainer, createStackNavigator } from "react-navigation";
import TodoListScreen from "../screens/TodoListScreen";
import TodoFormScreen from "../screens/TodoFormScreen";

const AppStackNavigator = createStackNavigator(
  {
    TodoListScreen: TodoListScreen,
    TodoFormScreen: TodoFormScreen
  },
  {
    initialRouteName: "TodoListScreen"
  }
);

export default AppContainer = createAppContainer(AppStackNavigator);
