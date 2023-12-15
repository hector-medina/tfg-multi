// IMPORTS
// Navigation
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// UI
import { ThemeProvider } from "@rneui/themed"; 
import theme from './../theme';
// Utils
import CustomOptions from './../utils/CustomOptions';
// Imports of private Screens
import HomeScreen from './../screens/private/home/HomeScreen';
import UserScreen from './../screens/private/user/UserScreen';
import IncidentScreen from './../screens/private/incident/IncidentScreen';
import MessagesScreen from './../screens/private/messages/MessagesScreen';
import NotificationsScreen from './../screens/private/notifications/NotificationsScreen';

const PrivateTab = createBottomTabNavigator();


function PrivateRoutes(){
  return(
    <ThemeProvider theme={theme}>
      <NavigationContainer>
          <PrivateTab.Navigator initialRouteName="home">
              <PrivateTab.Screen name="home" component={HomeScreen} options={CustomOptions({title:'Home'})}/>
              <PrivateTab.Screen name="user" component={UserScreen} options={CustomOptions({title:'User'})}/>
              <PrivateTab.Screen name="incident" component={IncidentScreen} options={CustomOptions({title:'Incident'})}/>
              <PrivateTab.Screen name="messages" component={MessagesScreen} options={CustomOptions({title:'Messages'})}/>
              <PrivateTab.Screen name="notifications" component={NotificationsScreen} options={CustomOptions({title:'Notifications'})}/>
          </PrivateTab.Navigator>
      </NavigationContainer>
    </ThemeProvider>
  )
}

export default PrivateRoutes