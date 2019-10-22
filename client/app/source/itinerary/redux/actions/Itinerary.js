// All actions that can be performed for Redux store

/**Set authentication token (JWT) from for a user */
export const blah = (token) => {
    return {
        type: 'SET_ACCESS_TOKEN',
        payload: token,
    };
};

/**Get stored auth token (JWT) */
export const blah2 = () => {
    return{
        type: 'GET_ACCESS_TOKEN',
    };
};