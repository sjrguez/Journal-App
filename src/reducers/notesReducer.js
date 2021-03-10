import { Types } from "../types/types";


const initialState = {
    notes: [],
    active: null
}


export const notesReducer = (state = initialState, action ) => {

    const payload = action.payload

    switch (action.type) {
        case Types.notesActive:
            return {
                ...state,
                active: {
                    ...payload
                }
            }
        
        case Types.notesAddNew: 
            return  {
                ...state,
                notes: [action.payload, ...state.notes]
            }

        case Types.notesLoad:
            return {
                ...state,
                notes: [...payload]
            }
            
        case Types.notesUpdated:
                console.log(payload);
            
            return {
                ...state,
                notes: state.notes.map(not => {
                    if(not.id === payload) return payload
                    return not
                })
            }
    
        case Types.notesDelete:
            return {
                ...state,
                active: null,
                notes: state.notes.filter(not => not.id != payload)
            }

        case Types.notesLogoutCleaning:
            return {
                ...state,
                notes: [],
                active: null
            }
        default:
            return state;
    }
}