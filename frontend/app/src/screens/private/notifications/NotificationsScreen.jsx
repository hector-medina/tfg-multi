import React, { useState, useEffect } from "react";
import { ScrollView, View, Text, StyleSheet } from "react-native";
import theme from "./../../../../src/theme";
import { useSelector } from 'react-redux';
import { fetchData } from "../../../api/utils/useFetch";
import CardImage from "../../../components/cards/CardImage";
import CustomButton from "../../../components/buttons/CustomButton";
import Icon from 'react-native-vector-icons/FontAwesome';


const NotificationsScreen = ({navigation}) => {
   
    const authToken = useSelector((state) => state.auth.token);
    const user_id =  useSelector((state) => state.user.id);

    const [notifications, setNotifications] = useState([]);
    const [communities, setCommunities] = useState([])

    useEffect(() => {
        if (user_id !== null && authToken !== null ) {
            navigation.addListener('focus', async () => {
                await getData();
            })  
        }
    }, [user_id, authToken]);
    
    const getData = async () => {
        
        try{
            var url = '/accounts/'+user_id+'/notifications/';
            const data = await fetchData({url: url, authToken: authToken});
            console.log(data);
            setNotifications(data);
            
            url = '/accounts/'+user_id+'/communities-manager/';
            const data_communities = await fetchData({url: url, authToken: authToken});
            console.log(data_communities);
            setCommunities(data_communities);
        }
        catch (error){
            console.log(error);
        }
    }


    return (
        <ScrollView style={styles.container}> 
            {
                communities.length != 0 &&
                
                <View style={styles.button_container}>
                    <CustomButton size='xs' onPressed={() => {navigation.navigate('addnotification')}}>
                        Add
                    </CustomButton>
                </View>
            
            }

            {
                notifications.length != 0 ? notifications.map((notification) => {

                    return (
                            <CardImage 
                                key={notification.id}
                                id={notification.id}
                                icon={'info-circle'}
                                navigation={navigation}
                                title={notification.title}
                                description={notification.description}
                                timestamp={notification.creation_date}
                                url='detailnotifications'
                                url_options={{notification_id: notification.id}}
                            />
                    );
                })

                : null
            }
        </ScrollView>
    );

}

const styles = StyleSheet.create({
    container: {
        paddingVertical: 20,
        paddingHorizontal: 20,
    },
    card: {
        flexDirection: 'row',
        marginBottom: 10
    },

    left: {
        justifyContent: 'center',
    },
    middle:{
        flex: 1,
        marginHorizontal: 10,
    },
    right: {
        justifyContent: 'center',
        alignItems: 'flex-end',
        color: 'gray'
    },
    text: {
        color: 'gray'
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    icon_navbar: {
        fontSize: 18, 
        color: '#4BC29C'
    },
    button_container: {
        flex: 1,
        alignItems: 'flex-end',
    }
});


export default NotificationsScreen;