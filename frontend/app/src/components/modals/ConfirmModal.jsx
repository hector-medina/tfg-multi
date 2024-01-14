import React from "react";
import { Text, Modal, StyleSheet, View } from 'react-native';

import theme from "../../theme";
import CustomButton from "../buttons/CustomButton";

const ConfirmModal = ({entity, modalVisible = true, onCancel, onConfirm}) => {

    return (
        <View>
            <Modal transparent={true} visible={modalVisible} onRequestClose={() => onClose()}>
                <View testID="confirm-modal" style={styles.card_container}>
                    <View style={[theme.components.Card.style]}>
                    <Text style={[theme.components.Subtitle.style, styles.title]}>Warning!</Text>
                        <View style={styles.text_container}>
                            <Text style={[styles.text]}>You are about to delete the  
                            <Text style={{fontWeight: 'bold'}}> {entity}</Text>. 
                            Are you sure?
                            </Text>
                        </View>
                    <View style={ styles.button_container}>
                        <CustomButton size='xs' cancel onPressed={() => onCancel()}>Cancel</CustomButton>
                        <CustomButton size='xs' danger onPressed={() => onConfirm()}>Confirm</CustomButton>
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
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 10
    }
});

export default ConfirmModal;