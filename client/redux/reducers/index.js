import {combineReducers} from 'redux';
import UserInfoReducer from '../../app/source/login/redux/reducers/UserInfo';
import allItineraryReducers from '../../app/source/itinerary/redux/reducers/index'

const allReducers = combineReducers({
    UserInfo: UserInfoReducer,
    allItinerary: allItineraryReducers
});

export default allReducers;