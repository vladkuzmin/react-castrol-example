import { SET_VISITED } from '../actions/index';

export default function(state = [], action) {
    switch(action.type) {
        case SET_VISITED:
            return [
              ...state,
              {
                text: action.text,
                completed: false
              }
            ]
        default:
          return state
    }
}
