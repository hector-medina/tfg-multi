import React from "react";
import {Text, View, StyleSheet} from 'react-native';
import { Button } from '@rneui/themed';


import theme from '../../theme';


const SignupsuccessfullyScreen = ({route, navigation}) => {

    const { email } = route.params;

    return (
        <View style={[theme.components.Card.style, styles.card]}>
            <Text style={theme.components.Subtitle.style}>Signup successfully!</Text>
            <Text style={styles.text}>
                You have just created an account on our platform with the following 
                email: <Text style={{fontWeight: 'bold'}}>{email}</Text>.
            </Text>
                
            <Text style={styles.text}>
                Let's go back to the login screen and enter your credentials to start
                enjoying.
            </Text>
            <View>
                <Button onPress={() => {navigation.popToTop()}}>Login</Button>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        marginTop: 25,
    },
    text: {
        marginVertical: 10,
        fontSize: 16,
    }
});

export default SignupsuccessfullyScreen;