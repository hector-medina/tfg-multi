import React from "react";
import { Text, Modal, StyleSheet, View } from 'react-native';

import theme from "../../theme";
import CustomButton from "../buttons/CustomButton";

const SuccessModal = ({message=[], modalVisible = true, onClose}) => {

    return (
        <View>
            <Modal transparent={true} visible={modalVisible} onRequestClose={() => onClose()}>
                <View style={styles.card_container}>
                    <View style={[theme.components.Card.style]}>
                    <Text style={[theme.components.Subtitle.style, styles.title]}>Success!</Text>
                    {message.map((paragraph, index) => {
                        return (
                            <View style={styles.text_container} key={index}>
                                <Text style={[styles.text]}>{paragraph}</Text>
                            </View>
                        );
                    })
                    }
                    <View style={ styles.button_container}>
                        <CustomButton size='xs' onPressed={() => onClose()}>Got it</CustomButton>
                    </View>
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
    text_container: {
        flexDirection: 'row'
    },
    text: {
        marginVertical: 10,
        fontSize: 16,
        fontWeight: 'normal',
        color: 'black'   
    },
    button_container: {
        marginTop: 10
    }
});

export default SuccessModal;