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
import { fetchData } from '../../../../api/utils/useFetch';

const EditPropertyScreen = ({route, navigation}) => {
    const { property_id, property_name } = route.params;

    const authToken = useSelector((state) => state.auth.token);
    const user_id = useSelector((state) => state.user.id);

    const [modalVisible, setModalVisible] = useState(false);
    const [sucessModalVisible, setSucessModalVisible] = useState(false);
    const [deleteModalVisible, setDeleteModalVisible] = useState(false);
    const [confirmDeleteModalVisible, setConfirmDeleteModalVisible] = useState(false);
    const [ErrorModalVisible, setErrorModalVisible] = useState(true);
    const [fetchErrors, setFetchErrors] = useState(null);

    const { control, handleSubmit, errors } = useForm(
        { defaultValues: { 
            property_name: property_name, 
            }
        });

    const message_edition_successfully = [
        "Your property has been updated successfully."
    ]

    const message_delete_successfully = [
        "Your property has been deleted successfully."
    ]

    const dissmiss = () => {
        setFetchErrors(null);
    }

    const editProperty = async (payload) => { 
        setModalVisible(true);
        try {
            var url = '/properties/'+property_id+'/';
            const property = {name: payload.property_name};
            console.log(property);
            var data = await fetchData({url: url, method:'PATCH', data:property, authToken: authToken});
            console.log(data)
            console.log("editproperty method");
            setModalVisible(false);
            setSucessModalVisible(true);
        } catch(error) {
            console.log(error);
            setModalVisible(false);
            setErrorModalVisible(true)
            setFetchErrors(error.message);
        }
    }

    const confirmDeleteProperty = async () => {
        setConfirmDeleteModalVisible(true);
    }

    const deleteProperty = async () => {
        setConfirmDeleteModalVisible(false);
        setModalVisible(true);
        try {
            var url = '/properties/'+property_id+'/';
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
                entity={'property \''+property_name+'\''} 
                modalVisible={confirmDeleteModalVisible} 
                onCancel={() => {setConfirmDeleteModalVisible(false)}}
                onConfirm={() => {deleteProperty()}}/>
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
                        <Text style={ theme.components.Subtitle.style }>Edit your property:</Text>

                        <Text style={ [theme.components.Subtitle.style, styles.field_title] }>Community:</Text>
                        <CustomInput name='property_name' 
                                     placeholder='Name' 
                                     rules={ 
                                        { 
                                            required: "Name of the community is required."
                                        } 
                                     }
                                     control={control}/>
                        
                        <View style={styles.button}>
                            <CustomButton size='xs'  onPressed={handleSubmit(editProperty)}>Edit property</CustomButton>
                        </View>
                </View>
                <View style={ [theme.components.Card.style, styles.title] }>
                        <Text style={ [theme.components.Subtitle.style, styles.danger] }>Danger zone:</Text>

                        <Text style={ [theme.components.Subtitle.style, styles.text] }>Press the following button for deleting your property:</Text>
                        
                        <View style={styles.button}>
                            <CustomButton size='xs' danger onPressed={handleSubmit(confirmDeleteProperty)}>Delete property</CustomButton>
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

export default EditPropertyScreen;