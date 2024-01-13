import React, { useState , useEffect} from "react";
import { useSelector } from 'react-redux';
import { View, Text, ScrollView, StyleSheet } from "react-native";
import CustomButton from "../../../../components/buttons/CustomButton";
import { fetchData } from '../../../../api/utils/useFetch';
import theme from "../../../../theme";
import CardSmall from "./../../../../components/cards/CardSmall";


const DetailCommunityScreen = ({route, navigation}) => {

    const { community_id } = route.params;
    const authToken = useSelector((state) => state.auth.token);
    const user_id = useSelector((state) => state.user.id);
    const [community, setCommunity] = useState({        
        admin: ' ', president: ' ', bank_account: ' ', address: ' ',
        creation_date: ' ', id: 0, name: ' ', properties: []
    })

    const [bankaccount, setBankaccount] = useState({        
        balance: 0.0, id: ' ', name: ' ', number: ' '
    })
    
    const [admin, setAdmin] = useState({
        id: 0, first_name: " ", last_name: " ", username: " ",
        email: " ", dni: null, phone: null, communities: []
    })

    const [president, setPresident] = useState({
        id: 0, first_name: " ", last_name: " ", username: " ", 
        email: " ", dni: null, phone: null, communities: []
    })

    useEffect(() => {
        navigation.addListener('focus', () => {
            getData();
        })
    }, []);


    const getData = async () => {
        try{
            var url = '/neighborhoods/'+community_id+'/';
            const community_data = await fetchData({url: url, authToken: authToken});
            console.log(community_data);
            setCommunity(community_data);
            
            url = '/bankaccounts/'+community_data.bank_account+'/';
            const bankaccount_data = await fetchData({url: url, authToken: authToken});
            console.log(bankaccount_data);
            setBankaccount(bankaccount_data);

            url = '/accounts/'+community_data.admin+'/';
            const admin_data = await fetchData({url: url, authToken: authToken});
            console.log(admin_data);
            setAdmin(admin_data);

            url = '/accounts/'+community_data.president+'/';
            const president_data = await fetchData({url: url, authToken: authToken});
            console.log(president_data);
            setPresident(president_data);

        }
        catch (error){
            console.log(error);
        }
    }
    return  (
        <ScrollView>
                <View style={{ paddingHorizontal: 20}}w>
                    
                        <View style={{ marginTop: 10, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'baseline' }}>
                            <Text style={[styles.title]}>Communities</Text>
                            {
                                (user_id == community.admin || user_id == community.president ) &&
                                <CustomButton size='xs' onPressed={ () => { navigation.navigate('editcommunity',{community_id: community.id, community_name: community.name, community_address: community.address, bankaccount_name: bankaccount.name, bankaccount_number: bankaccount.number }) } }>Edit</CustomButton>
                            }
                        </View>
                        
                        <View style={[theme.components.Card.style, {marginBottom: 0, marginHorizontal: 0}]}>
                            <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                                <View>
                                    <Text style={{color: 'gray', fontSize: 16, fontWeight: 'bold'}}>Name: </Text>
                                    <Text style={{color: 'gray', fontSize: 16, fontWeight: 'bold'}}>Created at: </Text>
                                    <Text style={{color: 'gray', fontSize: 16, fontWeight: 'bold'}}>Address: </Text>
                                </View>
                                <View style={{flexShrink:1, alignItems: 'flex-end'}}>
                                    <Text style={{color: 'gray', fontSize: 16}}>{community.name}</Text>
                                    <Text style={{color: 'gray', fontSize: 16}}>{community.creation_date}</Text>
                                    <Text style={{color: 'gray', fontSize: 16}}>{community.address}</Text>
                                </View>
                            </View>
                            <Text style={ [theme.components.Subtitle.style, styles.field_title ] }>Bank account:</Text>
                            <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                                <View>
                                    <Text style={{color: 'gray', fontSize: 16, fontWeight: 'bold'}}>Name: </Text>
                                    <Text style={{color: 'gray', fontSize: 16, fontWeight: 'bold'}}>Number: </Text>
                                    <Text style={{color: 'gray', fontSize: 16, fontWeight: 'bold'}}>Balance: </Text>
                                </View>
                                <View style={{flexShrink:1, alignItems: 'flex-end'}}>
                                    <Text style={{color: 'gray', fontSize: 16}}>{bankaccount.name}</Text>
                                    <Text style={{color: 'gray', fontSize: 16}}>{bankaccount.number}</Text>
                                    <Text style={{color: 'gray', fontSize: 16}}>€ {bankaccount.balance}</Text>
                                </View>
                            </View>
                        </View>
                        
                        <View style={{ marginTop: 10, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'baseline' }}>
                            <Text style={[styles.title]}>Managers</Text>
                            {
                                (user_id == community.admin || user_id == community.president ) &&
                                <CustomButton size='xs' onPressed={ () => { navigation.navigate('editmanagers',{community_id: community.id, admin_id: admin.id, president_id: president.id}) } }>Edit</CustomButton>
                            }
                        </View>
                        <View style={[theme.components.Card.style, {marginBottom: 0, marginHorizontal: 0}]}>
                            <Text style={ [theme.components.Subtitle.style, styles.field_title ] }>Administrator:</Text>
                            <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                                <View>
                                    <Text style={{color: 'gray', fontSize: 16, fontWeight: 'bold'}}>Name: </Text>
                                    <Text style={{color: 'gray', fontSize: 16, fontWeight: 'bold'}}>Surname: </Text>
                                    <Text style={{color: 'gray', fontSize: 16, fontWeight: 'bold'}}>Email: </Text>
                                    <Text style={{color: 'gray', fontSize: 16, fontWeight: 'bold'}}>Phone: </Text>
                                </View>
                                <View style={{flexShrink:1, alignItems: 'flex-end'}}>
                                    <Text style={{color: 'gray', fontSize: 16}}> {admin.first_name}</Text>
                                    <Text style={{color: 'gray', fontSize: 16}}> {admin.last_name}</Text>
                                    <Text style={{color: 'gray', fontSize: 16}}> {admin.email}</Text>
                                    <Text style={{color: 'gray', fontSize: 16}}> {admin.phone}</Text>
                                </View>
                            </View>
                            <Text style={ [theme.components.Subtitle.style, styles.field_title ] }>President:</Text>
                            <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                                <View>
                                    <Text style={{color: 'gray', fontSize: 16, fontWeight: 'bold'}}>Name: </Text>
                                    <Text style={{color: 'gray', fontSize: 16, fontWeight: 'bold'}}>Surname: </Text>
                                    <Text style={{color: 'gray', fontSize: 16, fontWeight: 'bold'}}>Email: </Text>
                                    <Text style={{color: 'gray', fontSize: 16, fontWeight: 'bold'}}>Phone: </Text>
                                </View>
                                <View style={{flexShrink:1, alignItems: 'flex-end'}}>
                                    <Text style={{color: 'gray', fontSize: 16}}> {president.first_name}</Text>
                                    <Text style={{color: 'gray', fontSize: 16}}> {president.last_name}</Text>
                                    <Text style={{color: 'gray', fontSize: 16}}> {president.email}</Text>
                                    <Text style={{color: 'gray', fontSize: 16}}> {president.phone}</Text>
                                </View>
                            </View>
                        </View>
                        
                        <View style={{marginBottom: 20}}>
                        <View style={{ marginTop: 10, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'baseline' }}>
                            <Text style={[styles.title]}>Properties</Text>
                            {
                                (user_id == community.admin || user_id == community.president ) &&
                                <CustomButton size='xs' onPressed={ () => { navigation.navigate('addproperty',{community_id: community.id}) } }>Add</CustomButton>
                            }
                        </View>
                            { community.properties.length == 0 ?
                                <View style={ styles.small_card_container }>
                                    <CardSmall title={'No properties found.'}/>
                                </View>
                                : community.properties.map((property, index) => {
                                    return (
                                        <View style={ [styles.small_card_container, {marginBottom: 20}] } key={index}>
                                            <CardSmall title={property.name} url={'detailproperty'} url_params={{property_id: property.id}}/>
                                        </View>
                                    );
                                })
                            }
                        </View>
                </View>
            </ScrollView>
    );
}

const styles = StyleSheet.create({
    field_title: {marginVertical: 10, alignSelf: 'flex-start'},
    title: {color: 'gray', fontSize: 20, fontWeight: 'bold', marginVertical: 15},

});

export default DetailCommunityScreen;