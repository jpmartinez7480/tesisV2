export const setSignalHistory = (signals_history) =>{
    return (dispatch) => {
        return dispatch({type:'UPDATE_SIGNAL_HISTORY',signals_history})
    }
}