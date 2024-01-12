import React, {useState, useEffect} from "react";
import {Text, View, ScrollView, StyleSheet} from "react-native";
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { fetchData } from "../../../../api/utils/useFetch";
import CustomButton from "../../../../components/buttons/CustomButton";
import theme from "../../../../theme";
import Loading from "../../../../components/loadings/Loading";
import ErrorModal from "../../../../components/modals/ErrorModal";
import SuccessModal from "../../../../components/modals/SuccessModal";
import CustomPicker from "../../../../components/forms/CustomPicker";

const EditManagersScreen = ({route, navigation}) => {

  const authToken = useSelector((state) => state.auth.token);
  const user_id = useSelector((state) => state.user.id);
  
  const [modalVisible, setModalVisible] = useState(false);
  const [sucessModalVisible, setSucessModalVisible] = useState(false);
  const [ErrorModalVisible, setErrorModalVisible] = useState(true);
  const [fetchErrors, setFetchErrors] = useState(null);
  const [users, setUsers] = useState();

  const { control, handleSubmit } = useForm();
  const { community_id, admin_id, president_id } = route.params;

  useEffect(() => {
      navigation.addListener('focus', () => {
          getData();
      })
  }, []);


  const getData = async () => {
      try{
          const url = '/accounts/';
          const data = await fetchData({url: url, authToken: authToken});
          console.log(data);
          setUsers(data);
      }
      catch (error){
          console.log(error);
      }
  }

  const message_edition_successfully = [
    "Your managers have been updated successfully."
  ]

  const dissmiss = () => {
    setFetchErrors(null);
  }

  const editManagers = async (payload) => { 
    setModalVisible(true);
    try {
        var url = '/neighborhoods/'+community_id+'/';
        const managers = {}
        managers.admin = payload.administrator;
        managers.president = payload.president;
        var data = await fetchData({url: url, method:'PATCH', data:managers, authToken: authToken});
        console.log(data)
                  
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
      <ScrollView>

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

        <View style={ [theme.components.Card.style, styles.title] }>
          <Text style={ theme.components.Subtitle.style }>Edit the managers:</Text>
          <Text style={ [theme.components.Subtitle.style, styles.field_title] }>Administrator:</Text>

          <CustomPicker 
            name='administrator' 
            control={control} 
            display_name={['first_name', 'last_name', 'email']} 
            options={users} 
            selectedValue={admin_id} />

          <Text style={ [theme.components.Subtitle.style, styles.field_title] }>President:</Text>
          <CustomPicker 
            name='president' 
            control={control} 
            display_name={['first_name', 'last_name', 'email']} 
            options={users} 
            selectedValue={president_id} />

          <CustomButton size="xs"  onPressed={handleSubmit(editManagers)}>Edit managers</CustomButton>
          </View>
          <View>
        </View>
      </ScrollView>
    );
}

const styles = StyleSheet.create({
  title: {marginTop: 20},
  field_title: {marginTop: 20, alignSelf: 'flex-start'},
  button: {marginTop: 20}
});

export default EditManagersScreen;