// All actions that can be performed for Redux store

/**Set authentication token (JWT) from for a user */
export const setAccessToken = (token) => {
    return {
        type: 'SET_ACCESS_TOKEN',
        payload: token,
    };
};

/**Get stored auth token (JWT) */
export const getAccessToken = () => {
    return{
        type: 'GET_ACCESS_TOKEN',
    };
};

/**Set user information from db */
export const setUserInformation = (userData) => {
    return({
        type: 'SET_USER_INFO',
        payload: userData,
    });
}

/**Get all information about current user */
export const getAllUserInformation = () => {
    return({
        type: 'GET_ALL_USER_INFO',
    });
}

export const setUserID = (id) => {
    return({
        type: 'SET_USER_ID',
        payload: id
    })
}
