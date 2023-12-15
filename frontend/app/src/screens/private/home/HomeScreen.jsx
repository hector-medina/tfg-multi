import React from "react";
import { Button } from "react-native";
import { useSelector } from 'react-redux';

import { fetchData } from '../../../api/utils/useFetch';

const HomeScreen = () => {

    const authToken = useSelector((state) => state.auth.token);

    const getData = async () => {
        try{
            const url = '/accounts/';
            const data = await fetchData({url: url, authToken: authToken});
            console.log(data);
        }
        catch (error){
            console.log(error);
        }
    }
   
    return (
        <Button onPress={getData} title="GET DATA"/>
    );

}

export default HomeScreen;