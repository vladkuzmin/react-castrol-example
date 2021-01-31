import { SET_MUTED } from '../actions/index';

export default function(state = false, action) {
    switch(action.type) {
        case SET_MUTED:
            return action.boolean
        default:
          return state
    }
}
