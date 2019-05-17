export const setSignalCO2 = (co2) =>{
    return (dispatch) => {
        return dispatch({type:'LOAD_CO2',co2})
    }
}