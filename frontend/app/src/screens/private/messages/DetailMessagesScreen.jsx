import React, {useEffect, useState, useRef} from "react";
import { Text, StyleSheet, ScrollView , View, TextInput, Platform} from "react-native"
import { useSelector } from 'react-redux';
import CustomButton from "../../../components/buttons/CustomButton";
import Icon from 'react-native-vector-icons/FontAwesome';
import { fetchData } from "../../../api/utils/useFetch";
import theme from "../../../theme";
import { date_parser_day, date_parser_time } from "../../../utils/utils";
import SuccessModal from "../../../components/modals/SuccessModal";
import ConfirmModal from "../../../components/modals/ConfirmModal";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useForm, Controller } from 'react-hook-form';

const DetailMessagesScreen = ({route, navigation}) => {

    const authToken = useSelector((state) => state.auth.token);
    const user_id = useSelector((state) => state.user.id);
    const { chat_id, recipient_display_name } = route.params;

    const { control, handleSubmit, errors , reset} = useForm();
    const [deleteModalVisible, setDeleteModalVisible] = useState(false);
    const [confirmDeleteModalVisible, setConfirmDeleteModalVisible] = useState(false);
    const [chat, setChat] = useState({
        id: 0,
        participants: [],
        last_message: {
            id: 0,
            chat: 0,
            sender: 0,
            recipient: 0,
            content: null,
            timestamp: null
       }
    });

    const message_delete_successfully = [
        "Your chat has been deleted successfully."
    ]

    const scrollViewRef = useRef();
    const [messages, setMessages] = useState([])
    
    useEffect(() => {
        navigation.setOptions({ 
            headerTitle: recipient_display_name,
            headerRight: () => (
                <CustomButton danger size="xs" 
                onPressed={() => {confirmDelete()}}>
                        <Icon style={styles.icon_navbar} name='close'/>
                    </CustomButton>
                ),
            });
    },[authToken, user_id]);

    const deleteChat = async () => {
        try{
            var url = '/chats/'+chat_id+'/';
            const data = await fetchData({url: url, authToken: authToken, method: 'DELETE'});
            console.log(data);
            navigation.goBack();
        }
        catch (error){
            console.log(error);
        }
    }

    useEffect(() => {
        if (user_id !== null && authToken !== null ) {
            getData();
            navigation.addListener('focus', () => {
                getData();
            })  
        }
    }, [user_id, authToken]);

    useEffect(() => {
        scrollViewRef.current.scrollToEnd({ animated: false });
      }, [messages]);

    const getData = async () => {

        try{
            var url = '/chats/'+chat_id+'/';
            const data = await fetchData({url: url, authToken: authToken});
            console.log(data);
            setChat(data);

            url = '/chats/'+chat_id+'/messages/';
            const messages = await fetchData({url: url, authToken: authToken});
            console.log(messages);
            setMessages(messages);
        }
        catch (error){
            console.log(error);
        }
    }

    const confirmDelete = async () => {
        setConfirmDeleteModalVisible(true);
    }

    const sendMessage = async (payload) => {
        
        if(payload.message != undefined){
            const message = {}
            message.content = payload.message;
            message.chat = chat_id;
            message.sender = user_id;
            message.recipient = chat.participants[0].id == user_id ? chat.participants[1].id : chat.participants[0].id;
            reset({ textInput: '' });
            
            var url = '/messages/';
            const data = await fetchData({url: url, method: 'POST', data: message, authToken: authToken});
            console.log(data);
            getData();
        }
    }

    return (
        <KeyboardAwareScrollView
        contentContainerStyle={{flex:1}}
        extraScrollHeight={Platform.OS === 'android' ? 100 : 55}
        resetScrollToCoords={{ x: 0, y: 0 }}
        scrollEnabled={false}
        enableOnAndroid={true}s
        enableAutomaticScroll={Platform.OS === 'ios'}
      >
        <View style={{flex:1}}>
            { deleteModalVisible && 
                <SuccessModal 
                    message={message_delete_successfully} 
                    modalVisible={deleteModalVisible} 
                    onClose={() => {navigation.popToTop()}}/>
            }

            { confirmDeleteModalVisible && 
                <ConfirmModal 
                    entity={'chat with \''+recipient_display_name+'\''} 
                    modalVisible={confirmDeleteModalVisible} 
                    onCancel={() => {setConfirmDeleteModalVisible(false)}}
                    onConfirm={() => {deleteChat()}}/>
            }
            <ScrollView ref={scrollViewRef} style={styles.container}>
                <View>
                {
                    messages.map((message) => {
                        return (
                            <View 
                            key={message.id} 
                            style={
                                [
                                    theme.components.Card.style, 
                                    message.recipient == user_id ? styles.card_recipient : styles.card_sender
                                ]}>
                                <Text style={{fontSize: 18}}>{message.content}</Text>
                                <Text style={{marginTop: 5, fontSize: 14,color: 'gray',alignSelf: 'flex-end'}} >
                                    {date_parser_day(message.timestamp)} {date_parser_time(message.timestamp)}
                                </Text>
                            </View>
                        )
                    })
                }
                </View>

            </ScrollView>
                <View >
                    <View style={{backgroundColor: 'white', paddingHorizontal: 10, flexDirection: 'row'}}>
                    
                    <View style={{flex:1, justifyContent: 'center'}}>

                    <Controller 
                        control={control}
                        name='message'
                        render={( {field: {value, onChange, onBlur}, fieldState: {error}} ) => (
                            
                            <View>
                            <TextInput 
                                style={[styles.textInput]}
                                value={value} 
                                onChangeText={onChange} 
                                onBlur={onBlur}
                                placeholder={'Write a message'}
                                multiline={true}
                                autoCorrect={false}
                                defaultValue={null}
                                />
                        </View>)
                        }
                        />
                        </View>
                            <CustomButton onPressed={handleSubmit(sendMessage)}>
                                <Icon style={{fontSize: 20, padding: 5, color:'white'}} name="send"/>
                            </CustomButton>
                    </View>
                </View>
        </View>
        </KeyboardAwareScrollView>
        );
}

const styles = StyleSheet.create({
    container: {
        marginVertical: 10,
        flex: 0.9,
    },
    icon_navbar:{
        color: 'white',
    },
    card_recipient: {
        backgroundColor: '#c4f2e4',
        marginLeft: 0,
        marginBottom: 5,
    },
    card_sender: {
        marginRight: 0,
        marginBottom: 5,
    },
    textInput: {
        fontSize: 18, 
        backgroundColor: 'white'
    },
});

export default DetailMessagesScreen