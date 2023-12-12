import React from "react";
import { Text, Modal, StyleSheet, View } from 'react-native';

import theme from "../../theme";
import CustomButton from "../buttons/CustomButton";
import { Colors } from "react-native/Libraries/NewAppScreen";

const Loading = ({title, message={}, modalVisible = true, onClose}) => {

    const message_json = JSON.parse(message);

    console.log(message_json);

    return (
        <View>
            <Modal transparent={true} visible={modalVisible} onRequestClose={() => onClose()}>
                <View style={styles.card_container}>
                    <View style={[theme.components.Card.style]}>
                    {title && <Text style={[theme.components.Subtitle.style, styles.title]}>{title}</Text>}
                    {message && Object.keys(message_json).map((key) => {
                        const item = message_json[key];
                        return (
                            <View>
                                <Text style={ theme.components.Link.style}>{key.charAt(0).toUpperCase() + key.slice(1)}:
                                    <Text style={[styles.text]}> {item}</Text>
                                </Text>
                            </View>
                        );
                    })}
                    <CustomButton onPressed={() => onClose()}>Dismiss</CustomButton>
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
        fontWeight: 'normal',
        color: 'black'
    }
});

export default Loading;