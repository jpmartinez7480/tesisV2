function getSignal(state=[],action){
    switch(action.type){
        case 'LOAD_VSFD':    
            return Object.assign([],state, action.vsfd)
        default:
            return state
    }
}

export default getSignal