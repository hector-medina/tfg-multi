import React from "react";
import {Text, TouchableWithoutFeedback} from 'react-native';
import { ThemeProvider } from '@rneui/themed';  

import theme from '../../theme';

const Link = ({onPressed,children}) => {

    return (
        <ThemeProvider theme={theme}>
            <TouchableWithoutFeedback onPress={onPressed}>
                <Text style={theme.components.Link.style}>
                    {children}
                </Text>
            </TouchableWithoutFeedback>
        </ThemeProvider>
    );

}

export default Link;