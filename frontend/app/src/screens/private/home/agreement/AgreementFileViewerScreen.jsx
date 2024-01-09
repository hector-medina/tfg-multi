import React from "react";
import { StyleSheet } from "react-native";  
import { WebView } from 'react-native-webview';

const AgreementFileViewerScreen = ({route, navigation}) => {
    const {file_url} = route.params;
    const filename = decodeURIComponent(file_url.substring(file_url.lastIndexOf('/') + 1));

    return (
        <WebView
            source={{ uri: file_url }} 
        />
    )
}

const style = StyleSheet.create({})

export default AgreementFileViewerScreen;
