function getPoints(state=[],action){
    switch(action.type){
        case 'LOAD_POINTS':    
            return Object.assign([],state, action.xpoints)
        default:
            return state
    }
}

export default getPoints