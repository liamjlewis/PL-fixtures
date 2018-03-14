import { combineReducers } from 'redux';
import { SUCCESSFUL_REQ_LIST, RECEIVED_POSTS } from './constants'

export const dataInitState = {
	PL: null,
	teams: null,
	table: null,
	fixtures: null,
	teamFixtures: null,
	teamByNum: null,
};

export const requestsInitState = {
	currentRequests: [],
};

function data(state = dataInitState, action){
	switch (action.type) {
		case RECEIVED_POSTS:
			var obj = {};
			if(action.dataName === 'teamByNum'){ //save the team info with the number reference to that team
				obj.teamByNum = {...state.teamByNum};
				obj.teamByNum[action.teamNum] = action.json;
			}else if(action.dataName === 'teamFixtures'){
				obj.teamFixtures = {...state.teamFixtures};
				obj.teamFixtures[action.teamNum] = action.json;
			}else{
				obj[action.dataName] = action.json; //store simple data
			}
			window.p = Object.assign({}, state, obj);
			return Object.assign({}, state, obj);

		default:
		  return state
	}
}

function requests(state = requestsInitState, action){
	switch (action.type) {
    case SUCCESSFUL_REQ_LIST:
    	let theData = action;
    	let newArr
    	delete theData.type;
    	if(state.currentRequests.length === 0){
	    	newArr = [...state.currentRequests, theData]; // if no data add ours
	    }else{
	    	let didOverwrite = false;
	    	newArr = state.currentRequests.map(function(item){
	    		if(item.dataName === action.dataName && item.teamNum === action.teamNum){ // overwriting needs to take place unless we have the same dataName but different teamNum
	    			didOverwrite = true;
	    			return theData;
	    		}else{
	    			return item;
	    		}
	    	});//DELETE - NEEDS TESTING WITH REPEATED API CALLS
		    (!didOverwrite)	&& newArr.push(theData) // if no overwriting took place we need to add the data to the end
	    }
    	return Object.assign({}, state, {currentRequests: newArr });

    default:
      return state
  }
}

const rootReducer = combineReducers({
  data,
  requests
})

export default rootReducer;