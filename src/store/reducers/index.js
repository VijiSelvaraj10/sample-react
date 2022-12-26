import { combineReducers } from 'redux';
import memberReducer from './memberReducer';
import productManagementReducer from './productManagementReducer';
import orderReducer from './orderReducer';
import medicalHistoryReducer from './medicalHistory';
import adonReducer from './adon';
import categoryReducer from './categoryReducer';
import couponReducer from './couponReducer';
import  AccountReducer  from './sessionReducer';

const rootReducer = combineReducers({
    memberReducer,
    productManagementReducer,
    orderReducer,
    medicalHistoryReducer,
    adonReducer,
    categoryReducer,
    couponReducer,
    AccountReducer

});

export default rootReducer;
