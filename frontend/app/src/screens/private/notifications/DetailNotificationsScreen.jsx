import React, {useState, useEffect} from "react"
import { Text, StyleSheet, ScrollView, View } from "react-native"
import { useSelector } from "react-redux"
import theme from "../../../theme";
import { fetchData } from '../../../api/utils/useFetch';
import Icon from 'react-native-vector-icons/FontAwesome';
import CustomButton from "../../../components/buttons/CustomButton";
import Loading from "../../../components/loadings/Loading";
import ErrorModal from "../../../components/modals/ErrorModal";
import SuccessModal from "../../../components/modals/SuccessModal";
import ConfirmModal from "../../../components/modals/ConfirmModal";

const DetailNotificationsScreen = ({route, navigation}) => {

    const { notification_id } = route.params;
    const authToken = useSelector((state) => state.auth.token);
    const user_id = useSelector((state) => state.user.id);
    const [modalVisible, setModalVisible] = useState(false);
    const [sucessModalVisible, setSucessModalVisible] = useState(false);
    const [deleteModalVisible, setDeleteModalVisible] = useState(false);
    const [confirmDeleteModalVisible, setConfirmDeleteModalVisible] = useState(false);
    const [ErrorModalVisible, setErrorModalVisible] = useState(true);
    const [fetchErrors, setFetchErrors] = useState(null);
    const [community, setCommunity] = useState({        
        admin: ' ', president: ' ', bank_account: ' ', address: ' ',
        creation_date: ' ', id: 0, name: ' ', properties: []
    })

    const [notification, setNotification] = useState({
        id: '', title: '', description: '', date: '',
        neighborhood: '', community: ''
    });

    useEffect(() => {
        navigation.addListener('focus', () => {
            getData();
        })
    }, []);

    const message_delete_successfully = [
        "Your notification has been deleted successfully."
    ]

    const getData = async () => {
        try{

            var url = '/notifications/'+notification_id+'/';
            const notification_data = await fetchData({url: url, authToken: authToken});
            console.log(notification_data);
            setNotification(notification_data);
            
            url = '/neighborhoods/'+notification_data.neighborhood+'/';
            const community_data = await fetchData({url: url, authToken: authToken});
            console.log(community_data);
            setCommunity(community_data);

        }
        catch (error){
            console.log(error);
        }
    }

    const confirmDeleteNotification = () => {
        setConfirmDeleteModalVisible(true);
    }

    const deleteNotification = async () => {
        setConfirmDeleteModalVisible(false);
        setModalVisible(true);
        try {
            var url = '/notifications/'+notification_id+'/';
            var data = await fetchData({url: url, method:'DELETE', authToken: authToken});
            console.log(data)
            setModalVisible(false);
            setDeleteModalVisible(true);
        } catch(error) {
            console.log(error);
            setModalVisible(false);
            setErrorModalVisible(true)
            setFetchErrors(error.message);
        }
    }
    return (
        <ScrollView style={styles.container}>

        { deleteModalVisible && 
            <SuccessModal 
                message={message_delete_successfully} 
                modalVisible={deleteModalVisible} 
                onClose={() => {navigation.popToTop()}}/>
        }

        { confirmDeleteModalVisible && 
            <ConfirmModal 
                entity={'notification \''+notification.title+'\''} 
                modalVisible={confirmDeleteModalVisible} 
                onCancel={() => {setConfirmDeleteModalVisible(false)}}
                onConfirm={() => {deleteNotification()}}/>
        }

        { fetchErrors != null &&
            <ErrorModal 
                title={'Error'} 
                message={fetchErrors} 
                modalVisible={ErrorModalVisible} 
                onClose={dissmiss}/>
        }

        <Loading 
            title={'Creating'} 
            message={'Your community is processing.'} 
            modalVisible={modalVisible}/>


            <View style={theme.components.Card.style}>
                <View style={{flexDirection: 'row', alignItems: 'baseline', justifyContent: 'center'}}>
                    <Icon style={styles.icon_info} name='info-circle' />
                    <Text style={styles.title}> Notification</Text>
                </View>
                <Text style={ [theme.components.Subtitle.style, styles.subtitle ]}>{ notification.title }</Text>
                <Text style={ [theme.components.Subtitle.style, styles.text] }>{ notification.description }</Text>
                <Text style={ [theme.components.Subtitle.style, styles.subtitle ]}>Neighborhood</Text>
                <Text style={ [theme.components.Subtitle.style, styles.text] }>{ community.name }</Text>
                {
                    community.address != null &&
                    <Text style={ [theme.components.Subtitle.style, styles.text] }>{ community.address }</Text>
                }
            </View>

            {    
                ( community.admin == user_id || community.president == user_id ) &&
                <View style={ [theme.components.Card.style] }>
                    <Text style={ [theme.components.Subtitle.style, styles.danger] }>Danger zone:</Text>

                    <Text style={ [theme.components.Subtitle.style, styles.text] }>Press the following button for deleting your notification:</Text>
                    
                    <View style={styles.button}>
                        <CustomButton size='xs' danger onPressed={confirmDeleteNotification}>Delete notification</CustomButton>
                    </View>
                </View>
            }
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 20
    },
    title:{
        fontSize: 20,
        fontWeight: 'bold',
        alignSelf: 'center'
    },
    subtitle: {
        marginVertical: 10,
        alignSelf: 'flex-start'
    },
    text: {
        fontSize: 16
    },
    icon_info: {
        fontSize: 40, 
        color: '#4BC29C'
    },
    text: {alignSelf: 'flex-start', fontWeight: 'normal'},
    button: {marginTop: 20},
    danger: {
        color: '#dc3545',
        marginBottom: 20
    } 
});

export default DetailNotificationsScreen;