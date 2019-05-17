function getSignal(state=[],action){
    switch(action.type){
        case 'LOAD_VSFI':    
            return Object.assign([],state, action.vsfi)
        default:
            return state
    }
}

export default getSignal