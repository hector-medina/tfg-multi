import React from "react";
import { TouchableWithoutFeedback, View, Text, StyleSheet } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';


import theme from '../../theme';

const CardSmall = ({url, title}) => {

    const navigation = useNavigation();

    return (
        <TouchableWithoutFeedback onPress={ () => navigation.navigate(url)}>
            <View style={[theme.components.Card.style, styles.card]}>
            <Text style={ styles.title }>{title}</Text>
            <View style={ styles.icon_container }>
                    <Icon style={theme.components.Subtitle.icon} name='angle-right'/>
                </View>
            </View>
        </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
    card: {justifyContent: 'space-between',flexDirection: 'row', alignItems: 'center',borderRadius: 15, flex: 0.5, marginLeft: 5, marginRight: 5, marginBottom: 20},
    title: { color: 'gray', fontSize: 18, fontWeight: 'bold' },
    icon_container: {marginLeft: 10,justifyContent: 'center'},
});

export default CardSmall;