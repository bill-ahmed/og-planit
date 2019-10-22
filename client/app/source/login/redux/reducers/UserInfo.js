const UserInfoReducer = (state = {}, action) => {
    switch(action.type){
        case "SET_ACCESS_TOKEN":
            return {accessToken: action.payload};
        case "GET_ACCESS_TOKEN":
            return state;
        default:
            return state;
    };
};

export default UserInfoReducer;