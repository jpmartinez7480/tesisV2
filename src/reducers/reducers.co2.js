function getSignal(state=[],action){
    switch(action.type){
        case 'LOAD_CO2':    
            return Object.assign([],state, action.co2)
        default:
            return state
    }
}

export default getSignal