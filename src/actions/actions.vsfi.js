export const setSignalVSFI = (vsfi) =>{
    return (dispatch) => {
        return dispatch({type:'LOAD_VSFI',vsfi})
    }
}