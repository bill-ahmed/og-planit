import {combineReducers} from 'redux';
import UserInfoReducer from './UserInfo';

const allReducers = combineReducers({
    UserInfo: UserInfoReducer,
});

export default allReducers;