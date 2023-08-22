import 'react-native-gesture-handler';
import React from 'react'
import { I18nManager} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import AppStackNavigator from './src/navigators/AppStackNavigator';


I18nManager.allowRTL(false);

const App = () => {
  return (
    <NavigationContainer>
      <AppStackNavigator/>
    </NavigationContainer> 
  );
}

export default App;