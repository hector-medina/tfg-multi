import React, {useState, useEffect } from "react";
import {Text, StyleSheet, ScrollView, View} from "react-native";
import BasePrivateScreen from "../../BasePrivateScreen";
import Loading from "../../../../components/loadings/Loading";
import ErrorModal from "../../../../components/modals/ErrorModal";
import SuccessModal from "../../../../components/modals/SuccessModal";
import { useForm } from 'react-hook-form';
import { useSelector } from "react-redux";
import theme from "../../../../theme";
import CustomButton from "../../../../components/buttons/CustomButton";
import { fetchData } from '../../../../api/utils/useFetch';
import CustomPicker from "../../../../components/forms/CustomPicker";


const EditPropertyOwnerScreen= ({route, navigation}) => {
    
    const { property_id, owner_id } = route.params;

    const authToken = useSelector((state) => state.auth.token);
    const user_id = useSelector((state) => state.user.id);
    const [users, setUsers] = useState();
    const [modalVisible, setModalVisible] = useState(false);
    const [sucessModalVisible, setSucessModalVisible] = useState(false);
    const [deleteModalVisible, setDeleteModalVisible] = useState(false);
    const [ErrorModalVisible, setErrorModalVisible] = useState(true);
    const [fetchErrors, setFetchErrors] = useState(null);

    const message_edition_successfully = [
        "The owner has been updated successfully."
    ]
    
    const message_delete_successfully = [
        "The owner has been deleted successfully."
    ]
    
    const { control, handleSubmit, errors } = useForm(
        { 
            defaultValues: { 
                property_owner: owner_id, 
            }
        }
    );

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

    const editOwner = async (payload) => { 
        setModalVisible(true);
        try {
            var url = '/properties/'+property_id+'/';
            const owner = {owner: payload.owner}
            var data = await fetchData({url: url, method:'PATCH', data:owner, authToken: authToken});
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
                        <Text style={ theme.components.Subtitle.style }>Edit the ownershit:</Text>

                        <Text style={ [theme.components.Subtitle.style, styles.field_title] }>Owner:</Text>
                        <CustomPicker 
                            name='owner' 
                            control={control} 
                            display_name={['first_name', 'last_name', 'email']} 
                            options={users} 
                            selectedValue={owner_id} />
                        
                        <View style={styles.button}>
                            <CustomButton size='xs'  onPressed={handleSubmit(editOwner)}>Edit owner</CustomButton>
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

});

export default EditPropertyOwnerScreen;