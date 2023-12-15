import React from "react";
import { Text, View, Button } from "react-native";
import { useDispatch } from 'react-redux';

import { removeAuthToken } from "../../../../redux/actions/authActions";

const UserScreen = ({navigation}) => {
   
    const dispatch = useDispatch();

    function logout(){
        dispatch(removeAuthToken());
    }

    return (
        <View>
            <Text>User Screen</Text>
            <Button onPress={logout} title='Logout'/>
        </View>
        
    );

}

export default UserScreen;