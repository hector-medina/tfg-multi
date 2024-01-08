import React from "react";
import { StyleSheet } from 'react-native';
import { Button, ThemeProvider } from '@rneui/themed';

import theme from '../../theme';

const CustomButton = ({onPressed, size='xl', cancel=false, danger=false, children}) => {

    return (
        <ThemeProvider theme={theme}>
            { size == 'xl' ? <Button onPress={onPressed}>{children}</Button> : null }
            { size == 'xs' ? <Button titleStyle={ styles.title_xs } buttonStyle={ [styles.button_xs, danger && styles.danger, cancel && styles.cancel]} onPress={onPressed}>{children}</Button> : null }
        </ThemeProvider>
    );

}

const styles = StyleSheet.create({
    title_xs: {
        fontSize: 15,
        paddingHorizontal: 10,
        paddingVertical: 0,
        margin: 0,
    },
    button_xs: {
        marginBottom: 0,
        marginTop: 0,
    },
    danger: {
        backgroundColor: '#dc3545',
        borderColor: '#dc3545',
    },
    cancel: {
        backgroundColor: '#A9AAA9',
        borderColor: '#6c757d',
    }
}); 

export default CustomButton;