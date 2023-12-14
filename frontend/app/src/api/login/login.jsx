export const NormalizeLogin = ({data={}}) => {

    const user = {};
    user.username = data.username;
    user.password = data.password;

    return user;
}