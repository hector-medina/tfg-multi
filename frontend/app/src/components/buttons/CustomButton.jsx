import React from "react";
import { Button, ThemeProvider } from '@rneui/themed';

import theme from '../../theme';

const CustomButton = ({onPressed, children}) => {

    return (
        <ThemeProvider theme={theme}>
            <Button onPress={onPressed}>{children}</Button>
        </ThemeProvider>
    );

}

export default CustomButton;