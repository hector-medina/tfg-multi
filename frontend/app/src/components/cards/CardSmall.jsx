import React from "react";
import { TouchableWithoutFeedback, View, Text, StyleSheet } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';


import theme from '../../theme';

const CardSmall = ({url=null, url_params=null, title}) => {

    const navigation = useNavigation();

    const navigate = (inner_url) => {
        if (inner_url != null){
            navigation.navigate(inner_url, url_params);
        }
    }

    return (
        <TouchableWithoutFeedback onPress={ () => navigate(url)}>
            <View style={[theme.components.Card.style, styles.card]}>
                <Text style={ styles.title }>{title}</Text>
                { url != null ?  
                    <View style={ styles.icon_container }>
                        <Icon style={theme.components.Subtitle.icon} name='angle-right'/>
                    </View> : null
                }
            </View>
        </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
    card: {justifyContent: 'space-between',flexDirection: 'row', alignItems: 'center',borderRadius: 15, flex: 0.5, marginLeft: 5, marginRight: 5, marginBottom: 0},
    title: { color: 'gray', fontSize: 18, fontWeight: 'bold' },
    icon_container: {marginLeft: 10,justifyContent: 'center'},
});

export default CardSmall;