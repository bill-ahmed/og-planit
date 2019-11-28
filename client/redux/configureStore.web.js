/*Redux dependencies */
import {createStore} from 'redux';
import allReducers from './reducers';
import { persistStore, persistReducer } from 'redux-persist'
// import storage from 'redux-persist/lib/storage' // defaults to localStorage for web
import localForage from "localforage";

const storage = localForage;

// To be used for storage
// import AsyncStorage from '@react-native-community/async-storage';

// Configuration for persisting the redux state
const persistConfig = {
    key: 'primary',
    storage,
};

const persistedReducer = persistReducer(persistConfig, allReducers);

/**Create a persisten store for Redux */
export default function createReduxStore(){
    // Second parameter enables remote debugging
    const STORE = createStore(persistedReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),);
    const PERSISTOR = persistStore(STORE);

    return [STORE, PERSISTOR];
};
