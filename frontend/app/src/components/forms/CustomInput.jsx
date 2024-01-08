import React from 'react';
import { View, TextInput, Text, StyleSheet} from 'react-native';
import { Controller } from 'react-hook-form';


const CustomInput = ({editable=true, control, name, rules={}, placeholder, secureTextEntry=false, keyboardType='default'}) => {

    return (
      <View>
        <Controller 
            control={control}
            name={name}
            rules={rules}
            render={( {field: {value, onChange, onBlur}, fieldState: {error}} ) => (

                <View>
                    <TextInput 
                        style={[styles.textInput, error && styles.textInputError, !editable && styles.not_editable]}
                        value={value} 
                        onChangeText={onChange} 
                        onBlur={onBlur}
                        placeholder={placeholder}
                        secureTextEntry={secureTextEntry}
                        keyboardType={keyboardType}
                        autoCorrect={false}
                        editable = {editable}
                        />
                    { error && 
                        (<Text style={styles.textError}>
                            {error.message || 'Error'}
                        </Text>)
                    }
                </View>)
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
    textInputError: {
        borderBottomColor: 'red',
    },
    textError: {
        color: 'red',
    },
    not_editable: {
        color: '#b2b2b2'
    }
});

export default CustomInput;