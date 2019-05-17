import Axios from 'axios';

const url = 'http://localhost/ocpu/user/juanpablo/library/readFile2/R/read_signal_file/json'

export const loadSignal = (formData) =>{

    return (dispatch,getState) => {
        dispatch({
            type: "LOADING_SIGNAL",
            payload: {formData}
        });

        return Axios({
            method: 'POST',
            url: url,
            data: formData
        })
        .then(payload => dispatch({type:'LOAD_SIGNAL',payload}))
        //.then(payload => {console.log(payload.data)})
    }
}
