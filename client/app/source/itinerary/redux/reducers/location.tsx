import { getLocations } from "../../api/locationsAPI";

const initialState = {
    isLoaded: false,
    locations: null
}

const Location = (state = initialState, action) => {
    switch (action.type) {
        case "LOAD_LOCATIONS":
            getLocations().then(val => {
                return Object.assign({}, state, {isLoaded: true, locations: val});
            });
        case "GET_LOCATIONS":
            return state;
        default:
            return state;
    };
};

export default Location;