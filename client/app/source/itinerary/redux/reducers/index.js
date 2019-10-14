import {combineReducers} from 'redux';
import GMapReducer from './GMap'
import ItineraryReducer from './Itinerary'
import RatingsReducer from './Ratings'

const allItineraryReducers = combineReducers({
    GMap: GMapReducer,
    Itinerary: ItineraryReducer,
    Ratings: RatingsReducer,
});

export default allItineraryReducers;