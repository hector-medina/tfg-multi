import React from 'react';
import { StyleSheet, ImageBackground, TouchableWithoutFeedback, Text, View } from 'react-native';
import { Button, ThemeProvider } from '@rneui/themed';
import { useForm } from 'react-hook-form';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';

import BasePublicScreen from './BasePublicScreen';
import CustomInput from '../../components/forms/CustomInput';  
import theme from '../../theme';
import Link from '../../components/links/Link';

const image = './../../../assets/images/form_background.png';

const SignupScreen = () => {

    const navigation = useNavigation();

    const { control, handleSubmit, errors } = useForm();

    const onLogin = (data) => {
      console.log(data);
    }

    return (
       <BasePublicScreen>
            <ThemeProvider theme={theme}>
                <View style={styles.image_container}>
                        <ImageBackground source={require(image)} resizeMode="cover" style={styles.image}>
                            <Text style={theme.components.Title.style}>COMMUNITY</Text>
                        </ImageBackground>
                </View>
                <View style={styles.form_container}>
                        <View style={[theme.components.Card.style, styles.card]}>
                            <View style={styles.subtitle_container}>
                            <TouchableWithoutFeedback onPress={()=> navigation.goBack()}><Icon style={theme.components.Subtitle.icon} name='angle-left'/></TouchableWithoutFeedback>
                            <Text style={[theme.components.Subtitle.style, {flex: 1, textAlign: 'center', marginRight: 30}]}>Join the Community</Text>
                            </View>
                            <Text></Text>
                            <CustomInput name='username' placeholder='Username' control={control}></CustomInput>
                            <CustomInput name='email' placeholder='Email' control={control}  keyboardType='email-address' ></CustomInput>
                            <CustomInput name='password' placeholder='Password' control={control} secureTextEntry ></CustomInput>
                            <View>
                                <Button onPress={handleSubmit(onLogin)}>Signup</Button>
                                <Text style={styles.text}>
                                    By creating the account you agree the <Link onPressed={()=> navigation.navigate('termsofuse')}>Terms of Use</Link>
                                </Text>
                            </View>
                        </View>
                </View>
            </ThemeProvider>
       </BasePublicScreen>
    );
}

const styles = StyleSheet.create({
    image_container: {
        flex: 0.7,
    },
    image: {
        flex:1, 
        alignItems: 'center'
    },
    subtitle_container: {
        flexDirection: 'row'
    },
    form_container: {
        flex:0.5
    },
    card: {
        marginTop: -150, 
    },
    text: {
        marginTop: 5, 
        alignSelf: 'center', 
        fontSize: 15, 
        color: 'black'
    },
});


export default SignupScreen;