import React, { useEffect, useState } from "react";
import { LogBox, Text, FlatList, StyleSheet, ScrollView, Modal, View, TouchableOpacity } from "react-native";
import { useSelector } from 'react-redux';
import { fetchData } from "../../../../api/utils/useFetch";
import CustomButton from "../../../../components/buttons/CustomButton";
import Icon from 'react-native-vector-icons/FontAwesome';
import theme from "../../../../theme";
import CustomPicker from "../../../../components/forms/CustomPicker";
import { useForm } from 'react-hook-form';
import CardMedium from "../../../../components/cards/CardMedium";
import ErrorModal from "../../../../components/modals/ErrorModal";
import CardLargeMinimal from "../../../../components/cards/CardLargeMinimal";
import CardSmall from "../../../../components/cards/CardSmall";
import { date_parser } from "../../../../utils/utils";

const AgreementScreen = ({route, navigation}) => {
    const {community_id} = route.params;
    const authToken = useSelector((state) => state.auth.token);
    const user_id =  useSelector((state) => state.user.id);
    const [community, setCommunity] = useState({
        id: 0, name: '', admin: 0, president: 0, agreements: []});
    
    useEffect(() => {
        if (user_id !== null && authToken !== null ) {
            getData();
            navigation.addListener('focus', () => {
                getData();
            })  
        }
    }, [user_id, authToken])

    const getData = async () => {
        try{
            const url = '/neighborhoods/'+community_id+'/';
            const data_community = await fetchData({url: url, authToken: authToken});
            console.log(data_community);
            setCommunity(data_community);
        }
        catch (error){
            console.log(error);
        }
    }

    const Separador = () => (
        <View
          style={{
            height: 1,
            backgroundColor: '#ccc',
            marginVertical: 5, 
          }}
        />
      );

      const itemList = ({item}) => {
        return (
            <View style={{marginVertical: 10, flexDirection: 'row', justifyContent: 'space-between'}}>
            <View style={{justifyContent: 'center'}}>
                <Text style={styles.description}>{item.name}</Text>
                <Text style={styles.date_time}>{date_parser(item.creation_date)}</Text>
            </View>
            <View style={{justifyContent: 'center'}}>
                <TouchableOpacity onPress={() => {
                    navigation.navigate(
                        'detailagreement', 
                        {
                            agreement_id: item.id,
                            agreement_name: item.name,
                            agreement_description: item.description,
                            agreement_creation_date: item.creation_date,
                            agreement_pdf_file: item.pdf_file,
                        }
                    )}
                }>
                    <Icon style={{padding: 10}} name="chevron-right" size={25} color={'#4BC29C'} />
                </TouchableOpacity>
            </View>
         </View>
        );
      }
    
    return (
        <View>
             <View style={{marginTop: 20, flexDirection: 'row',justifyContent: 'space-between', alignItems: 'center',marginHorizontal: 20, marginBottom: 20}}>
                <Text style={{color: 'gray', fontWeight: 'bold', fontSize: 20}}>Agreements</Text>
                {(user_id == community.admin || user_id == community.president )?
                 <CustomButton onPressed={() => {navigation.navigate('addagreement', {community_id: community_id})}} size='xs'>add</CustomButton>
                 : null
                }
            </View>
            <View style={[theme.components.Card.style, styles.card]}>            
                {community.agreements.length != 0 ? 
                    <FlatList
                        data={community.agreements}
                        renderItem={itemList}
                        keyExtractor={item => item.id}
                        ItemSeparatorComponent={Separador}
                        />
                    : <Text style={styles.text}>There is no agreements</Text> }
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    card:{
        marginHorizontal: 10,
        borderRadius: 15, 
    },
    text: {fontSize: 16,alignSelf: 'flex-start', fontWeight: 'normal'},
    description: {
        color: 'black',
        fontSize: 16,
        fontWeight: 'bold'
    },
    date_time:{
        color: 'gray'
    }
});

export default AgreementScreen;