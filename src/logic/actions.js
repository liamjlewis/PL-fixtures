import fetch from 'isomorphic-fetch'

import { endpoints, SUCCESSFUL_REQ_LIST, RECEIVED_POSTS } from './constants'

function successfulReqList(dataName, teamNum) {
	var timeStamp = new Date();
	timeStamp = timeStamp.getTime();
  return {
    type: SUCCESSFUL_REQ_LIST,
    dataName,
    timeStamp,
    teamNum
  }
}

function receivedPosts(dataName, json, teamNum) {
  return {
    type: RECEIVED_POSTS,
    dataName,
    json,
    teamNum
  }
}

export function requestData(dataName, teamNum) {
	(teamNum) && (teamNum = parseInt(teamNum, 10)); // just in case it recieves a string
	return dispatch => {
    return fetch((teamNum) ? endpoints[dataName](teamNum) : endpoints[dataName], {headers: {'X-Auth-Token': '06fabd0fc83640c886c32345b88a6f54'}})
      .then(response => response.json())
      .then(json => dispatch(receivedPosts(dataName, json, teamNum)))
      .then( dispatch(successfulReqList(dataName, teamNum)) )
  }
}