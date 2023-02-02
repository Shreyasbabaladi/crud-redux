import { createStore, combineReducers } from "redux";

import evenIteams from './reducer/evenIteams';

const rootReducer = combineReducers({
    evenIteams
})

const store = createStore(rootReducer);

export default store;