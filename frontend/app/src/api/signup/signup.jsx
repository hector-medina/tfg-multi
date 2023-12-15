export const NormalizeSignup = ({data={}}) => {

    const user = {};
    user.email = data.email;
    user.username = data.username;
    user.password = data.password;
    user.acceptsPrivacyPolicy = true;

    return user;
}