import React, {useState, useEffect } from "react";
import {Text, StyleSheet, ScrollView, View} from "react-native";
import BasePrivateScreen from "../../BasePrivateScreen";
import Loading from "../../../../components/loadings/Loading";
import ErrorModal from "../../../../components/modals/ErrorModal";
import SuccessModal from "../../../../components/modals/SuccessModal";
import ConfirmModal from "../../../../components/modals/ConfirmModal";
import { useForm } from 'react-hook-form';
import { useSelector } from "react-redux";
import theme from "../../../../theme";
import CustomInput from "../../../../components/forms/CustomInput";
import CustomButton from "../../../../components/buttons/CustomButton";
import { NormalizeCommunityEdit } from "../../../../api/user/community/community.jsx";
import { NormalizeBankAccountEdit } from "../../../../api/user/community/bankaccount.jsx";
import { fetchData } from '../../../../api/utils/useFetch';


const EditCommunityScreen = ({route, navigation}) => {
    const { community_id, community_name, community_address, bankaccount_name, bankaccount_number } = route.params;
    const authToken = useSelector((state) => state.auth.token);
    const user_id = useSelector((state) => state.user.id);
    const { control, handleSubmit, errors } = useForm(
        { defaultValues: { 
            community_name: community_name, 
            community_address: community_address, 
            bankaccount_name: bankaccount_name, 
            bankaccount_number: bankaccount_number 
            }
        });
    const [modalVisible, setModalVisible] = useState(false);
    const [sucessModalVisible, setSucessModalVisible] = useState(false);
    const [deleteModalVisible, setDeleteModalVisible] = useState(false);
    const [confirmDeleteModalVisible, setConfirmDeleteModalVisible] = useState(false);
    const [ErrorModalVisible, setErrorModalVisible] = useState(true);
    const [fetchErrors, setFetchErrors] = useState(null);

    const message_edition_successfully = [
        "Your community has been updated successfully."
    ]

    const message_delete_successfully = [
        "Your community has been deleted successfully."
    ]

    const dissmiss = () => {
        setFetchErrors(null);
    }

    const editCommunity = async (payload) => { 
        setModalVisible(true);
        try {
            var url = '/neighborhoods/'+community_id+'/';
            const neighborhood = NormalizeCommunityEdit({data: payload});
            var data = await fetchData({url: url, method:'PATCH', data:neighborhood, authToken: authToken});
            console.log(data)
                        
            url = '/bankaccounts/'+data.bank_account+'/';
            const bankaccount = NormalizeBankAccountEdit({data: payload});
            data = await fetchData({url: url, method:'PATCH', data:bankaccount, authToken: authToken});;
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

    const confirmDeleteCommunity = async () => {
        setConfirmDeleteModalVisible(true);
    }
    
    const deleteCommunity = async () => {
        setConfirmDeleteModalVisible(false);
        setModalVisible(true);
        try {
            var url = '/neighborhoods/'+community_id+'/';
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
        <BasePrivateScreen>
        { sucessModalVisible && 
            <SuccessModal 
                message={message_edition_successfully} 
                modalVisible={sucessModalVisible} 
                onClose={() => {navigation.goBack()}}/>
        }

        { deleteModalVisible && 
            <SuccessModal 
                message={message_delete_successfully} 
                modalVisible={deleteModalVisible} 
                onClose={() => {navigation.popToTop()}}/>
        }

        { confirmDeleteModalVisible && 
            <ConfirmModal 
                entity={'community \''+community_name+'\''} 
                modalVisible={confirmDeleteModalVisible} 
                onCancel={() => {setConfirmDeleteModalVisible(false)}}
                onConfirm={() => {deleteCommunity()}}/>
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
                <View style={ [theme.components.Card.style, styles.card] }>
                        <Text style={ theme.components.Subtitle.style }>Edit your community:</Text>

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
                            <CustomButton size='xs'  onPressed={handleSubmit(editCommunity)}>Edit community</CustomButton>
                        </View>
                </View>
                <View style={ [theme.components.Card.style, styles.title] }>
                        <Text style={ [theme.components.Subtitle.style, styles.danger] }>Danger zone:</Text>

                        <Text style={ [theme.components.Subtitle.style, styles.text] }>Press the following button for deleting your community:</Text>
                        
                        <View style={styles.button}>
                            <CustomButton size='xs' danger onPressed={handleSubmit(confirmDeleteCommunity)}>Delete community</CustomButton>
                        </View>
                </View>
            </ScrollView>
        </BasePrivateScreen>

    
    );
}

const styles = StyleSheet.create({
    card: {
        marginBottom: 0,
        marginTop: 20
    },
    title: {marginTop: 20},
    field_title: {marginTop: 20, alignSelf: 'flex-start'},
    text: {marginTop: 20, alignSelf: 'flex-start', fontWeight: 'normal'},
    button: {marginTop: 20},
    danger: {
        color: '#dc3545'
    }
});

export default EditCommunityScreen;