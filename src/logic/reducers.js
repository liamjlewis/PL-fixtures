import { combineReducers } from 'redux';
import { FETCHING_TOGGLE, RECEIVED_POSTS } from './constants'

export const dataInitState = {
	PL: null,
	teams: null,
	table: null,
	fixtures: null,
	teamFixtures: null,
	teamByNum: null,
};

export const serverActivityInitState = {
	PL: { isFetching: false, error: '', },
	teams: { isFetching: false, error: '', },
	table: { isFetching: false, error: '', },
	fixtures: { isFetching: false, error: '', },
	teamFixtures: { isFetching: false, error: '', },
	teamByNum: { isFetching: false, error: '', },
};

function data(state = dataInitState, action){
	switch (action.type) {
		case RECEIVED_POSTS:
			//save the team info with the number reference to that team
			if(action.teamNum) {
				return Object.assign({}, state, {[action.dataName]:{...state[action.dataName], [action.teamNum]: action.json}});
			}else {
				//Store state items that don't have nested children
				return Object.assign({}, state, {[action.dataName]: action.json});
			}
		default:
		  return state
	}
}

function serverActivity(state = serverActivityInitState, action){
	switch (action.type) {
    case FETCHING_TOGGLE:
			return Object.assign({}, state, {[action.dataName]:{...state[action.dataName], isFetching: action.bool, error: action.error}});
    default:
      return state
  }
}

const rootReducer = combineReducers({
  data,
  serverActivity,
})

export default rootReducer;