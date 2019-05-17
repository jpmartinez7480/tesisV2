function getSignal(state=[],action){
    switch(action.type){
        case 'LOAD_PSA':    
            return Object.assign([],state, action.psa)
        default:
            return state
    }
}

export default getSignal