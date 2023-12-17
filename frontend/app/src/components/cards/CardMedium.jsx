import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import theme from '../../theme';

const CardMedium = ({title='', texts=[]}) => {

    return (
        <View style={[theme.components.Card.style, styles.card]}>
            <Text style={theme.components.Subtitle.style}>{title}</Text>

            {
                texts.map( (t) => {
                    return  <Text style={styles.text}>{t}</Text>;
                })

            }
  
        </View>
    );

}

const styles = StyleSheet.create({
    card: {
        marginTop: 25,
    },
    text: {
        marginVertical: 10,
        fontSize: 16,
    }
});

export default CardMedium;