import { FETCH_CONTENT } from '../actions/index';

const INITIAL_STATE = {all: {}, loading: true};

export default function(state = INITIAL_STATE, action) {
    switch(action.type) {
        case FETCH_CONTENT:
            return {
                all: action.payload.data,
                loading: false
            }
        default:
            return state;
    }
}