import { combineReducers } from 'redux'
import ConntentReducer from './content_reducer'
import VisitedReducer from './visited_reducer'
import mutedReducer from './muted_reducer'
import pausedReducer from './paused_reducer'

const rootReducer = combineReducers({
  content: ConntentReducer,
  visited: VisitedReducer,
  muted: mutedReducer,
  paused: pausedReducer
});

export default rootReducer;