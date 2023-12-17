import React from "react";
import { StyleSheet, View, Text, ScrollView,TouchableWithoutFeedback } from "react-native";
import { useSelector } from 'react-redux';

import { fetchData } from '../../../api/utils/useFetch';
import CardLarge from "../../../components/cards/CardLarge";
import CardSmall from "../../../components/cards/CardSmall";

const HomeScreen = ({navigation}) => {

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
        <ScrollView>
             <View>
                <Text style={ styles.title }>Finance</Text>
                <CardLarge 
                    url={'account'} 
                    title='Account' 
                    balance={'1064.87'} 
                    income={'240.00'} 
                    expenses={'-97.11'} 
                    account_number={'2366'}
                />

                <CardLarge 
                    url={'account'} 
                    title='Debts' 
                    balance={'260.00'} 
                    income={'40.00'} 
                    expenses={'-180.00'}
                />
            </View>
            
            <View>
                <Text style={styles.title}>Reports</Text>
                <View style={ styles.small_card_container }>
                    <CardSmall url={'account'} title={'Agreements'}/>
                    <CardSmall url={'account'} title={'Incidents'}/>
                </View>
                <View style={ styles.small_card_container }>
                    <CardSmall url={'account'} title={'Invoices'}/>
                    <CardSmall url={'account'} title={'Budgets'}/>
                </View>
            </View>
            <View>
                <Text style={ styles.title }>Announcements</Text>
                <View style={ styles.small_card_container }>
                    <CardSmall url={'account'} title={'Notifications'}/>
                    <CardSmall url={'account'} title={'Polls'}/>
                </View>
            </View>
        </ScrollView>
    );

}

const styles = StyleSheet.create({
    title: {color: 'gray', fontSize: 25, fontWeight: 'bold', marginVertical: 10, marginHorizontal: 25},
    small_card_container: {flexDirection: 'row', marginHorizontal: 20},
});

export default HomeScreen;