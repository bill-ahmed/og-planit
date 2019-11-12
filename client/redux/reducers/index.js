import {combineReducers} from 'redux';
import UserInfoReducer from '../../app/source/login/redux/reducers/UserInfo';

const allReducers = combineReducers({
    UserInfo: UserInfoReducer
});

export default allReducers;