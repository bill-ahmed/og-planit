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