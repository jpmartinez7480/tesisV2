function getSignal(state=[],action){
    switch(action.type){
        case 'LOAD_SIGNAL':
            state = []
            return Object.assign([],state, action.payload.data)
        default:
            return state
    }
}

export default getSignal