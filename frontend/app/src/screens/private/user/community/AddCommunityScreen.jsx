import React, { useState } from "react";
import { useSelector } from 'react-redux';
import { View, Text, ScrollView, StyleSheet } from "react-native";
import { useForm } from 'react-hook-form';
import CustomButton from "../../../../components/buttons/CustomButton";
import CustomInput from "../../../../components/forms/CustomInput";
import BasePrivateScreen from "../../BasePrivateScreen";
import Loading from "../../../../components/loadings/Loading";
import ErrorModal from "../../../../components/modals/ErrorModal";
import { fetchData } from '../../../../api/utils/useFetch';
import { NormalizeBankAccount } from "../../../../api/user/community/bankaccount.jsx";
import theme from "../../../../theme";
import { NormalizeCommunity } from "../../../../api/user/community/community.jsx";
import SuccessModal from "../../../../components/modals/SuccessModal.jsx";

const AddCommunityScreen = ({navigation}) => {

    const authToken = useSelector((state) => state.auth.token);
    const user_id = useSelector((state) => state.user.id);
    const { control, handleSubmit, errors } = useForm();
    const [modalVisible, setModalVisible] = useState(false);
    const [sucessModalVisible, setSucessModalVisible] = useState(false);
    const [ErrorModalVisible, setErrorModalVisible] = useState(true);
    const [fetchErrors, setFetchErrors] = useState(null);

    const message_creation_successfully = [
        "Your community has been created successfully.",
        "You can now add properties to your community, by creating a property and attached the community to it."
    ]

    const dissmiss = () => {
        setFetchErrors(null);
    }
    
    const createCommunity = async (payload) => { 
        setModalVisible(true);
        try {
            var url = '/bankaccounts/';
            const bankaccount = NormalizeBankAccount({data: payload});
            var data = await fetchData({url: url, method:'POST', data:bankaccount, authToken: authToken});
            console.log(data)
            
            payload.bank_account = data.id;
            payload.admin = user_id;
            payload.president = user_id;
            
            url = '/neighborhoods/';
            const community = NormalizeCommunity({data: payload});
            data = await fetchData({url: url, method:'POST', data:community, authToken: authToken});;
            console.log('esta es la respuesta de la creación de la comunidad');
            console.log(data);
            setModalVisible(false);
            setSucessModalVisible(true);
        } catch(error) {
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
                <View style={ [theme.components.Card.style, styles.title] }>
                        <Text style={ theme.components.Subtitle.style }>Here you can add a new commnity:</Text>

                        <Text style={ [theme.components.Subtitle.style, styles.field_title] }>Community:</Text>
                        <CustomInput name='community_name' 
                                     placeholder='Name' 
                                     rules={ 
                                        { 
                                            required: "Name of the community is required."
                                        } 
                                     }
                                     control={control}/>

                        <CustomInput name='community_address' 
                                     placeholder='Address' 
                                     rules={ 
                                        { 
                                            required: "Address of the community is required."
                                        } 
                                     }
                                     control={control}/>

                        <Text style={ [theme.components.Subtitle.style, styles.field_title ] }>Bank account:</Text>
                        
                        <CustomInput name='bankaccount_name' 
                                     placeholder='Name' 
                                     rules={ 
                                        { 
                                            required: "Name of the bank account is required."
                                        } 
                                     }
                                     control={control} />
                        
                        <CustomInput name='bankaccount_number' 
                                     placeholder='Number'
                                     rules={ 
                                        { 
                                            required: "Bank account number required",
                                            minLength: {
                                                value: 24,
                                                message: 'Bank account number must be at least 24 characters long.'
                                            },
                                            maxLength: {
                                                value: 24,
                                                message: 'Bank account number must not be longer than 24 characters.'
                                            }
                                        } 
                                     }
                                     control={control}/>
                        
                        <View style={styles.button}>
                            <CustomButton size='xs'  onPressed={handleSubmit(createCommunity)}>Add community</CustomButton>
                        </View>
                </View>
            </ScrollView>
        </BasePrivateScreen>
    );
}

const styles = StyleSheet.create({
    title: {marginTop: 20},
    field_title: {marginTop: 20, alignSelf: 'flex-start'},
    button: {marginTop: 20}
});

export default AddCommunityScreen;