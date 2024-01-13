import React from "react";
import { Text, View, StyleSheet, Image, TouchableWithoutFeedback } from "react-native";
import theme from '../../theme';
import { date_parser_day, date_parser_time } from "../../utils/utils";
import Icon from 'react-native-vector-icons/FontAwesome';

const CardImage = ({
    navigation=navigation,
    icon=null,
    image=null,
    image_render=() => {},
    description=null,
    timestamp=null,
    url=null,
    url_options={},
    id=null,
    title=null,
}) => {

    const default_image = './../../../assets/images/user/default_profile_pic.png';

    return (
        <TouchableWithoutFeedback onPress={() => {navigation.navigate(url, url_options)}} key={id}>
        <View style={[theme.components.Card.style, styles.card]}>
            <View style={styles.container}>
                <View style={ styles.left }>
                    {
                        icon == null ? 
                            image == null ?
                            <Image source={require(default_image)} style={styles.profileImage}/>
                            :
                            <Image source={{uri: image }} style={styles.profileImage}/>
                        :
                        <Icon style={styles.icon_info} name='info-circle' />
                    }
                </View>
                <View style={ styles.middle }>
                    
                    <Text style={ [theme.components.Subtitle.style, styles.field_title ] }>
                     {title} 
                    </Text>

                    {   description != null ? 
                            <Text style={{color: 'gray'}} numberOfLines={2} ellipsizeMode="tail">
                                {description}
                            </Text>
                        : 
                        <Text></Text>
                    }
                </View>
                <View style={ styles.right }>

                    {   timestamp != null ? 
                            <View style={{alignItems: 'flex-end'}}>
                                <Text numberOfLines={1} 
                                    ellipsizeMode="tail">
                                    {date_parser_day(timestamp)}
                                </Text>
                                <Text numberOfLines={1} 
                                    ellipsizeMode="tail">
                                    {date_parser_time(timestamp)}
                                </Text>
                            </View>
                        : 
                        <Text></Text>
                    }
                </View>
            </View>
        </View>
    </TouchableWithoutFeedback>
    );

}

const styles = StyleSheet.create({
    card: {
        marginVertical:10,
        marginHorizontal:0,
        marginBottom:0
    },
    container: {
        flex: 1,
        flexDirection: "row",
    },
    profileImage: {
        width: 50,
        height: 50, 
        borderRadius: 75,
        borderWidth: 2,
        backgroundColor: '#fff',
        borderColor: '#4BC29C',
        zIndex: 1,
      },
    left: {
        flex: 0.2,
        alignItems: 'flex-start',
        marginRight: 10,
    },
    middle: {
        flex: 1,
        alignItems: 'flex-start',
        justifyContent: 'space-around',
    },
    right: {
        alignItems: 'flex-end',
        justifyContent: 'center'
    },
    field_title: {
        alignSelf: 'flex-start'
    },    
    icon_info: {
        fontSize: 40, 
        color: '#4BC29C'
    }, 
});

export default CardImage;