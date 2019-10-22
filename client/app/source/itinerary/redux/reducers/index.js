import {combineReducers} from 'redux';
import LocationReducer from './location'
import ItineraryReducer from './Itinerary'
import RatingsReducer from './Ratings'

const allItineraryReducers = combineReducers({
    Location: LocationReducer,
    Itinerary: ItineraryReducer,
    Ratings: RatingsReducer,
});

export default allItineraryReducers;