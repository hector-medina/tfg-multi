const initialState = {
    id: null,
  };
  
  const idReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'SET_USER_ID':
        return { ...state, id: action.payload };
      case 'REMOVE_USER_ID':
        return { ...state, id: null };
      default:
        return state;
    }
  };
  
  export default idReducer;
  