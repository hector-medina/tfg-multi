import React, {useEffect, useState} from "react";
import { View, Text, ScrollView, StyleSheet} from "react-native";
import CustomButton from "../../../../components/buttons/CustomButton";
import { useForm } from 'react-hook-form';
import CustomInput from "../../../../components/forms/CustomInput";
import BasePrivateScreen from "../../BasePrivateScreen";
import CustomPicker from "../../../../components/forms/CustomPicker";
import theme from "../../../../theme";
import { fetchData } from "../../../../api/utils/useFetch";
import { useSelector } from 'react-redux';
import { NormalizeProperty } from "../../../../api/user/property/property";
import ErrorModal from "../../../../components/modals/ErrorModal";
import SuccessModal from "../../../../components/modals/SuccessModal";
import Loading from "../../../../components/loadings/Loading";


const AddPropertyScreen = ({route, navigation}) => {
    const { community_id } = route.params;
    const authToken = useSelector((state) => state.auth.token);
    const user_id = useSelector((state) => state.user.id);
    const { control, handleSubmit, errors } = useForm();
    
    const [modalVisible, setModalVisible] = useState(false);
    const [sucessModalVisible, setSucessModalVisible] = useState(false);
    const [ErrorModalVisible, setErrorModalVisible] = useState(true);
    const [fetchErrors, setFetchErrors] = useState(null);
    const [users, setUsers] = useState();

    const message_creation_successfully = [
        "Your new property has been created successfully."
    ]


    
    useEffect(() => {
        navigation.addListener('focus', () => {
            getData();
        })
    }, []);
    
    
    const getData = async () => {
        try{
            const url = '/accounts/';
            const data = await fetchData({url: url, authToken: authToken});
            console.log(data);
            setUsers(data);
        }
        catch (error){
            console.log(error);
        }
    }
    
    const dissmiss = () => {
      setFetchErrors(null);
    }
    
    const createProperty = async (payload) => { 
        setModalVisible(true);
        try {
            var url = '/properties/';
            payload.neighborhood = community_id;
            const property = NormalizeProperty({data: payload});
            console.log(property);
            var data = await fetchData({url: url, method:'POST', data:property, authToken: authToken});
            console.log(data)         
            setModalVisible(false);
            setSucessModalVisible(true);
        } catch(error) {
            console.log(error);
            setModalVisible(false);
            setErrorModalVisible(true)
            setFetchErrors(error.message);
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
                message={'Your community is processing.'} 
                modalVisible={modalVisible}/>

            <ScrollView>
                <View style={ [theme.components.Card.style, {marginTop: 20}] }>
                        <Text style={ theme.components.Subtitle.style }>Here you can add a new property:</Text>
                        
                        <Text style={ [theme.components.Subtitle.style, styles.field_title] }>Property:</Text>
                        <CustomInput 
                            name='name' 
                            placeholder='Name' 
                            control={control}
                            rules={ 
                                { 
                                    required: "Name of the community is required."
                                } 
                             }/>

                        <Text style={ [theme.components.Subtitle.style, styles.field_title] }>Owner:</Text>
                        <CustomPicker 
                            name='owner' 
                            control={control} 
                            display_name={['first_name', 'last_name', 'email']} 
                            options={users} 
                            selectedValue={user_id}/>
                        
                        <View style={{marginTop: 20}}>
                            <CustomButton size='xs' onPressed={handleSubmit(createProperty)}>Add property</CustomButton>
                        </View>
                </View>
            </ScrollView>
        </BasePrivateScreen>
    );
}

const styles = StyleSheet.create({
    field_title: {marginVertical: 10, alignSelf: 'flex-start'},
    title: {color: 'gray', fontSize: 20, fontWeight: 'bold', marginVertical: 15},
})

export default AddPropertyScreen;