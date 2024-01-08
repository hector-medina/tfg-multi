export const NormalizeUser = ({data={}}) => {

    const user = {};
    user.first_name = data.first_name;
    user.last_name = data.last_name;
    user.email = data.email;
    user.dni = data.dni;
    user.phone = data.phone;
    user.address = data.address;

    return user;
}

export const NormalizeUserEdit = ({data={}}) => {

    const user = NormalizeUser({data: data});
    
    for (var key in user) {
        if (user[key] === undefined) {
            delete user[key];
        }
    }

    return user;
}