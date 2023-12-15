import React from "react";
import {Text, View, StyleSheet} from 'react-native';
import { Button } from '@rneui/themed';
import { useForm } from 'react-hook-form';

import theme from '../../theme';
import CustomInput from "../../components/forms/CustomInput";


const ForgotPasswordScreen = () => {

    const { control, handleSubmit, errors } = useForm();

    return (
        <View style={[theme.components.Card.style, styles.card]}>
            <Text style={theme.components.Subtitle.style}>Forgot password?</Text>
            <Text style={styles.text}>
                In order to reset your password you need to provide us your email. 
                You will receive an email with further steps.
            </Text>
            <CustomInput name='email' placeholder='Email' control={control}  keyboardType='email-address' ></CustomInput>
            <View>
                <Button onPress={handleSubmit(null)}>Reset password</Button>
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

export default ForgotPasswordScreen;