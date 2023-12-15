import React, { useState } from 'react';
import { StyleSheet, ImageBackground, TouchableWithoutFeedback, Text, View } from 'react-native';
import { Button, ThemeProvider } from '@rneui/themed';
import { useForm } from 'react-hook-form';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useDispatch } from 'react-redux';

import BasePublicScreen from './BasePublicScreen';
import CustomInput from '../../components/forms/CustomInput';  
import theme from '../../theme';
import Loading from '../../components/loadings/Loading';
import Link from '../../components/links/Link';
import { fetchData } from '../../api/utils/useFetch';
import { NormalizeLogin } from '../../api/login/login';
import ErrorModal from '../../components/modals/ErrorModal';
import { setAuthToken } from './../../../redux/actions/authActions';

const image = './../../../assets/images/form_background.png';

const LoginScreen = ({navigation}) => {

    const { control, handleSubmit, errors } = useForm();

    const [modalVisible, setModalVisible] = useState(false);
    const [ErrorModalVisible, setErrorModalVisible] = useState(false);
    const [fetchErrors, setFetchErrors] = useState(null);

    const dispatch = useDispatch();

    // Close error modal on pressed
    const closeModal = () => {
        setErrorModalVisible(false);
    };

    const onLogin = async (payload) => {  
        setModalVisible(true);
        const user = NormalizeLogin({data: payload});
        try {
            const url = '/login/';
            const data = await fetchData({url: url, data: user, method:'POST',auth: false});
            setModalVisible(false);
            dispatch(setAuthToken(data.token));
          } catch (error) {
            console.log(error.message);
            console.log(error);
            setModalVisible(false);
            setErrorModalVisible(true)
            setFetchErrors(error.message);
        }
    }

    return (
       <BasePublicScreen>
            <ThemeProvider theme={theme}>
                { fetchErrors != null && <ErrorModal title={'Error'} message={fetchErrors} modalVisible={ErrorModalVisible} onClose={closeModal}/>}
                <Loading title={'Login'} message={'Logging in the system.'} modalVisible={modalVisible}/>
                <View style={styles.image_container}>
                    <ImageBackground source={require(image)} resizeMode="cover" style={styles.image}>
                        <Text style={theme.components.Title.style}>COMMUNITY</Text>
                    </ImageBackground>
                </View>
                <View style={styles.form_container}>
                    <View style={[theme.components.Card.style, styles.card]}>
                        <View style={styles.subtitle_container}>
                        <TouchableWithoutFeedback onPress={()=> navigation.goBack()}><Icon style={theme.components.Subtitle.icon} name='angle-left'/></TouchableWithoutFeedback>
                        <Text style={[theme.components.Subtitle.style, {flex: 1, textAlign: 'center', marginRight: 30}]}>Welcome to Community</Text>
                        </View>
                        <CustomInput name='username' placeholder='Username' control={control} keyboardType='ascii-capable'></CustomInput>
                        <CustomInput name='password' placeholder='Password' control={control} secureTextEntry ></CustomInput>
                        <View>
                            <Button onPress={handleSubmit(onLogin)}>Login</Button>
                            <Link onPressed={()=> navigation.navigate('forgotpassword')}>Forgot password?</Link>
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
        marginTop: -50, 
    }
});


export default LoginScreen;