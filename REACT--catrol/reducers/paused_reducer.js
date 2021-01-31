import { SET_PAUSED } from '../actions/index';

export default function(state = false, action) {
    switch(action.type) {
        case SET_PAUSED:
            return action.boolean
        default:
          return state
    }
}
