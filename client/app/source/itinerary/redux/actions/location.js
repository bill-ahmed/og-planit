// All actions that can be performed for Redux store

/**Load Locations from DB*/
export const loadLocations = () => {
    return {
        type: 'LOAD_LOCATIONS'
    };
};

/**Get stored auth token (JWT) */
export const getLocations = () => {
    return{
        type: 'GET_LOCATIONS',
    };
};