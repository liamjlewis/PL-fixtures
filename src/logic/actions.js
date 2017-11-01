import fetch from 'isomorphic-fetch'

import { endpoints, UPDATE_REQ_LIST, RECEIVED_POSTS } from './constants'

function updateReqList(dataName) {
  return {
    type: UPDATE_REQ_LIST,
    dataName
  }
}

function receivedPosts(dataName, json) {
  return {
    type: RECEIVED_POSTS,
    dataName,
    json
  }
}

export function requestData(dataName) {
	return dispatch => {
		dispatch(updateReqList(dataName))
    return fetch(endpoints.PL, {headers: {'X-Auth-Token': '06fabd0fc83640c886c32345b88a6f54'}})
      .then(response => response.json())
      .then(json => dispatch(receivedPosts(dataName, json)))
  }
}