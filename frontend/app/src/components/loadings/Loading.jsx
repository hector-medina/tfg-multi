import React from "react";
import { Text, Modal, StyleSheet, View, ActivityIndicator } from 'react-native';

import theme from "../../theme";

const Loading = ({title, message, modalVisible = true}) => {

    return (
        <View>
            <Modal transparent={true} visible={modalVisible}>
                <View style={styles.card_container}>
                    <View style={[theme.components.Card.style]}>
                    {title && <Text style={[theme.components.Subtitle.style, styles.title]}>{title}</Text>}
                    {message && <Text style={styles.text}>{message}</Text>}
                    <ActivityIndicator  size="large" color={theme.lightColors.primary} />
                    </View>
                </View>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    card_container: {
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center', 
        alignItems: 'center',
        flex: 1
    },
    title:{
        marginBottom: 10,
    },
    text: {
        marginVertical: 10,
        fontSize: 16,
    }
});

export default Loading;