function getIndexSignal(state=0,action){
    switch(action.type){
        case 'CHANGE_INDEX':    
            return Object.assign(state, action.indexSignal)
        default:
            return state
    }
}

export default getIndexSignal