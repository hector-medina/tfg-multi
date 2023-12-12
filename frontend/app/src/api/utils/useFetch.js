const BACKEND_URL = 'http://192.168.100.17'; 


export const fetchData = async ({url, data={}}) => {

    const full_url = BACKEND_URL + url;

    try {
        const respuesta = await fetch(full_url,{
            method: 'POST',    
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
        const data_json = await respuesta.json();
        if (respuesta.ok) {
            return data_json;
        } else {
            throw new Error(`${respuesta.status}: ${JSON.stringify(data_json)} `);
        }
    } catch (error) {
      throw new Error(`Error ${error.message}`);
    }
  };
