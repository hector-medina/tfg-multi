import React, { useEffect, useState } from "react";
import { Text, StyleSheet, ScrollView, View, TextInput, Button } from "react-native";
import { useSelector } from 'react-redux';
import ErrorModal from "../../../../components/modals/ErrorModal";
import BasePrivateScreen from "../../BasePrivateScreen";
import Loading from "../../../../components/loadings/Loading";
import SuccessModal from "../../../../components/modals/SuccessModal";
import theme from "../../../../theme";
import { useForm, Controller } from 'react-hook-form';
import CustomInput from "../../../../components/forms/CustomInput";
import CustomButton from "../../../../components/buttons/CustomButton";
import * as DocumentPicker from 'expo-document-picker';
import { fetchData } from "../../../../api/utils/useFetch";
import Icon from 'react-native-vector-icons/FontAwesome';

const AddAgreementScreen = ({route, navigation}) => {
    
    const {community_id} = route.params;

    const authToken = useSelector((state) => state.auth.token);
    const user_id =  useSelector((state) => state.user.id);

    const { control, handleSubmit, errors, setValue, watch } = useForm();

    const [modalVisible, setModalVisible] = useState(false);
    const [sucessModalVisible, setSucessModalVisible] = useState(false);
    const [ErrorModalVisible, setErrorModalVisible] = useState(true);
    const [fetchErrors, setFetchErrors] = useState(null);

    const message_creation_successfully = [
        "Your agreement has been created successfully."
    ]

    const dissmiss = () => {
        setFetchErrors(null);
    }

    const createAgreement = async (payload) => {
        setModalVisible(true);
        payload.community = community_id;
        console.log('create agreement logic');
        console.log(payload);
        try {
            const url = '/agreements/';
            const formdata = new FormData();
            formdata.append('name', payload.name);
            formdata.append('description', payload.description);
            formdata.append('neighborhood', payload.community);
            formdata.append('pdf_file', {
                uri: payload.pdf_file.uri,
                name: payload.pdf_file.name
            });
            const data = await fetchData({url: url, method: 'POST', multipart: true, formData: formdata, authToken: authToken});
            console.log(data);
            setModalVisible(false);
            setSucessModalVisible(true);
        } catch(error){
            console.log(error);
            setModalVisible(false);
            setErrorModalVisible(true)
            setFetchErrors(error.message);
        }
    }

    const pickDocument = async () => {
    try {
        const result = await DocumentPicker.getDocumentAsync();
        console.log(result);
        console.log(result.canceled);
        if (!result.canceled) {
           setValue('pdf_file', result.assets[0]);
        } else {
            console.log('Canceled by user');
        }
    } catch (error) {
        console.error('Error in document selection:', error);
    }
    };
    
    return  (
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
                message={'Your agreement is processing.'} 
                modalVisible={modalVisible}/>
       
            <ScrollView>
                <View style={ [theme.components.Card.style, styles.title] }>
                        <Text style={ theme.components.Subtitle.style }>
                            Here you can add a new agreement:
                        </Text>

                        <CustomInput name='name' 
                            placeholder='Name' 
                            rules={ 
                                { 
                                    required: "Name of the agreement is required."
                                } 
                            }
                            control={control}/> 


                        <CustomInput name='description' 
                            placeholder='Description' 
                            numberOfLines={10}
                            multiline
                            rules={ 
                                { 
                                    required: "Description of the agreement is required."
                                } 
                            }
                            control={control}/> 

                        <Controller
                            control={control}
                            render={({ field }) => (
                                <Text style={ [theme.components.Subtitle.style, styles.field_title ] }>
                                    File: <Text style={styles.text}>{field.value ? field.value.name : 'None'}</Text>
                                </Text>
                            )}
                            name="pdf_file"
                            />
                            <View style={{flexDirection: 'row',justifyContent: 'space-between', alignItems: 'baseline'}}>
                                <CustomButton size='xs' onPressed={pickDocument}>
                                    <Icon name="file-text" size={20} color={'white'} /> Add
                                </CustomButton>
                            </View>

                        
                        <View style={styles.button}>
                            <CustomButton size='xs'  onPressed={handleSubmit(createAgreement)}>
                                Add agreement
                            </CustomButton>
                        </View>
                </View>

            </ScrollView>

        </BasePrivateScreen>
    );
}

const styles = StyleSheet.create({
    text: {
        marginTop: 20, 
        alignSelf: 'flex-start', 
        fontWeight: 'normal'
    },
    title: {
        marginTop: 20
    },
    field_title: {
        marginVertical: 20,
        alignSelf: 'flex-start',
        fontSize: 18
    },
    button: {
        marginTop: 40
    },
    textError: {
        color: 'red',
    },
});

export default AddAgreementScreen;