import React, {useState} from "react";
import { Text, StyleSheet, ScrollView, View } from "react-native";
import theme from "../../../../theme";
import { date_parser } from "../../../../utils/utils";
import CustomButton from "../../../../components/buttons/CustomButton";
import Icon from 'react-native-vector-icons/FontAwesome';
import Loading from "../../../../components/loadings/Loading";
import ErrorModal from "../../../../components/modals/ErrorModal";
import ConfirmModal from "../../../../components/modals/ConfirmModal";
import SuccessModal from "../../../../components/modals/SuccessModal";
import { fetchData } from "../../../../api/utils/useFetch";
import { useSelector } from "react-redux";

const DetailAgreementScreen = ({route, navigation}) => {

    const {admin, president, agreement_id, agreement_name, agreement_description, agreement_creation_date, agreement_pdf_file, } = route.params;
    const authToken = useSelector((state) => state.auth.token);
    const user_id = useSelector((state) => state.user.id);
    const [modalVisible, setModalVisible] = useState(false);
    const [sucessModalVisible, setSucessModalVisible] = useState(false);
    const [deleteModalVisible, setDeleteModalVisible] = useState(false);
    const [confirmDeleteModalVisible, setConfirmDeleteModalVisible] = useState(false);
    const [ErrorModalVisible, setErrorModalVisible] = useState(true);
    const [fetchErrors, setFetchErrors] = useState(null);

    const message_delete_successfully = [
        "Your agreement has been deleted successfully."
    ]

    const confirmDeleteAgreement = async () => {
        setConfirmDeleteModalVisible(true);
    }
    
    const deleteAgreement = async () => {
        setConfirmDeleteModalVisible(false);
        setModalVisible(true);
        try {
            var url = '/agreements/'+agreement_id+'/';
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

    const dissmiss = () => {
        setFetchErrors(null);
    }
    
    return (
        <ScrollView>

        { deleteModalVisible && 
            <SuccessModal 
                message={message_delete_successfully} 
                modalVisible={deleteModalVisible} 
                onClose={() => {navigation.popToTop()}}/>
        }

        { confirmDeleteModalVisible && 
            <ConfirmModal 
                entity={'agreement \''+agreement_name+'\''} 
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
            message={'Your record is processing.'} 
            modalVisible={modalVisible}/>

        <View style={ [theme.components.Card.style, styles.title] }>
            <Text style={ [theme.components.Subtitle.style, styles.subtitle] }>
                Here you can check your agreement:
            </Text>
            <Text style={ [theme.components.Subtitle.style, styles.field_title ] }>Datos:</Text>
            <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <View>
                    <Text style={{color: 'gray', fontSize: 16, fontWeight: 'bold'}}>ID: </Text>
                    <Text style={{color: 'gray', fontSize: 16, fontWeight: 'bold'}}>Name: </Text>
                    <Text style={{color: 'gray', fontSize: 16, fontWeight: 'bold'}}>Creation: </Text>
                </View>
                <View style={{flexShrink:1, alignItems: 'flex-end'}}>
                    <Text style={{color: 'gray', fontSize: 16}}> {agreement_id}</Text>
                    <Text style={{color: 'gray', fontSize: 16}}> {agreement_name}</Text>
                    <Text style={{color: 'gray', fontSize: 16}}> {date_parser(agreement_creation_date)}</Text>
                </View>
            </View>
            <View style={{ height: 1, backgroundColor: '#ccc', marginTop: 10, }}/>
            <Text style={ [theme.components.Subtitle.style, styles.field_title ] }>Description:</Text>
            <Text style={{color: 'gray', fontSize: 16}}>{agreement_description}</Text>
            <View style={{ height: 1, backgroundColor: '#ccc', marginTop: 10, }}/>
            <Text style={ [theme.components.Subtitle.style, styles.field_title ] }>File:</Text>
            <View style={{flexDirection: 'row',justifyContent: 'space-between', alignItems: 'baseline'}}>
                <CustomButton size="xs" onPressed={() => {navigation.navigate('agreementfileviewer', {file_url: agreement_pdf_file })}}>
                    <Icon name="file-text" size={25} color={'white'} /> Check file
                </CustomButton>
            </View>
        </View>
        { (user_id == admin || user_id == president ) &&
        <View style={ [theme.components.Card.style, styles.title] }>
            <Text style={ [theme.components.Subtitle.style, styles.danger] }>Danger zone:</Text>

            <Text style={ [theme.components.Subtitle.style, styles.text] }>Press the following button for deleting this agreement:</Text>
            
            <View style={styles.button}>
                <CustomButton size='xs' danger onPressed={confirmDeleteAgreement}>Delete agreement</CustomButton>
            </View>
        </View>}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    title:{
        marginBottom: 10,
        marginTop: 20
    },
    subtitle: {
        marginVertical: 10
    },
    field_title: {marginVertical: 10, alignSelf: 'flex-start'},
    text: {marginTop: 20, alignSelf: 'flex-start', fontWeight: 'normal'},
    danger: {
        color: '#dc3545'
    },
    button: {marginTop: 20},

});

export default DetailAgreementScreen;