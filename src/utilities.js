export function retriever(endpoint, stateToChange, teamNum, callback){
  let theEndpoint;
  switch (endpoint) {
        case 'PL':
            theEndpoint = "http://api.football-data.org/v1/competitions/445";
            break;
        case 'teams':
            theEndpoint = "http://api.football-data.org/v1/competitions/445/teams";
            break;
        case 'table':
            theEndpoint = "http://api.football-data.org/v1/competitions/445/leagueTable";
            break;
        case 'fixtures':
            theEndpoint = "http://api.football-data.org/v1/competitions/445/fixtures";
            break;
        case 'teamFixtures':
            theEndpoint = "http://api.football-data.org/v1/teams/"+teamNum+"/fixtures";
            break;
        case 'teamByNum':
            theEndpoint = "http://api.football-data.org/v1/teams/"+teamNum;
            break;
        default:
    				console.log('There was an error retrieving the API URL.');
    }

  let httpRequest = new XMLHttpRequest();
  let self = this;

    httpRequest.onreadystatechange = function(){
        if (httpRequest.readyState === XMLHttpRequest.DONE) {
          if (httpRequest.status === 200) {

            let placeholderObj = {};
            placeholderObj[stateToChange] = JSON.parse(httpRequest.responseText);
            self.setState(placeholderObj);
            callback && callback();

          } else {
            console.log('There was a problem with the request.');
          }
        }
    };
    httpRequest.open('GET', theEndpoint, true);
    httpRequest.setRequestHeader('X-Auth-Token', '06fabd0fc83640c886c32345b88a6f54');
    httpRequest.send();
}

export function matchHeights(elementClass){
  let matchThem = document.getElementsByClassName(elementClass);
  let topHeight = 0;
  for(let a in matchThem){
    if( !isNaN(parseInt(a, 10)) ){
      matchThem[a].style.height = 'auto';
      (matchThem[a].offsetHeight > topHeight) && (topHeight = matchThem[a].offsetHeight);
    }
  }
  for(let b in matchThem){
    if( !isNaN(parseInt(b, 10)) ){
      matchThem[b].style.height = topHeight+'px';
    }
  }
}