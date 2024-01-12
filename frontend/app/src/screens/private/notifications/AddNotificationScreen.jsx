import React, { useState, useEffect } from "react";
import { useSelector } from 'react-redux';
import { View, Text, ScrollView, StyleSheet } from "react-native";
import { useForm } from 'react-hook-form';
import CustomButton from "../../../components/buttons/CustomButton";
import CustomInput from "../../../components/forms/CustomInput";
import BasePrivateScreen from "../BasePrivateScreen";
import Loading from "../../../components/loadings/Loading";
import ErrorModal from "../../../components/modals/ErrorModal";
import { fetchData } from '../../../api/utils/useFetch';
import theme from "../../../theme";
import SuccessModal from "../../../components/modals/SuccessModal.jsx";
import CustomPicker from "../../../components/forms/CustomPicker";

const AddNotificationScreen = ({navigation}) => {

    const authToken = useSelector((state) => state.auth.token);
    const user_id =  useSelector((state) => state.user.id);

    const { control, handleSubmit, errors } = useForm();
    const [modalVisible, setModalVisible] = useState(false);
    const [sucessModalVisible, setSucessModalVisible] = useState(false);
    const [ErrorModalVisible, setErrorModalVisible] = useState(true);
    const [fetchErrors, setFetchErrors] = useState(null);
    const [communities, setCommunities] = useState([])

    const message_creation_successfully = [
        "Your notification has been created successfully.",
    ]

    const dissmiss = () => {
        setFetchErrors(null);
    }
    
    const createNotification = async (payload) => { 
        console.log(payload);
        setModalVisible(true);
        try {
            var url = '/notifications/';
            var data = await fetchData({url: url, method:'POST', data:payload, authToken: authToken});
            console.log(data)
            setModalVisible(false);
            setSucessModalVisible(true);
        } catch(error) {
            console.log(error)
            setModalVisible(false);
            setErrorModalVisible(true)
            setFetchErrors(error.message);
        }
    }

    useEffect(() => {
        if (user_id !== null && authToken !== null ) {
            getData(); 
        }
    }, [user_id, authToken]);

    const getData = async () => {

        try{
            var url = '/accounts/'+user_id+'/communities-manager/';
            const data = await fetchData({url: url, authToken: authToken});
            console.log(data);
            setCommunities(data);
        }
        catch (error){
            console.log(error);
        }
    }


    return (
        <BasePrivateScreen>
        { sucessModalVisible && 
            <SuccessModal 
                message={message_creation_successfully} 
                modalVisible={sucessModalVisible} 
                onClose={() => {navigation.goBack()}}/>
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
            message={'Your notification is being processed.'} 
            modalVisible={modalVisible}/>

        <ScrollView>
            <View style={ [theme.components.Card.style, styles.title] }>
                <Text style={ theme.components.Subtitle.style }>Here you can add a new notification:</Text>

                <CustomInput name='title' 
                            placeholder='Title' 
                            rules={ 
                                { 
                                    required: "Title of the notification is required."
                                } 
                            }
                            control={control}/>

                <CustomInput name='description' 
                            placeholder='Description' 
                            rules={ 
                                { 
                                    required: "Description of the notification is required."
                                } 
                            }
                            numberOfLines={10}
                            multiline
                            control={control}/>

                {  
                    communities.length != 0 &&
                    <CustomPicker 
                            name='neighborhood' 
                            control={control} 
                            display_name={['id', 'name',]} 
                            options={communities} 
                            selectedValue={communities[0] != null ? communities[0].id : 0} />
                    }      
                <View style={styles.button}>
                    <CustomButton size='xs'  onPressed={handleSubmit(createNotification)}>Add notification</CustomButton>
                </View>
                </View>
            </ScrollView>
            </BasePrivateScreen>
    );
}

const styles = StyleSheet.create({
    title:{
        marginTop: 20
    },
    button: {
        marginTop: 20
    }
});

export default AddNotificationScreen;