import React, { useState , useEffect} from "react";
import { Text, StyleSheet, View, ScrollView } from "react-native";
import { useSelector } from 'react-redux';
import { fetchData } from "../../../../api/utils/useFetch";
import BasePrivateScreen from "../../BasePrivateScreen";
import ErrorModal from "../../../../components/modals/ErrorModal";

import theme from "../../../../theme";
import CustomButton from "../../../../components/buttons/CustomButton";

const DetailPropertyScreen = ({route, navigation}) => {

    const { property_id } = route.params;
    const authToken = useSelector((state) => state.auth.token);
    const user_id = useSelector((state) => state.user.id);

    const [property, setProperty] = useState({
        name: '', creation_date: '',
    })
    const [owner, setOwner] = useState({
        first_name: '', last_name: '', email: '', phone: '', dni: '',
    })

    const [community, setCommunity] = useState({
        name: '',
    })
    
    const [president, setPresident] = useState({
        first_name: '', last_name: '', email: '', phone: '', dni: '',
    })

    const [admin, setAdmin] = useState({
        first_name: '', last_name: '', email: '', phone: '', dni: '',
    })

    const [ErrorModalVisible, setErrorModalVisible] = useState(true);
    const [fetchErrors, setFetchErrors] = useState(null);


    useEffect(() => {
        navigation.addListener('focus', () => {
            getData();
        })
    }, []);

    const dissmiss = () => {
        setFetchErrors(null);
    }

    const getData = async () => {
        try{
            var url = '/properties/'+property_id+'/';
            const property_data = await fetchData({url: url, authToken: authToken});
            console.log(property_data);
            setProperty(property_data);

            url = '/accounts/'+property_data.owner+'/';
            const owner_data = await fetchData({url: url, authToken: authToken});
            console.log(owner_data);
            setOwner(owner_data);

            url = '/neighborhoods/'+property_data.neighborhood+'/';
            console.log(url)
            const community_data = await fetchData({url: url, authToken: authToken});
            console.log(community_data);
            setCommunity(community_data);
 
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
            setErrorModalVisible(true)
            setFetchErrors(error.message);
        }
    }

return (
    
    <ScrollView>
            { fetchErrors != null &&
                <ErrorModal 
                    title={'Error'} 
                    message={fetchErrors} 
                    modalVisible={ErrorModalVisible} 
                    onClose={dissmiss}/>
            }
            <View style={{ paddingHorizontal: 20}}w>
                <View style={{ marginTop: 10, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'baseline' }}>
                    <Text style={[styles.title]}>Property</Text>
                    {
                        (user_id == community.admin || user_id == community.president ) &&
                        <CustomButton size='xs' onPressed={ () => { navigation.navigate('editproperty', {property_id: property_id, property_name: property.name}) } }>Edit</CustomButton>
                    }
                </View>

                <View style={[theme.components.Card.style, {marginBottom: 0, marginHorizontal: 0}]}>
                    <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                        <View>
                            <Text style={{color: 'gray', fontSize: 16, fontWeight: 'bold'}}>Name: </Text>
                            <Text style={{color: 'gray', fontSize: 16, fontWeight: 'bold'}}>Created at: </Text>
                        </View>
                        <View style={{flexShrink:1, alignItems: 'flex-end'}}>
                            <Text style={{color: 'gray', fontSize: 16}}> {property.name}</Text>
                            <Text style={{color: 'gray', fontSize: 16}}> {property.creation_date}</Text>
                        </View>
                    </View>
                </View>

                <View style={{ marginTop: 10, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'baseline' }}>
                    <Text style={[styles.title]}>Owner</Text>
                    {
                        (user_id == community.admin || user_id == community.president ) &&
                        <CustomButton size='xs' onPressed={ () => { navigation.navigate('editpropertyowner', {property_id: property_id, owner_id: owner.id}) } }>Edit</CustomButton>
                    }
                </View>

                <View style={[theme.components.Card.style, {marginBottom: 0, marginHorizontal: 0}]}>
                    <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                        <View>
                            <Text style={{color: 'gray', fontSize: 16, fontWeight: 'bold'}}>Name: </Text>
                            <Text style={{color: 'gray', fontSize: 16, fontWeight: 'bold'}}>Last name: </Text>
                            <Text style={{color: 'gray', fontSize: 16, fontWeight: 'bold'}}>Email: </Text>
                            <Text style={{color: 'gray', fontSize: 16, fontWeight: 'bold'}}>Phone: </Text>
                            <Text style={{color: 'gray', fontSize: 16, fontWeight: 'bold'}}>DNI: </Text>
                        </View>
                        <View style={{flexShrink:1, alignItems: 'flex-end'}}>
                            <Text style={{color: 'gray', fontSize: 16}}> {owner.first_name}</Text>
                            <Text style={{color: 'gray', fontSize: 16}}> {owner.last_name}</Text>
                            <Text style={{color: 'gray', fontSize: 16}}> {owner.email}</Text>
                            <Text style={{color: 'gray', fontSize: 16}}> {owner.phone}</Text>
                            <Text style={{color: 'gray', fontSize: 16}}> {owner.dni}</Text>
                        </View>
                    </View>
                </View>
                
                <View style={{ marginTop: 10, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'baseline' }}>
                    <Text style={[styles.title]}>Community</Text>
                </View>

                <View style={[theme.components.Card.style, {marginBottom: 20, marginHorizontal: 0}]}>
                    <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                        <View>
                            <Text style={{color: 'gray', fontSize: 16, fontWeight: 'bold'}}>Name: </Text>
                            <Text style={{color: 'gray', fontSize: 16, fontWeight: 'bold'}}>Address: </Text>
                        </View>
                        <View style={{flexShrink:1, alignItems: 'flex-end'}}>
                            <Text style={{color: 'gray', fontSize: 16}}> {community.name}</Text>
                            <Text style={{color: 'gray', fontSize: 16}}> {community.address}</Text>
                        </View>
                    </View>
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
            </View>
        </ScrollView>
    );
}


const styles = StyleSheet.create({
    field_title: {marginVertical: 10, alignSelf: 'flex-start'},
    title: {color: 'gray', fontSize: 20, fontWeight: 'bold', marginVertical: 15},

});

export default DetailPropertyScreen;