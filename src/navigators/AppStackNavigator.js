import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../screens/loginScreen';
import ExamsScreen from '../screens/examsScreen';


var Stack = createStackNavigator();

const AppStackNavigator = () => {
    return (
      <Stack.Navigator>
        <Stack.Screen name="ExamsScreen" component={ExamsScreen} options = {{headerShown: false}} />
        <Stack.Screen name="LoginScreen" component={LoginScreen} options = {{headerShown: false}} />
      </Stack.Navigator>
    );
}

export default AppStackNavigator;