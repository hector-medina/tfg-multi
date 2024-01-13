
import Constants from 'expo-constants';

const BACKEND_URL = Constants.expoConfig.extra.API_URL; 

const isObjectEmpty = (objectName) => {
    return Object.keys(objectName).length === 0
}

export const fetchData = async ({url, data={}, multipart=false, formData=null, authToken=null, method='GET'}) => {

    const full_url = BACKEND_URL + url;
    
    const headers = {};
    if(multipart){
        headers['Content-Type'] = 'multipart/form-data';
    } else {
        headers['Content-Type'] = 'application/json';
    }

    if (authToken) {
        headers.Authorization = `Token ${authToken}`;
    }

    const options = {};
    options.headers = headers;
    options.method = method;
    
    if(!isObjectEmpty(data)){
        options.body = JSON.stringify(data);
    }

    if(multipart){
        options.body = formData;
    }
    try {
        const respuesta = await fetch(full_url,options);
        var data_json = {};
        if (respuesta.status >= 200 && respuesta.status < 300) {
            if(respuesta.status != 204) {
                data_json = await respuesta.json();
            }
            return data_json;
        } else {
            data_json = await respuesta.json();
            throw new Error(`${JSON.stringify(data_json)} `);
        }
    } catch (error) {
      throw new Error(error.message);
    }
  };
