import React from "react";
import { Button } from "react-native";
import { fetchData } from '../../../api/utils/useFetch';

const HomeScreen = () => {

    
    const getData = async () => {
        try{
            const url = '/accounts/';
            const data = await fetchData({url: url});
            console.log('esto es el data');
            console.log(data);
        }
        catch (error){
        }
    }
   
    return (
        <Button onPress={getData} title="GET DATA"/>
    );

}

export default HomeScreen;