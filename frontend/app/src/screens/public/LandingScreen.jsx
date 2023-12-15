import React from "react";
import { View, ImageBackground, Text, StyleSheet } from 'react-native';

import CustomButton from "../../components/buttons/CustomButton";
import Link from "../../components/links/Link";

const image = './../../../assets/images/landing.png';

const LandingScreen = ({navigation}) => {

    return (
        <ImageBackground source={require(image)} resizeMode="cover" style={styles.background}>
             <View>
                <Text style={styles.title}>COMMUNITY</Text>
                <View style={styles.action_container}>
                    <CustomButton onPressed={() => {navigation.navigate('login')}}>
                        Login
                    </CustomButton>
                    <Text style={styles.text}>
                        Don't you have an account? <Link onPressed={()=> navigation.navigate('signup')}>Signup</Link>
                    </Text>
                </View>
             </View>
        </ImageBackground>
    );

}

const styles = StyleSheet.create({
    background: {
        flex:1, 
        alignItems: 'center',
    },
    title: {
        fontSize: 45, 
        color: '#4BC29C', 
        fontWeight: 'bold', 
        marginTop:150,
        flex: 0.5
    },
    text: {
        marginTop: 15, 
        alignSelf: 'center', 
        fontSize: 15, 
        color: 'white'
    },
    action_container: {
        flex:0.5, 
        justifyContent: 'flex-end', 
        marginBottom: 100,
    }
});

export default LandingScreen;
