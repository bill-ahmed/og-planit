const UserInfoReducer = (state = {}, action) => {
    switch(action.type){
        case "SET_ACCESS_TOKEN":
            return {...state, accessToken: action.payload};
        case "SET_USER_ID":
            return {...state, uid: action.payload};
        case "GET_ACCESS_TOKEN":
            return state;
        default:
            return state;
    };
};

export default UserInfoReducer;