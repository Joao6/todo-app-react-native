import { createStackNavigator, createAppContainer, createSwitchNavigator } from 'react-navigation'
import TodoListScreen from '../screens/TodoListScreen'
import TodoFormScreen from '../screens/TodoFormScreen'

const AppNavigator = createStackNavigator({
    TodoListScreen: { screen: TodoListScreen },
    TodoFormScreen: { screen: TodoFormScreen }
});

export default createAppContainer(createSwitchNavigator(
    {
        App: AppNavigator
    },
    {
        initialRouteName: 'App'
    }
));