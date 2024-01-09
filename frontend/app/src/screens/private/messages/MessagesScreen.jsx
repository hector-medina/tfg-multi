import React from "react";
import { Text, View } from "react-native";
import { useSelector } from 'react-redux';

const MessagesScreen = ({navigation}) => {
    const authToken = useSelector((state) => state.auth.token);
    const user_id =  useSelector((state) => state.user.id);
    const community_id = useSelector((state) => state.community.id);
    return (
        <View>
            <Text>Messages screen {user_id}</Text>
            <Text>Messages screen {authToken}</Text>
            <Text>Messages screen {community_id}</Text>
        </View>
    );

}

export default MessagesScreen;