export const setSignalReady = (booleanSignal) =>{
    return (dispatch) => {
        return dispatch({type:'SET_SIGNALREADY',booleanSignal})
    }
}