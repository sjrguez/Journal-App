import { Types } from "../types/types"




export const setError = (err) => {
    return {
        type: Types.uiSetError,
        payload: err
    }
}


export const uiStartLoading = () => {
    return {
        type: Types.uiStartLoading
    }
}

export const uiFinishLoading = () => {
    return {
        type: Types.uiFinisthLoading
    }
}



export const removeError = () => {

    return {
        type: Types.uiRemoveError
    }
}



