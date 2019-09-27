const UserInfoReducer = (state = {}, action) => {
    switch(action.type){
        case "SET_ACCESS_TOKEN":
            return {...state, accessToken: action.payload};
        default:
            return state;
    };
};

export default UserInfoReducer;