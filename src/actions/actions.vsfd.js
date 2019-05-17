export const setSignalVSFD = (vsfd) =>{
    return (dispatch) => {
        return dispatch({type:'LOAD_VSFD',vsfd})
    }
}