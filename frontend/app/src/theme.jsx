import { createTheme } from '@rneui/themed';
import { Platform } from 'react-native';

export const Colors = {
  primary: '#4BC29C',
  white: 'white'
}

const theme = createTheme({
  lightColors: {
    primary: Colors.primary,
  },
  darkColors: {
    primary: '#000',
  },
  mode: 'light',
  components: {
    Button: {
      buttonStyle: {
        borderRadius: 500,
        marginBottom: 5,
        marginTop: 15,
      },
      titleStyle: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 22,
        paddingVertical: 5,
      }
    },
    Link: {
      style: {
        color: Colors.primary, 
        fontSize: 16, 
        fontWeight: 'bold',
        alignSelf: 'center',
      }
    },
    Subtitle: { 
     style: {
      fontSize: 16, 
      fontWeight: 'bold', 
      alignSelf: 'center',
     },
     icon: {
      fontSize: 30,
      paddingHorizontal: 10,
      color: Colors.primary, 
  },
  },
    Title: {
      style: {
        fontSize: 45, 
        color: Colors.primary, 
        fontWeight: 'bold', 
        marginTop:100
    },
    },
    Card: {
      style: { 
        borderRadius:30, 
        padding: 20, 
        justifyContent: 'space-between',
        marginBottom:50, 
        backgroundColor: 'white', 
        marginHorizontal: 25,
        shadowColor: '#b2b2b2',
        shadowOffset: {
          width: Platform.OS === 'ios' ? 3 : 0,
          height: Platform.OS === 'ios' ? 3 : 2,
        },
        shadowOpacity:  0.8,
        shadowRadius: 40,
        elevation: 4,
    },
    },
    Appbar: {
      styles:{
        headerStyle: {
          backgroundColor: Colors.primary,
        },
        headerTitleStyle: {
          color: Colors.white
        },
        headerTintColor: Colors.white
      },
    },
    },
  });

export default theme;