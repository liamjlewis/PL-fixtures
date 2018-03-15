import fetch from 'isomorphic-fetch'

import { endpoints, SUCCESSFUL_REQ_LIST, FETCHING_TOGGLE, RECEIVED_POSTS } from './constants'

function fetchingToggle(dataName, teamNum, bool, err) {
  const error = err ? err : ''
  return {
    type: FETCHING_TOGGLE,
    dataName,
    teamNum,
    bool,
    error,
  }
}

function receivedPosts(dataName, json, teamNum) {
  return {
    type: RECEIVED_POSTS,
    dataName,
    json,
    teamNum,
  }
}

export function requestData(dataName, teamNum) {
	(teamNum) && (teamNum = parseInt(teamNum, 10)); // just in case it recieves a string
	return dispatch => {
    dispatch(fetchingToggle(dataName, teamNum, true))
    return fetch((teamNum) ? endpoints[dataName](teamNum) : endpoints[dataName], {headers: {'X-Auth-Token': '06fabd0fc83640c886c32345b88a6f54'}})
      .then(response => response.json())
      .then( (json) => {
        dispatch(receivedPosts(dataName, json, teamNum))
        dispatch(fetchingToggle(dataName, teamNum, false))
      }).catch( () => {
        dispatch(fetchingToggle(dataName, teamNum, false, 'Failed to fetch from server'))
      })
  }
}