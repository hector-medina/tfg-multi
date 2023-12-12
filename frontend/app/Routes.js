// IMPORTS
// Navigation
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
// UI
import { ThemeProvider } from "@rneui/themed"; 
import theme from './src/theme';
// Utils
import CustomOptions from './src/utils/CustomOptions';
// Imports of public Screens
import LandingScreen from './src/screens/public/LandingScreen';
import LoginScreen from './src/screens/public/LoginScreen';
import ForgotPasswordScreen from './src/screens/public/ForgotPasswordScreen';
import SignupScreen from './src/screens/public/SignupScreen';
import SignupsuccessfullyScreen from './src/screens/public/SignupsuccessfullyScreen';
import TermsOfUseScreen from './src/screens/public/TermsofuseScreen'; 


const PublicStack = createNativeStackNavigator();


function PublicRoutes() {
  return (
    <ThemeProvider theme={theme}>
      <NavigationContainer>
          <PublicStack.Navigator initialRouteName="landing">
              <PublicStack.Screen name="landing" component={LandingScreen} options={{headerShown: false}}/>
              <PublicStack.Screen name="login" component={LoginScreen} options={{headerShown: false}}/>
              <PublicStack.Screen name="forgotpassword" component={ForgotPasswordScreen} options={CustomOptions({title:'Forgot password'})}/>
              <PublicStack.Screen name="signup" component={SignupScreen} options={{headerShown: false}}/>
              <PublicStack.Screen name="signupsuccessfully" component={SignupsuccessfullyScreen} options={CustomOptions({title:'Signup sucessfuly', headerBackVisible:false})}/>
              <PublicStack.Screen name="termsofuse" component={TermsOfUseScreen} options={CustomOptions({title:'Terms of use'})}/>
          </PublicStack.Navigator>
      </NavigationContainer>
    </ThemeProvider>
  );
}

export default PublicRoutes