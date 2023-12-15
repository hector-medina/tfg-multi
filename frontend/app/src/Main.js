import React from "react";
import { useSelector } from 'react-redux';

import PublicRoutes from './routes/PublicRoutes';
import PrivateRoutes from './routes/PrivateRoutes';

const Main = () => {

    const authToken = useSelector((state) => state.auth.token);

    console.log(authToken);

    return (
        authToken ? <PrivateRoutes/> : <PublicRoutes/>
    );

}


export default Main;