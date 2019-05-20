function getSignalReady(state=false,action){
    switch(action.type){
        case 'SET_SIGNALREADY':    
            return Object.assign(false,state, action.signalReady)
        default:
            return state
    }
}

export default getSignalReady