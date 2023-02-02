import {ADD_EVENT,REMOVE_EVENT,UPDATE_EVENT} from './actions-types';

export const addEvent = (eventItem) => ({
    type: ADD_EVENT,
    payload: eventItem
})

export const removeEvent = (id) => ({
    type:REMOVE_EVENT,
    payload:id
})

export const updateEvent = (eventItem) => ({
    type:UPDATE_EVENT,
    payload:eventItem
})


