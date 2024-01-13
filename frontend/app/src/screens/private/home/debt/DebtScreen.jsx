import React, { useEffect, useState } from "react";
import { LogBox, Text, FlatList, StyleSheet, ScrollView, Modal, View } from "react-native";
import { useSelector } from 'react-redux';
import { fetchData } from "../../../../api/utils/useFetch";
import CustomButton from "../../../../components/buttons/CustomButton";
import Icon from 'react-native-vector-icons/FontAwesome';
import theme from "../../../../theme";
import CustomPicker from "../../../../components/forms/CustomPicker";
import { useForm } from 'react-hook-form';
import CardMedium from "../../../../components/cards/CardMedium";
import ErrorModal from "../../../../components/modals/ErrorModal";
import CardLargeMinimal from "../../../../components/cards/CardLargeMinimal";
import CardSmall from "../../../../components/cards/CardSmall";

const DebtScreen = ({route, navigation}) => {
    LogBox.ignoreAllLogs()
    const {bankaccount_id, community_id} = route.params;
    const authToken = useSelector((state) => state.auth.token);
    const user_id =  useSelector((state) => state.user.id);
    const [bankAccount, setBankAccount] = useState({
        id: 0, number: '', balance: 0.00, income: 0.00, expenses: 0.00, 
        total_debt: 0.00, increased_debt: 0.00, decreased_debt: 0.00, debts: []});
    const [community, setCommunity] = useState({
        id: 0, name: '', admin: 0, president: 0});
    const [debts, setDebts] = useState([]);

    useEffect(() => {
        if (user_id !== null && authToken !== null ) {
            getData();
            navigation.addListener('focus', () => {
                getData();
            })  
        }
    }, [user_id, authToken])

    const getData = async () => {

        try{
            var url = '/bankaccounts/'+bankaccount_id+'/';
            const data = await fetchData({url: url, authToken: authToken});
            console.log(data);
            setBankAccount(data);
            
            url = '/neighborhoods/'+community_id+'/';
            const data_community = await fetchData({url: url, authToken: authToken});
            console.log(data_community);
            setCommunity(data_community);
        }
        catch (error){
            console.log(error);
        }
    }

    const Separador = () => (
        <View
          style={{
            height: 1,
            backgroundColor: '#ccc',
            marginVertical: 5, 
          }}
        />
      );

      const itemList = ({item}) => {
        return (
            <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <View>
                <Text style={styles.description}>{item.description}</Text>
                <Text style={styles.data}> {item.transaction_date}</Text>
            </View>
            <View style={{justifyContent: 'center'}}>
                <Text style={[styles.amount_positive, item.amount >= 0 && styles.amount_negative]}> € {item.amount}</Text>
            </View>
         </View>
        );
      }

    return (
        <ScrollView>
            <CardLargeMinimal 
                balance={bankAccount.total_debt.toFixed(2).toString()} 
                income={bankAccount.decreased_debt.toFixed(2).toString()}
                expenses={bankAccount.increased_debt.toFixed(2).toString()} 
                />
            <View style={{flexDirection: 'row',justifyContent: 'space-between', alignItems: 'center',marginHorizontal: 20, marginBottom: 20}}>
                <Text style={{color: 'gray', fontWeight: 'bold', fontSize: 20}}>Debts</Text>
                {(user_id == community.admin || user_id == community.president )?
                 <CustomButton onPressed={() => {navigation.navigate('adddebt', {bankaccount_id: bankaccount_id})}} size='xs'>add</CustomButton>
                 : null
                }
            </View>

            <View style={[theme.components.Card.style, styles.card]}>            
                {
                    bankAccount.debts.length != 0?
                    <FlatList
                        data={bankAccount.debts}
                        renderItem={itemList}
                        keyExtractor={item => item.id}
                        ItemSeparatorComponent={Separador}
                        />
                    : <Text style={styles.text}>There is no debts in this account</Text>
                }
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    card:{
        marginHorizontal: 10,
        borderRadius: 15, 
    },
    description: {
        color: 'black',
        fontSize: 16,
        fontWeight: 'bold'
    },
    amount_positive: {
        color: 'green',
        fontSize: 16,
        fontWeight: 'bold'
    },
    amount_negative: {
        color: 'red',
        fontSize: 16,
        fontWeight: 'bold'
    },
    text: {
        fontSize: 16,
        alignSelf: 'flex-start',
        fontWeight: 'normal'
    },
});

export default DebtScreen;