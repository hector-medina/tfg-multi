// IMPORTS
// Navigation
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
// UI
import { ThemeProvider } from "@rneui/themed"; 
import theme from './../theme';
import { StyleSheet } from 'react-native';
// Icons
import Icon from 'react-native-vector-icons/Ionicons';
// Utils
import CustomOptions from './../utils/CustomOptions';
// Imports of private Screens
import HomeScreen from './../screens/private/home/HomeScreen';
import AccountScreen from '../screens/private/home/account/AccountScreen';
import UserScreen from './../screens/private/user/UserScreen';
import IncidentScreen from './../screens/private/incident/IncidentScreen';
import MessagesScreen from './../screens/private/messages/MessagesScreen';
import NotificationsScreen from './../screens/private/notifications/NotificationsScreen';


const PrivateTab = createBottomTabNavigator();
const HomeStack = createNativeStackNavigator();

function HomeStackScreen() {
  return (
    <HomeStack.Navigator initialRouteName='home'>
      <HomeStack.Screen name="home" component={HomeScreen} options={CustomOptions({title: 'Community'})}/>
      <HomeStack.Screen name="account" component={AccountScreen} options={CustomOptions({title: 'Account'})}/>
    </HomeStack.Navigator>
  );
}

function PrivateRoutes(){
  return( 
    <ThemeProvider theme={theme}>
      <NavigationContainer>
          <PrivateTab.Navigator 
            initialRouteName="home"
            screenOptions={{
              tabBarActiveTintColor: theme.lightColors.primary,
              tabBarStyle: {
                marginBottom: 10
              }
            }}
          >
              <PrivateTab.Screen 
                name="homeTab" 
                component={HomeStackScreen} 
                options={{
                  headerStyle: styles.headerStyle,
                  headerTitleStyle: styles.headerTitleStyle,
                  headerTintColor: theme.lightColors.white,
                  headerShown: false,
                  title:'Community',
                  tabBarLabel:'Home',
                  tabBarIcon: ({color, size}) => (
                    <Icon name="home" color={color} size={size} />
                  ),
                }}
              />

              <PrivateTab.Screen 
                name="user" 
                component={UserScreen} 
                options={{
                  headerStyle: styles.headerStyle,
                  headerTitleStyle: styles.headerTitleStyle,
                  headerTintColor: theme.lightColors.white,
                  title:'User',
                  tabBarLabel: 'User',
                  tabBarIcon: ({color, size}) => (
                    <Icon name="person" color={color} size={size} />
                  ),
                }}
              />

              <PrivateTab.Screen 
                name="incident" 
                component={IncidentScreen} 
                options={{
                  headerStyle: styles.headerStyle,
                  headerTitleStyle: styles.headerTitleStyle,
                  headerTintColor: theme.lightColors.white,
                  title:'Incident',
                  tabBarLabel: 'Incident',
                  tabBarIcon: ({color, size}) => (
                    <Icon name="add" color={color} size={size} />
                  ),
                }}
              />

              <PrivateTab.Screen 
                name="messages" 
                component={MessagesScreen} 
                options={{
                  headerStyle: styles.headerStyle,
                  headerTitleStyle: styles.headerTitleStyle,
                  headerTintColor: theme.lightColors.white,
                  title:'Messages',
                  tabBarLabel: 'Messages',
                  tabBarIcon: ({color, size}) => (
                    <Icon name="chatbubbles" color={color} size={size} />
                  ),
                }}
              />

              <PrivateTab.Screen 
                name="notifications" 
                component={NotificationsScreen} 
                options={{
                  headerStyle: styles.headerStyle,
                  headerTitleStyle: styles.headerTitleStyle,
                  headerTintColor: theme.lightColors.white,
                  title:'Notifications',
                  tabBarLabel: 'Notifications',
                  tabBarIcon: ({color, size}) => (
                    <Icon name="notifications" color={color} size={size} />
                  ),
                  tabBarBadge:2
                }}              
              />
          </PrivateTab.Navigator>
      </NavigationContainer>
    </ThemeProvider>
  )
}

const styles = StyleSheet.create({
  headerStyle: {
    backgroundColor: theme.lightColors.primary,
  },
  headerTitleStyle: {
    color: theme.lightColors.white
  }
});

export default PrivateRoutes