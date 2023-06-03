import { combineReducers } from 'redux';

import userReducer from './user_reducer';
import chatReducer from './chat_reducer';

const rootReducer = combineReducers({
    userReducer,
    chatReducer
})

export default rootReducer;