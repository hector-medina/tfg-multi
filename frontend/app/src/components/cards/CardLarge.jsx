import React from "react";
import { TouchableWithoutFeedback, View, Text, StyleSheet } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';

import theme from '../../theme';

const CardLarge = ({url, title, currency='€', balance, account_number=null, income='00.00', expenses='00.00'}) => {
    
    const navigation = useNavigation();

    return (
        <TouchableWithoutFeedback onPress={ () => navigation.navigate(url)}>
            <View style={[theme.components.Card.style, styles.card]}>
                <View style={ styles.card_inner_container }>
                    <View style={ styles.card_main_data_container }>
                        <Text style={ styles.subtitle }>{title}</Text>
                        <View style={ styles.balance_container }>
                            <Text style={ styles.currency }>{currency} </Text>
                            <Text style={ styles.balance_int }>{balance.split('.')[0]}</Text>
                            <Text style={ styles.balance_cents }>.{balance.split('.')[1]}</Text>
                        </View>
                        <Text style={ styles.account_number }> {account_number && '.... '+account_number}</Text>
                    </View>
                    <View style={ styles.movement_container}>
                        <View style={ styles.movement_inner_container}>
                            <View style={ styles.income }>
                                <Text style={ styles.income_currency }>{currency} </Text>
                                <Text style={ styles.income_money_int }>{income.split('.')[0]}</Text>
                                <Text style={ styles.income_money_cents }>.{income.split('.')[1]}</Text>
                            </View>
                            <View style={ styles.expenses }>
                                <Text style={ styles.expenses_currency }>{currency} </Text>
                                <Text style={ styles.expenses_int }>{expenses.split('.')[0]}</Text>
                                <Text style={ styles.expenses_cents }>.{expenses.split('.')[1]}</Text>
                            </View>
                        </View>
                        <View style={ styles.icon_conteiner}>
                            <Icon style={theme.components.Subtitle.icon} name='angle-right'/>
                        </View>
                    </View>
                </View>
            </View>
        </TouchableWithoutFeedback>
    );

}

const styles = StyleSheet.create({
    subtitle: { color: 'gray', fontSize: 18, fontWeight: 'bold' },
    card: { borderRadius:15, marginBottom: 20 },
    card_inner_container: { flex: 1, flexDirection: 'row' },
    card_main_data_container: { flex: 0.6 },
    balance_container: {flexDirection:'row', alignItems: 'baseline', marginLeft: 5},
    currency: { color: 'black', fontSize: 16, fontWeight: 'bold' },
    balance_int: { color: 'black', fontSize: 22, fontWeight: 'bold' },
    balance_cents: { color: 'black', fontSize: 16, fontWeight: 'bold'},
    account_number: { color: 'gray', fontSize: 16, marginLeft: 10, marginVertical:5},
    movement_container: { flex: 0.4, justifyContent:'flex-end' ,flexDirection: 'row', },
    movement_inner_container: {justifyContent: 'center'},
    income: {flexDirection: 'row', alignItems: 'baseline', marginVertical: 2.5},
    income_currency: { color: 'green', fontWeight: '700', fontSize: 13},
    income_money_int: { color: 'green', fontWeight: '700', fontSize: 18},
    income_money_cents: { color: 'green', fontWeight: '700', fontSize: 15},
    expenses: {flexDirection: 'row', alignItems: 'baseline', marginVertical: 2.5},
    expenses_currency: { color: 'red', fontWeight: '700', fontSize: 13},
    expenses_int: { color: 'red', fontWeight: '700', fontSize: 18},
    expenses_cents: { color: 'red', fontWeight: '700', fontSize: 15},
    icon_conteiner: {marginLeft: 10,justifyContent: 'center'},
});

export default CardLarge;