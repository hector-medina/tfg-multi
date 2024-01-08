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
import AddRecordScreen from '../screens/private/home/account/AddRecordScreen';
import DebtScreen from '../screens/private/home/debt/DebtScreen';
import AddDebtScreen from '../screens/private/home/debt/AddDebtScreen';
import HomeIncidentScreen from '../screens/private/home/incident/HomeIncidentScreen';
import AgreementScreen from '../screens/private/home/agreement/AgreementScreen';
import UserScreen from './../screens/private/user/UserScreen';
import EditUserScreen from '../screens/private/user/EditUserScreen';
import AddPropertyScreen from './../screens/private/user/property/AddPropertyScreen';
import DetailPropertyScreen from './../screens/private/user/property/DetailPropertyScreen';
import EditPropertyScreen from './../screens/private/user/property/EditPropertyScreen';
import EditPropertyOwnerScreen from './../screens/private/user/property/EditPropertyOwnerScreen';
import AddCommunityScreen from './../screens/private/user/community/AddCommunityScreen';
import DetailCommunityScreen from '../screens/private/user/community/DetailCommunityScreen';
import EditCommunityScreen from '../screens/private/user/community/EditCommunityScreen';
import EditManagersScreen from '../screens/private/user/community/EditManagersScreen';
import IncidentScreen from './../screens/private/incident/IncidentScreen';
import MessagesScreen from './../screens/private/messages/MessagesScreen';
import NotificationsScreen from './../screens/private/notifications/NotificationsScreen';


const PrivateTab = createBottomTabNavigator();
const HomeStack = createNativeStackNavigator();
const UserStack = createNativeStackNavigator();

function HomeStackScreen() {
  return (
    <HomeStack.Navigator initialRouteName='home'>
      <HomeStack.Screen name="home" component={HomeScreen} options={CustomOptions({title: 'Community'})}/>
      <HomeStack.Screen name="account" component={AccountScreen} options={CustomOptions({title: 'Account'})}/>
      <HomeStack.Screen name="addrecord" component={AddRecordScreen} options={CustomOptions({title: 'Add record'})}/>
      <HomeStack.Screen name="debt" component={DebtScreen} options={CustomOptions({title: 'Debt'})}/>
      <HomeStack.Screen name="adddebt" component={AddDebtScreen} options={CustomOptions({title: 'Add debt'})}/>
      <HomeStack.Screen name="homeincidents" component={HomeIncidentScreen} options={CustomOptions({title: 'Incidents'})}/>
      <HomeStack.Screen name="agreements" component={AgreementScreen} options={CustomOptions({title: 'Agreements'})}/>
    </HomeStack.Navigator>
  );
}

function UserStackScreen(){
  return (
    <UserStack.Navigator initialRouteName='user'>
      <UserStack.Screen name="user" component={UserScreen} options={CustomOptions({title: 'User'})}/>
      <UserStack.Screen name="edituser" component={EditUserScreen} options={CustomOptions({title: 'Edit user'})}/>
      <UserStack.Screen name="addproperty" component={AddPropertyScreen} options={CustomOptions({title: 'Add property'})}/>
      <UserStack.Screen name="detailproperty" component={DetailPropertyScreen} options={CustomOptions({title: 'Detail property'})}/>
      <UserStack.Screen name="editproperty" component={EditPropertyScreen} options={CustomOptions({title: 'Edit property'})}/>
      <UserStack.Screen name="editpropertyowner" component={EditPropertyOwnerScreen} options={CustomOptions({title: 'Edit property owner'})}/>
      <UserStack.Screen name="addcommunity" component={AddCommunityScreen} options={CustomOptions({title: 'Add community'})}/>
      <UserStack.Screen name="detailcommunity" component={DetailCommunityScreen} options={CustomOptions({title: 'Detail community'})}/>
      <UserStack.Screen name="editcommunity" component={EditCommunityScreen} options={CustomOptions({title: 'Edit community'})}/>
      <UserStack.Screen name="editmanagers" component={EditManagersScreen} options={CustomOptions({title: 'Edit managers'})}/>
    </UserStack.Navigator>
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
                name="userTab" 
                component={UserStackScreen} 
                options={{
                  headerStyle: styles.headerStyle,
                  headerTitleStyle: styles.headerTitleStyle,
                  headerTintColor: theme.lightColors.white,
                  headerShown: false,
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