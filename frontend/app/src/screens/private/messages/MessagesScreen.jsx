import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, Modal, ScrollView, Image} from "react-native";
import { useSelector } from 'react-redux';
import theme from "./../../../../src/theme";
import { fetchData } from "../../../api/utils/useFetch";
import CustomButton from "../../../components/buttons/CustomButton";
import CardImage from "../../../components/cards/CardImage";
import Icon from 'react-native-vector-icons/FontAwesome';
import CustomPicker from "../../../components/forms/CustomPicker";
import { useForm } from 'react-hook-form';

const MessagesScreen = ({navigation}) => {

    const image = './../../../../assets/images/user/default_profile_pic.png';

    const authToken = useSelector((state) => state.auth.token);
    const user_id =  useSelector((state) => state.user.id);

    const [listUsersModal, setListUsersModal] = useState(false)    
    const [user, setUser] = useState({        
        first_name: ' ', last_name: ' ', id: ' ',
        email: ' ', phone: ' ', address: ' ',
        dni: ' ', city: ' ', properties: [], communities: [], image: null, chats:[]
    });

    const [users, setUsers] = useState([]);

    const { control, handleSubmit, errors } = useForm();

    useEffect(() => {
        navigation.setOptions({ 
            headerRight: () => (
                <CustomButton navbar size="xs" 
                onPressed={() => {setListUsersModal(true)}}>
                        <Icon style={styles.icon_navbar} name='angle-down'/>
                    </CustomButton>
                ),
            });
    },[]);

    useEffect(() => {
        if (user_id !== null && authToken !== null ) {
            getData();
            navigation.addListener('focus', () => {
                getData();
            })  
        }
    }, [user_id, authToken]);

    const getData = async () => {

        try{
            var url = '/accounts/'+user_id+'/';
            const data = await fetchData({url: url, authToken: authToken});
            console.log(data);
            setUser(data);
        }
        catch (error){
            console.log(error);
        }
        getUsers();
    }

    const selectUser = async (payload) => {
        try{
            var url = '/chats/';
            if(!Number.isInteger(payload.selectedUser)){
                throw new Error('You have to select a user '+payload.selectedUser+' is not a valid user');
            }
            const chat = {}
            chat.participants = [{"id": user_id}, {"id":payload.selectedUser}];
            console.log(chat);
            const data = await fetchData({url: url, method:'POST', data:chat, authToken: authToken});
            console.log(data);
            setUser(data);
            setListUsersModal(false)
            var index = data.participants[0].id == user_id ? 1 : 0;
            const recipient_display_name = data.participants[index].first_name != '' ? data.participants[index].first_name + " " +data.participants[index].last_name : data.participants[index].username;
            navigation.navigate('detailmessages', {'chat_id': data.id, 'recipient_display_name':  recipient_display_name})
        } catch(error){
            console.log(error);
            setListUsersModal(false)
        }
    }

    const getUsers = async () => {
        try{
            var url = '/accounts/';
            const data = await fetchData({url: url, authToken: authToken});
            console.log(data);
            var data_without_current_user = data.filter(function(objeto) {
                return objeto.id !== user_id;
              });
            setUsers(data_without_current_user);
        }
        catch (error){
            console.log(error);
        }
    }

    return (
        <ScrollView style={styles.messages_container}>

            {
                users.length != 0 &&
                <Modal transparent={true} visible={listUsersModal} onRequestClose={() => {setListUsersModal(false)}}>
                    <View style={styles.modal_container}>
                        <View style={[theme.components.Card.style, {width: '90%'}]}>
                            <Text style={ theme.components.Subtitle.style }>Users:</Text>
                            <Text style={ styles.text }>Select a user to start talking with.</Text>
                            <CustomPicker control={control} name={'selectedUser'} selectedValue={users[0].id} display_name={['id','first_name','last_name', 'username']} options={users}/>
                            <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                                <CustomButton size='xs' cancel title={'Cerrar'} onPressed={() => {setListUsersModal(false)}}>Cancel</CustomButton>
                                <CustomButton size='xs' title={'Cerrar'} onPressed={handleSubmit(selectUser)}>Select</CustomButton>
                            </View>
                        </View>
                    </View>   
                </Modal>
            }

            {
                user.chats != undefined && user.chats.length != 0 ? user.chats.map((chat) => {

                participant = chat.participants[0].id == user_id ? chat.participants[1] : chat.participants[0];            
                recipient_display_name = participant != undefined && participant.first_name != '' ? participant.first_name + " " +participant.last_name : participant.username;

                return (

                    <CardImage 
                        image={participant.image}
                        title={recipient_display_name}
                        description={chat.last_message ? chat.last_message.content : null}
                        timestamp={chat.last_message ? chat.last_message.timestamp : null}
                        url='detailmessages'
                        url_options={{'chat_id': chat.id, 'recipient_display_name': recipient_display_name}}
                        id={chat.id}
                        key={chat.id}
                        navigation={navigation}
                    />
                    );
                })
                
                : null
            }
            
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    messages_container: {
        paddingVertical: 20,
        paddingHorizontal: 20,
    },
    icon_navbar: {
        fontSize: 18, 
        color: '#4BC29C'
    },
    modal_container: {
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center', 
        alignItems: 'center',
        flex: 1
    },
    text: {
        marginTop: 20, 
        alignSelf: 'center', 
        fontWeight: 'normal'
    },
});

export default MessagesScreen;