import React, { useEffect, useState } from "react";
import { Text, StyleSheet, ScrollView, Modal, View } from "react-native";
import { useSelector, useDispatch } from 'react-redux';
import { fetchData } from "../../../api/utils/useFetch";
import CustomButton from "../../../components/buttons/CustomButton";
import Icon from 'react-native-vector-icons/FontAwesome';
import theme from "../../../theme";
import CustomPicker from "../../../components/forms/CustomPicker";
import { useForm } from 'react-hook-form';
import CardMedium from "../../../components/cards/CardMedium";
import ErrorModal from "../../../components/modals/ErrorModal";
import CardLarge from "../../../components/cards/CardLarge";
import CardSmall from "../../../components/cards/CardSmall";


const HomeScreen = ({navigation}) => {
    const dispatch = useDispatch();
    const authToken = useSelector((state) => state.auth.token);
    const user_id =  useSelector((state) => state.user.id);

    const [ErrorModalVisible, setErrorModalVisible] = useState(false);
    const [fetchErrors, setFetchErrors] = useState(null);
    const [communitySelected, setCommunitySelected] = useState({ id: 0, name: 'Community' });
    const [communitySelectModal, setCommunitySelectModal] = useState(false);
    const [user, setUser] = useState({        
        first_name: ' ', last_name: ' ', id: ' ',
        email: ' ', phone: ' ', address: ' ',
        dni: ' ', city: ' ', properties: [], communities: [], image: null
    });
    const [bankAccount, setBankAccount] = useState({
        id: 0, number: '', balance: 0.00, income: 0.00, expenses: 0.00, 
        total_debt: 0.00, increased_debt: 0.00, decreased_debt: 0.00});

    const { control, handleSubmit, errors } = useForm();

    useEffect(() => {
        navigation.setOptions({ 
            headerTitle: communitySelected.name,
            headerRight: () => (
                communitySelected != null && communitySelected.id != 0 ? 
                <CustomButton navbar size="xs" 
                onPressed={() => {setCommunitySelectModal(true)}}>
                        <Icon style={styles.icon_navbar} name='angle-down'/>
                    </CustomButton>
                :null
                ),
            });
    },[communitySelected]);

    useEffect(() => {
        if (user_id !== null && authToken !== null ) {
            getData();
            navigation.addListener('focus', () => {
                getData();
            })  
        }
    }, [user_id, authToken]);

    useEffect(() => {
        if(communitySelected.id != 0){
            getBankAccount();
        }
    },[communitySelected]);

    const getData = async () => {

        try{
            var url = '/accounts/'+user_id+'/';
            const data = await fetchData({url: url, authToken: authToken});
            console.log(data);
            setUser(data);
            if (data.communities.length != 0 && communitySelected.id == 0){
                setCommunitySelected(data.communities[0]);
            }
            if (data.communities.length == 0){
                setCommunitySelected({ id: 0, name: 'Community' });
            }
        }
        catch (error){
            console.log(error);
        }
    }

    const getBankAccount = async () => {
        try{
            var url = '/bankaccounts/'+communitySelected.id+'/';
            const data = await fetchData({url: url, authToken: authToken});
            console.log(data);
            setBankAccount(data);
        }
        catch (error){
            console.log(error);
        }
    }

    const selectCommunity = async (payload) => {
        console.log("selectCommunity: "+payload.community);
        const community = user.communities.find(comunidad => comunidad.id === payload.community);
        setCommunitySelected(community);
        setCommunitySelectModal(false);
    }

    const dissmiss = () => {
        setFetchErrors(null);
    }

    return (
        <ScrollView>
            <Modal transparent={true} visible={communitySelectModal} onRequestClose={() => {setCommunitySelectModal(false)}}>
                <View style={styles.modal_container}>
                    <View style={[theme.components.Card.style]}>
                        <Text style={ theme.components.Subtitle.style }>Communities:</Text>
                        <Text style={ styles.text }>Select the community you want to check.</Text>
                        <CustomPicker control={control} name={'community'} selectedValue={0} display_name={['id', 'name']} options={user.communities}/>
                        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                            <CustomButton size='xs' cancel title={'Cerrar'} onPressed={() => {setCommunitySelectModal(false)}}>Cancel</CustomButton>
                            <CustomButton size='xs' title={'Cerrar'} onPressed={handleSubmit(selectCommunity)}>Select</CustomButton>
                        </View>
                    </View>
                </View>   
            </Modal>

            { fetchErrors != null &&
                <ErrorModal 
                    title={'Error'} 
                    message={fetchErrors} 
                    modalVisible={ErrorModalVisible} 
                    onClose={dissmiss}/>
            }

            { communitySelected != undefined && communitySelected.id == 0 &&
                <CardMedium 
                    title={'No Communities'} 
                    texts={[
                        'You have no communities associated in your profile, in order to see information of your community you have to setup your account first.',
                        'You can do that by presing the user button below.'
                    ]}
                    />
            }

            { communitySelected != undefined && communitySelected.id != 0 && 
            <View>

                <View>
                    <Text style={ styles.title }>Finance</Text>
                    <CardLarge 
                        url={'account'} 
                        url_params={{bankaccount_id: bankAccount.id, community_id: communitySelected.id}}
                        title='Account' 
                        balance={bankAccount.balance.toFixed(2).toString()} 
                        income={bankAccount.income.toFixed(2).toString()}
                        expenses={bankAccount.expenses.toFixed(2).toString()} 
                        account_number={bankAccount.number.slice(-4)}
                        />

                    <CardLarge 
                        url={'debt'} 
                        url_params={{bankaccount_id: bankAccount.id, community_id: communitySelected.id}}
                        title='Debts' 
                        balance={bankAccount.total_debt.toFixed(2).toString()} 
                        income={bankAccount.decreased_debt.toFixed(2).toString()} 
                        expenses={bankAccount.increased_debt.toFixed(2).toString()}
                        />
                </View>
                <View>
                    <Text style={styles.title}>Reports</Text>
                    <View style={ [styles.small_card_container, styles.separator] }>
                        <CardSmall url={'agreements'} url_params={{ community_id: communitySelected.id }} title={'Agreements'}/>
                    </View>
                </View>
            </View>
            }
        
            </ScrollView>
            );
}

const styles = StyleSheet.create({
    title: {color: 'gray', fontSize: 25, fontWeight: 'bold', marginVertical: 10, marginHorizontal: 25},
    small_card_container: {marginHorizontal: 20},
    separator: {marginBottom: 10},
    icon_navbar: {fontSize: 18, color: '#4BC29C'},
    modal_container: {
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center', 
        alignItems: 'center',
        flex: 1
    },
    text: {marginTop: 20, alignSelf: 'flex-start', fontWeight: 'normal'},
});

export default HomeScreen;