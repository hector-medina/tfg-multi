import React from 'react';
import { View, TextInput, StyleSheet} from 'react-native';
import { Controller } from 'react-hook-form';


const CustomInput = ({control, name, placeholder, secureTextEntry=false, keyboardType='default'}) => {

    return (
      <View>
        <Controller 
            control={control}
            name={name}
            render={( {field: {value, onChange, onBlur}} ) => (
                <TextInput 
                    style={styles.textInput}
                    value={value} 
                    onChangeText={onChange} 
                    onBlur={onBlur}
                    placeholder={placeholder}
                    secureTextEntry={secureTextEntry}
                    keyboardType={keyboardType}
                />)
            }
        />
      </View>
    );

}

const styles = StyleSheet.create({
    textInput: {
        fontSize: 18, 
        paddingVertical: 20, 
        borderBottomColor: '#f2f2f2', 
        borderBottomWidth: 2  
    },
});

export default CustomInput;