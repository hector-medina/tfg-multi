import React, { useEffect, useState } from "react";
import { LogBox, Text, FlatList, StyleSheet, Button, ScrollView, Modal, View } from "react-native";
import { useSelector } from 'react-redux';
import { fetchData } from "../../../../api/utils/useFetch";
import CustomButton from "../../../../components/buttons/CustomButton";
import Icon from 'react-native-vector-icons/FontAwesome';
import theme from "../../../../theme";
import CustomPicker from "../../../../components/forms/CustomPicker";
import { useForm, Controller } from 'react-hook-form';
import CardMedium from "../../../../components/cards/CardMedium";
import ErrorModal from "../../../../components/modals/ErrorModal";
import CardLargeMinimal from "../../../../components/cards/CardLargeMinimal";
import CardSmall from "../../../../components/cards/CardSmall";
import BasePrivateScreen from "../../BasePrivateScreen";
import Loading from "../../../../components/loadings/Loading";
import CustomInput from "../../../../components/forms/CustomInput";
import DateTimePicker from '@react-native-community/datetimepicker';
import SuccessModal from "../../../../components/modals/SuccessModal";

const AddRecordScreen = ({route, navigation}) => {
    const {bankaccount_id} = route.params;
    const authToken = useSelector((state) => state.auth.token);
    const user_id =  useSelector((state) => state.user.id);

    const { control, handleSubmit, errors, setValue, watch } = useForm();
    const [modalVisible, setModalVisible] = useState(false);
    const [sucessModalVisible, setSucessModalVisible] = useState(false);
    const [ErrorModalVisible, setErrorModalVisible] = useState(true);
    const [fetchErrors, setFetchErrors] = useState(null);
    const [showDatePicker, setShowDatePicker] = useState(false);
    const selectedDate = watch('transaction_date', '');
  

    const message_creation_successfully = [
        "Your record has been created successfully."
    ]

    const dissmiss = () => {
        setFetchErrors(null);
    }
    
    const createRecord = async (payload) => { 
        payload.bank_account = bankaccount_id;
        console.log(payload);
        setModalVisible(true);
        try {
            var url = '/records/';
            var data = await fetchData({url: url, method:'POST', data:payload, authToken: authToken});
            console.log(data)
            setModalVisible(false);
            setSucessModalVisible(true);
        } catch(error) {
            setModalVisible(false);
            setErrorModalVisible(true)
            setFetchErrors(error.message);
        }
    }

    const handleDateChange = (event, date) => {
        if (date !== undefined) {
          setValue('transaction_date', date.toISOString().split('T')[0]);
        }
        setShowDatePicker(false);
      };

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
            message={'Your record is processing.'} 
            modalVisible={modalVisible}/>

        <ScrollView>
            <View style={ [theme.components.Card.style, styles.title] }>
                    <Text style={ theme.components.Subtitle.style }>Here you can add a new record:</Text>

                    <CustomInput name='amount' 
                                 placeholder='Amount' 
                                 rules={ 
                                    { 
                                        required: "Amount of the record is required."
                                    } 
                                 }
                                 control={control}/>

                    <CustomInput name='description' 
                                 placeholder='Description'
                                 rules={ 
                                    { 
                                        required: "Description of the record is required."
                                    } 
                                 }
                                 control={control}/>

                    <Text style={ [theme.components.Subtitle.style, styles.field_title ] }>Date of the record: {selectedDate}</Text>

                    <Controller
                            rules = {{ required: "Date of the record is required." }}
                            control={control}
                            render={({ field: { onChange, value }, fieldState: {error} }) => (
                            <View>
                                <View style={{flexDirection: 'row',justifyContent: 'space-between', alignItems: 'baseline'}}>
                                    <CustomButton size='xs' onPressed={() => setShowDatePicker(true)}>
                                        <Icon  name="calendar" size={15} color="#fff" />
                                    </CustomButton>
                                </View>
                                <View>
                                { error && 
                                    (<Text style={styles.textError}>
                                        {error.message || 'Error'}
                                    </Text>)
                                }
                                </View>
                                {showDatePicker && (
                                <DateTimePicker
                                    value={value ? new Date(value) : new Date()}
                                    mode="date"
                                    display="default"
                                    onChange={handleDateChange}
                                />
                                )}
                            </View>
                            )}
                            name="transaction_date"
                            defaultValue=""
                        />      

                    <View style={styles.button}>
                        <CustomButton size='xs'  onPressed={handleSubmit(createRecord)}>Add record</CustomButton>
                    </View>
            </View>
        </ScrollView>
    </BasePrivateScreen>
    );
};

const styles = StyleSheet.create({
    title: {marginTop: 20},
    field_title: {marginTop: 20, alignSelf: 'flex-start'},
    button: {marginTop: 20},
    textError: {
        color: 'red',
    },
});

export default AddRecordScreen;