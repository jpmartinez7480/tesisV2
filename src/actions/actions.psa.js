export const setSignalPSA = (psa) =>{
    return (dispatch) => {
        return dispatch({type:'LOAD_PSA',psa})
    }
}