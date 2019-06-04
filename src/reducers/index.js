import { combineReducers } from 'redux'
import signalReducers from './reducers.signal'
import vsfdReducers from './reducers.vsfd'
import vsfiReducers from './reducers.vsfi'
import psaReducers from './reducers.psa'
import co2Reducers from './reducers.co2'
import xpointsReducer from './reducers.xpoints'
import signalReadyReducer from './reducers.signalReady'
import indexSignalReducers from './reducers.index_signal'
import signalHistoryReducers from './reducers.signals_history'
const allReducers = combineReducers({
    signal_global: signalReducers,
    vsfd_global: vsfdReducers,
    vsfi_global: vsfiReducers,
    psa_global: psaReducers,
    co2_global: co2Reducers,
    x_points_global: xpointsReducer,
    signal_state_global: signalReadyReducer,
    indexSignal: indexSignalReducers,
    signalHistory: signalHistoryReducers

})

export default allReducers;