import React, {useState, useEffect} from "react";
import {StyleSheet} from "react-native";
import {Picker} from '@react-native-picker/picker';
import {Controller } from 'react-hook-form';


const CustomPicker = ({selectedValue, name, control, display_name=[], options=[]}) => {

    return (
        <Controller control={control} name={name} defaultValue={selectedValue} 
          render={({ field: { onChange, value } }) => (
            <Picker
              selectedValue={value}
              onValueChange={(itemValue) => onChange(itemValue)}
              >
              { options ? options.map((option) => {
                var d_name = "";
                for (var i = 0; i < display_name.length; i++) {
                    d_name = d_name + " " + option[display_name[i]];
                }
                return <Picker.Item label={d_name} value={option.id} key={option.id} />
              } ) : console.log("Error: "+options) }

            </Picker>
          )}
        />
    )

}

const styles = StyleSheet.create({

})

export default CustomPicker;