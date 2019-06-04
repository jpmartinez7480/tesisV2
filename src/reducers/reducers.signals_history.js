function getSignal(state=[],action){
    console.log(action)
    switch(action.type){
        case 'UPDATE_SIGNAL_HISTORY':    
            return Object.assign([],state, action.signals_history)
        default:
            return state
    }
}

export default getSignal