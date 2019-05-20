export const setXPoints = (points) =>{
    return (dispatch) => {
        return dispatch({type:'LOAD_POINTS',points})
    }
}