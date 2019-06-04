export const setIndexSignal = (indexSignal) =>{
    return (dispatch) => {
        return dispatch({type:'CHANGE_INDEX',indexSignal})
    }
}