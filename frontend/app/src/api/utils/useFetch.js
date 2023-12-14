import { getValueFor } from '../../api/utils/Token';

const BACKEND_URL = 'http://192.168.100.17'; 

const isObjectEmpty = (objectName) => {
    return Object.keys(objectName).length === 0
}

export const fetchData = async ({url, data={}, auth=true, method='GET'}) => {

    const full_url = BACKEND_URL + url;
    
    const headers = {};
    headers['Content-Type'] = 'application/json';
    if (auth) {
        headers.Authorization = `Token ${await getValueFor({key: 'token'})}`;
    }

    const options = {};
    options.headers = headers;
    options.method = method;
    if(!isObjectEmpty(data)){
        options.body = JSON.stringify(data);
    }

    try {
        const respuesta = await fetch(full_url,options);
        const data_json = await respuesta.json();
        if (respuesta.ok) {
            return data_json;
        } else {
            throw new Error(`${JSON.stringify(data_json)} `);
        }
    } catch (error) {
      throw new Error(error.message);
    }
  };
