const initialState = {
    token: null,
  };
  
  const authReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'SET_AUTH_TOKEN':
        return { ...state, token: action.payload };
      case 'REMOVE_AUTH_TOKEN':
        return { ...state, token: null };
      default:
        return state;
    }
  };
  
  export default authReducer;
  