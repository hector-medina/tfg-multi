import React, { useState } from 'react';
import { StyleSheet, ImageBackground, TouchableWithoutFeedback, Text, View } from 'react-native';
import { Button, ThemeProvider } from '@rneui/themed';
import { useForm } from 'react-hook-form';
import Icon from 'react-native-vector-icons/FontAwesome';

import theme from '../../theme';

import BasePublicScreen from './BasePublicScreen';
import CustomInput from '../../components/forms/CustomInput';  
import Link from '../../components/links/Link';
import Loading from '../../components/loadings/Loading';
import ErrorModal from '../../components/modals/ErrorModal';

import EMAIL_REGEX from '../../utils/FormValidations';
import { fetchData } from '../../api/utils/useFetch';
import { NormalizeSignup } from '../../api/signup/signup';

const image = './../../../assets/images/form_background.png';

const SignupScreen = ({navigation}) => {

    // Form logic
    const { control, handleSubmit, formState: {errors}, watch } = useForm();
    const password = watch('password');
    const email_regex = EMAIL_REGEX;

    // Modal components for displaying loading and error messages
    const [modalVisible, setModalVisible] = useState(false);
    const [ErrorModalVisible, setErrorModalVisible] = useState(false);
    const [fetchErrors, setFetchErrors] = useState(null);

    // Close error modal on pressed
    const closeModal = () => {
        setErrorModalVisible(false);
    };

    // Signup logic
    const onSignup = async (payload) => {  
        setModalVisible(true);
        const user = NormalizeSignup({data: payload});
        try {
            const url = '/signup/';
            const data = await fetchData({url: url, data: user});
            setModalVisible(false);
            navigation.navigate('signupsuccessfully', {email: user.email});
          } catch (error) {
            setModalVisible(false);
            setErrorModalVisible(true)
            setFetchErrors(error.message);
        }
    }

    return (
       <BasePublicScreen>
            <ThemeProvider theme={theme}>
                { fetchErrors != null && <ErrorModal title={'Error'} message={fetchErrors} modalVisible={ErrorModalVisible} onClose={closeModal}/>}
                <Loading title={'Signup'} message={'Signing up your account'} modalVisible={modalVisible}/>
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
                            <CustomInput 
                                name='username' 
                                placeholder='Username' 
                                rules={
                                    {
                                        required: 'Username must be provided.',
                                        minLength: {
                                            value: 3,
                                            message: 'Username must be at least 3 characters long.'
                                        }
                                    }
                                } 
                                control={control}
                                />
                            
                            <CustomInput 
                                name='email' 
                                placeholder='Email' 
                                rules={
                                    {
                                        required: 'Email must be provided.',
                                        pattern: {
                                            value: email_regex,
                                            message: 'Email must be valid.' 
                                        }
                                    }
                                }
                                control={control}  
                                keyboardType='email-address' 
                                />

                            <CustomInput 
                                name='password' 
                                placeholder='Password' 
                                rules={
                                    {
                                        required: 'Password must be provided.',
                                        minLength: {
                                            value: 10,
                                            message: 'Password must be at least 10 characters long.'
                                        }
                                    }
                                } 
                                control={control} 
                                secureTextEntry
                                />

                            <CustomInput 
                                name='repeat-password' 
                                placeholder='Repeat password' 
                                rules={
                                    {
                                        required: 'Password must be provided.',
                                        minLength: {
                                            value: 7,
                                            message: 'Password must be at least 7 characters long.'
                                        },
                                        validate: (value) => value === password || 'Passwords must match.'
                                    }
                                } 
                                control={control} 
                                secureTextEntry
                                />
                            
                            <View>
                                <Button onPress={handleSubmit(onSignup)}>Signup</Button>
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