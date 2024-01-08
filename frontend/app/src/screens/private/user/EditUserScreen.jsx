import React, {useState, useEffect } from "react";
import { Text, ScrollView, View, StyleSheet } from "react-native";
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import BasePrivateScreen from "../BasePrivateScreen";
import SuccessModal from "../../../components/modals/SuccessModal";
import ErrorModal from "../../../components/modals/ErrorModal";
import Loading from "../../../components/loadings/Loading";
import theme from "./../../../../src/theme";
import CustomInput from "../../../components/forms/CustomInput";
import CustomButton from "../../../components/buttons/CustomButton";
import { fetchData } from '../../../api/utils/useFetch';
import { NormalizeUserEdit } from "../../../api/user/user.jsx";


const EditUserScreen = ({route, navigation}) => {
        
    const authToken = useSelector((state) => state.auth.token);
    const user_id = useSelector((state) => state.user.id);
    const { user } = route.params;
    
    const [modalVisible, setModalVisible] = useState(false);
    const [sucessModalVisible, setSucessModalVisible] = useState(false);
    const [ErrorModalVisible, setErrorModalVisible] = useState(true);
    const [fetchErrors, setFetchErrors] = useState(null);
    const { control, handleSubmit, errors } = useForm(
        { defaultValues: { 
            first_name: user.first_name == undefined ? '' : user.first_name, 
            last_name: user.last_name == undefined ? '' : user.last_name, 
            email: user.email == undefined ? '' : user.email, 
            dni: user.dni == undefined ? '' : user.dni, 
            phone: user.phone == undefined ? '' : user.phone,
            address: user.address == undefined ? '' : user.address
            }
        });
    
    const message_edition_successfully = [
        'Your user has been edited successfully.',
    ]

    const dissmiss = () => {
        setFetchErrors(null);
    }

    const editUser = async (payload) => { 
        setModalVisible(true);
        try {
            var url = '/accounts/'+user_id+'/';
            const user = NormalizeUserEdit({data: payload});
            var data = await fetchData({url: url, method:'PATCH', data:user, authToken: authToken});
            console.log(data);
            console.log("lo de arriba tiene que tener dni");
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
                        <Text style={ theme.components.Subtitle.style }>Edit your profile:</Text>

                        <CustomInput name='first_name' 
                                     placeholder='Name' 
                                     rules={ 
                                        { 
                                            required: "Name of the community is required."
                                        } 
                                     }
                                     control={control}/>
                        
                        <CustomInput name='last_name' 
                                     placeholder='Last name' 
                                     control={control} />
                        
                        <CustomInput name='email' 
                                     placeholder='Email'
                                     control={control}
                                     editable={false}
                                     />

                        <CustomInput name='dni' 
                                     placeholder='DNI'
                                     control={control}
                                     />

                        <CustomInput name='phone' 
                                     placeholder='Phone'
                                     control={control}
                                     keyboardType="numeric"/>

                        <CustomInput name='address' 
                                     placeholder='Address'
                                     control={control}
                                     />

                        <View style={styles.button}>
                            <CustomButton size='xs'  onPressed={handleSubmit(editUser)}>Edit user</CustomButton>
                        </View>
                </View>
            </ScrollView>
        </BasePrivateScreen>
    );

}

const styles = StyleSheet.create({
    title: {
        marginTop: 20
    },
    field_title: {
        marginTop: 20, 
        alignSelf: 'flex-start'
    },
    button: {
        marginTop: 20
    }
});

export default EditUserScreen;