import React from "react";
import { Keyboard, KeyboardAvoidingView, TouchableWithoutFeedback } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';


const BasePrivateScreen = ({children}) => {

    return (
        <SafeAreaProvider>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <KeyboardAvoidingView style={{ flex: 1 }} behavior='padding'>
                    {children}
                </KeyboardAvoidingView>
            </TouchableWithoutFeedback>
        </SafeAreaProvider>
    );

}

export default BasePrivateScreen;