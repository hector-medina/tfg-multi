import React from "react";
import { Text } from "react-native";

const AccountScreen = ({route, navigations}) => {

    const {bankaccount_id} = route.params;

    return (
        <Text>AccountScreen {bankaccount_id}</Text>
    );
}

export default AccountScreen;