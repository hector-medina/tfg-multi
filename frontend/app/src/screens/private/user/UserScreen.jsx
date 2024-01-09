import { React, useEffect, useState } from "react";
import { Text, View, Button, Image, StyleSheet, ScrollView,TouchableWithoutFeedback, TouchableOpacity } from "react-native";
import { useDispatch, useSelector } from 'react-redux';
import { removeAuthToken, removeUserId } from "../../../../redux/actions/authActions";
import theme from "./../../../../src/theme";
import CustomButton from "./../../../../src/components/buttons/CustomButton";
import CardSmall from "../../../components/cards/CardSmall";
import { fetchData } from '../../../api/utils/useFetch';
import ErrorModal from "../../../components/modals/ErrorModal";
import Loading from "../../../components/loadings/Loading";
import * as ImagePicker from 'expo-image-picker';
import { Icon } from "@rneui/base";

const image = './../../../../assets/images/user/default_profile_pic.png';

const UserScreen = ({navigation}) => {
    
    const dispatch = useDispatch();
    const authToken = useSelector((state) => state.auth.token);
    const user_id = useSelector((state) => state.user.id);
    
    const [userImage, setUserImage] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [ErrorModalVisible, setErrorModalVisible] = useState(true);
    const [fetchErrors, setFetchErrors] = useState(null);
    const [user, setUser] = useState({        
        first_name: ' ', last_name: ' ', id: ' ',
        email: ' ', phone: ' ', address: ' ',
        dni: ' ', city: ' ', properties: [], communities: [], image: null
    })
    
    useEffect(() => {
        navigation.addListener('focus', () => {
            getData();
        })
    }, []);

    const getData = async () => {
        try{
            var url = '/accounts/'+user_id+'/';
            const data = await fetchData({url: url, authToken: authToken});
            setUser(data);
            if(data.image != null){
                url = '/accountmedias/'+data.image+'/';
                const data_image = await fetchData({url: url, authToken: authToken});
                setUserImage(data_image.image);
            }
        }
        catch (error){
            console.log(error);
            setErrorModalVisible(true)
            setFetchErrors(error.message);
        }
    }

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
        });
        if (!result.canceled) {
            const newImage = result.assets[0].uri;
            setUserImage(newImage);
            uploadImage({imagen: newImage});
        } else {
            console.log("No image selected, cancelled by the user.");
        }
      };

    const uploadImage = async ({imagen}) => {
        try{

            var url = '/accountmedias/';
            const formdata = new FormData();
            formdata.append('image',{
                uri: imagen, 
                name: "profile_"+user.id+".jpg"
            });
            const image_data = await fetchData({url: url, method: 'POST', multipart: true, formData: formdata, authToken: authToken});
            console.log(image_data);
            
            url = '/accounts/'+user.id+'/';
            const body = {
                image: image_data.id
            }
            const user_data = await fetchData({url: url, method: 'PATCH', data: body, authToken: authToken});
            console.log(user_data);
            setUser(user_data);
        } catch (error){
            console.log(error);
        }
    }

    function logout(){
        dispatch(removeAuthToken());
        dispatch(removeUserId());
    }

    const dissmiss = () => {
        setFetchErrors(null);
    }


    return (
        
        <ScrollView style={styles.container}> 

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

            <View style={{flexDirection: 'row', alignItems: 'flex-end'}}>
                <TouchableOpacity onPress={pickImage}>
                    { userImage == null ? 
                    <Image source={require(image)} style={styles.profileImage} />
                    : <Image source={{uri: userImage}} style={styles.profileImage} />
                    }
                </TouchableOpacity>
                <View style={ styles.editImage}>
                <TouchableOpacity  style={{backgroundColor: 'white', borderRadius: 50}} onPress={pickImage}>
                        <Icon name="edit" color={'#4BC29C'}/>
                </TouchableOpacity>
                </View>
                <View style={{flex:1,alignItems: 'flex-end'}}>
                    <Text style={[theme.components.Subtitle.style, {alignSelf: 'flex-end', fontSize: 20}]}>{ user.first_name ? user.first_name : 'Name' }</Text>
                    <Text style={[theme.components.Subtitle.style, {alignSelf: 'flex-end', fontSize: 20}]}>{ user.last_name ? user.last_name : 'Last name'}</Text>
                    <TouchableOpacity onPress={logout}>
                        <Text style={[theme.components.Link.style,{marginTop: 10, alignSelf: 'flex-end'}]}>Logout</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View>
                <View style={{ marginVertical: 10, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'baseline' }}>
                    <Text style={styles.title}>User</Text>
                    <CustomButton size='xs' onPressed={ () => {navigation.navigate('edituser', {user: user})} }>Edit</CustomButton>
                </View>
                <View style={[theme.components.Card.style, {marginBottom: 10, marginHorizontal: 0, flexDirection: 'row'}]}>
                    <View>
                        <Text style={{color: 'gray', fontSize: 16, fontWeight: 'bold'}}>Name: </Text>
                        <Text style={{color: 'gray', fontSize: 16, fontWeight: 'bold'}}>Last name: </Text>
                        <Text style={{color: 'gray', fontSize: 16, fontWeight: 'bold'}}>ID: </Text>
                        <Text style={{color: 'gray', fontSize: 16, fontWeight: 'bold'}}>Email: </Text>
                        <Text style={{color: 'gray', fontSize: 16, fontWeight: 'bold'}}>Phone: </Text>
                        <Text style={{color: 'gray', fontSize: 16, fontWeight: 'bold'}}>Address: </Text>
                    </View>
                    <View style={{flexShrink:1,alignItems: 'flex-end'}}>
                        <Text style={{color: 'gray', fontSize: 16}}> {user.first_name}</Text>
                        <Text style={{color: 'gray', fontSize: 16}}> {user.last_name}</Text>
                        <Text style={{color: 'gray', fontSize: 16}}> {user.dni}</Text>
                        <Text style={{color: 'gray', fontSize: 16}}> {user.email}</Text>
                        <Text style={{color: 'gray', fontSize: 16}}> {user.phone}</Text>
                        <Text style={{color: 'gray', fontSize: 16}}> 
                            { user.address != null ? user.address : ''}
                        </Text>
                    </View>
                </View>
            </View>
            <View>
                <View style={{ marginVertical: 10, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'baseline' }}>
                    <Text style={[styles.title]}>Properties</Text>
                </View>
                { user.properties == undefined | user.properties.length == 0 ?
                    <View style={ styles.small_card_container }>
                        <CardSmall title={'No properties found.'}/>
                    </View>
                    : user.properties.map((property, index) => {
                        return (
                            <View style={ styles.small_card_container } key={index}>
                                <CardSmall title={property.name} url={'detailproperty'} url_params={{property_id: property.id}}/>
                            </View>
                        );
                    })
                }
            </View>

            <View>
                <View style={{ marginVertical: 10, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'baseline' }}>
                    <Text style={[styles.title]}>Communities</Text>
                    <CustomButton size='xs' onPressed={ () => { navigation.navigate('addcommunity') } }>Add</CustomButton>
                </View>
                { user.communities == undefined || user.communities.length == 0 ?
                    <View style={ styles.small_card_container }>
                        <CardSmall title={'No communities found.'}/>
                    </View>
                    : user.communities.map((community, index) => {
                        return (
                            <View style={ styles.small_card_container } key={index}>
                                <CardSmall title={community.name} url={'detailcommunity'} url_params={{community_id: community.id}}/>
                            </View>
                        );
                    })
                }
            </View>
        </ScrollView>
        
    );

}

const styles = StyleSheet.create({
    title: {
        color: 'gray', 
        fontSize: 20, 
        fontWeight: 'bold', 
        marginTop: 10
    },
    container: {
        flex: 1,
        paddingHorizontal: 25,
        marginVertical: 10,
    },
    profileImage: {
        width: 75,
        height: 75, 
        borderRadius: 75,
        borderWidth: 2,
        backgroundColor: '#fff',
        borderColor: '#4BC29C',
        marginVertical: 5,
        marginHorizontal: 5,
        zIndex: 1,
      },
    small_card_container: {
        marginBottom: 20
    },
    editImage: { 
        ...StyleSheet.absoluteFillObject, 
        borderRadius: 100, 
        zIndex: 5, 
        marginLeft: 60, 
        padding:0,
        width: 25, 
        height: 25
    }
});

export default UserScreen;