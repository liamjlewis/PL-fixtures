import { combineReducers } from 'redux';
import { UPDATE_REQ_LIST, RECEIVED_POSTS } from './constants'

export const dataInitState = {
	PL: {"_links":{"self":{"TESThref":"http://api.football-data.org/v1/competitions/445"},"teams":{"href":"http://api.football-data.org/v1/competitions/445/teams"},"fixtures":{"href":"http://api.football-data.org/v1/competitions/445/fixtures"},"leagueTable":{"href":"http://api.football-data.org/v1/competitions/445/leagueTable"}},"id":445,"caption":"Premier League 2017/18","league":"PL","year":"2017","currentMatchday":90000,"numberOfMatchdays":38,"numberOfTeams":20,"numberOfGames":380,"lastUpdated":"2017-10-30T22:10:08Z"},
	teams: {"_links":{"self":{"href":"http://api.football-data.org/v1/competitions/445/teams"},"competition":{"href":"http://api.football-data.org/v1/competitions/445"}},"count":20,"teams":[{"_links":{"self":{"href":"http://api.football-data.org/v1/teams/57"},"fixtures":{"href":"http://api.football-data.org/v1/teams/57/fixtures"},"players":{"href":"http://api.football-data.org/v1/teams/57/players"}},"name":"Arsenal FC","code":"AFC","shortName":"Arsenal","squadMarketValue":null,"crestUrl":"http://upload.wikimedia.org/wikipedia/en/5/53/Arsenal_FC.svg"},{"_links":{"self":{"href":"http://api.football-data.org/v1/teams/338"},"fixtures":{"href":"http://api.football-data.org/v1/teams/338/fixtures"},"players":{"href":"http://api.football-data.org/v1/teams/338/players"}},"name":"Leicester City FC","code":"LCFC","shortName":"Foxes","squadMarketValue":null,"crestUrl":"http://upload.wikimedia.org/wikipedia/en/6/63/Leicester02.png"},{"_links":{"self":{"href":"http://api.football-data.org/v1/teams/346"},"fixtures":{"href":"http://api.football-data.org/v1/teams/346/fixtures"},"players":{"href":"http://api.football-data.org/v1/teams/346/players"}},"name":"Watford FC","code":"Watfordfc","shortName":"Watford","squadMarketValue":null,"crestUrl":"https://upload.wikimedia.org/wikipedia/en/e/e2/Watford.svg"},{"_links":{"self":{"href":"http://api.football-data.org/v1/teams/64"},"fixtures":{"href":"http://api.football-data.org/v1/teams/64/fixtures"},"players":{"href":"http://api.football-data.org/v1/teams/64/players"}},"name":"Liverpool FC","code":"LFC","shortName":"Liverpool","squadMarketValue":null,"crestUrl":"http://upload.wikimedia.org/wikipedia/de/0/0a/FC_Liverpool.svg"},{"_links":{"self":{"href":"http://api.football-data.org/v1/teams/340"},"fixtures":{"href":"http://api.football-data.org/v1/teams/340/fixtures"},"players":{"href":"http://api.football-data.org/v1/teams/340/players"}},"name":"Southampton FC","code":"SFC","shortName":"Southampton","squadMarketValue":null,"crestUrl":"http://upload.wikimedia.org/wikipedia/de/c/c9/FC_Southampton.svg"},{"_links":{"self":{"href":"http://api.football-data.org/v1/teams/72"},"fixtures":{"href":"http://api.football-data.org/v1/teams/72/fixtures"},"players":{"href":"http://api.football-data.org/v1/teams/72/players"}},"name":"Swansea City FC","code":"SWA","shortName":"Swans","squadMarketValue":null,"crestUrl":"http://upload.wikimedia.org/wikipedia/de/a/ab/Swansea_City_Logo.svg"},{"_links":{"self":{"href":"http://api.football-data.org/v1/teams/74"},"fixtures":{"href":"http://api.football-data.org/v1/teams/74/fixtures"},"players":{"href":"http://api.football-data.org/v1/teams/74/players"}},"name":"West Bromwich Albion FC","code":"WBA","shortName":"West Bromwich","squadMarketValue":null,"crestUrl":"http://upload.wikimedia.org/wikipedia/de/8/8b/West_Bromwich_Albion.svg"},{"_links":{"self":{"href":"http://api.football-data.org/v1/teams/1044"},"fixtures":{"href":"http://api.football-data.org/v1/teams/1044/fixtures"},"players":{"href":"http://api.football-data.org/v1/teams/1044/players"}},"name":"AFC Bournemouth","code":"AFCB","shortName":"Bournemouth","squadMarketValue":null,"crestUrl":"https://upload.wikimedia.org/wikipedia/de/4/41/Afc_bournemouth.svg"},{"_links":{"self":{"href":"http://api.football-data.org/v1/teams/62"},"fixtures":{"href":"http://api.football-data.org/v1/teams/62/fixtures"},"players":{"href":"http://api.football-data.org/v1/teams/62/players"}},"name":"Everton FC","code":"EFC","shortName":"Everton","squadMarketValue":null,"crestUrl":"http://upload.wikimedia.org/wikipedia/de/f/f9/Everton_FC.svg"},{"_links":{"self":{"href":"http://api.football-data.org/v1/teams/70"},"fixtures":{"href":"http://api.football-data.org/v1/teams/70/fixtures"},"players":{"href":"http://api.football-data.org/v1/teams/70/players"}},"name":"Stoke City FC","code":"SCFC","shortName":"Stoke","squadMarketValue":null,"crestUrl":"http://upload.wikimedia.org/wikipedia/de/a/a3/Stoke_City.svg"},{"_links":{"self":{"href":"http://api.football-data.org/v1/teams/354"},"fixtures":{"href":"http://api.football-data.org/v1/teams/354/fixtures"},"players":{"href":"http://api.football-data.org/v1/teams/354/players"}},"name":"Crystal Palace FC","code":"CRY","shortName":"Crystal","squadMarketValue":null,"crestUrl":"http://upload.wikimedia.org/wikipedia/de/b/bf/Crystal_Palace_F.C._logo_(2013).png"},{"_links":{"self":{"href":"http://api.football-data.org/v1/teams/394"},"fixtures":{"href":"http://api.football-data.org/v1/teams/394/fixtures"},"players":{"href":"http://api.football-data.org/v1/teams/394/players"}},"name":"Huddersfield Town","code":"HTAFC","shortName":"Huddersfield","squadMarketValue":null,"crestUrl":"https://upload.wikimedia.org/wikipedia/en/5/5a/Huddersfield_Town_A.F.C._logo.svg"},{"_links":{"self":{"href":"http://api.football-data.org/v1/teams/61"},"fixtures":{"href":"http://api.football-data.org/v1/teams/61/fixtures"},"players":{"href":"http://api.football-data.org/v1/teams/61/players"}},"name":"Chelsea FC","code":"CFC","shortName":"Chelsea","squadMarketValue":null,"crestUrl":"http://upload.wikimedia.org/wikipedia/de/5/5c/Chelsea_crest.svg"},{"_links":{"self":{"href":"http://api.football-data.org/v1/teams/328"},"fixtures":{"href":"http://api.football-data.org/v1/teams/328/fixtures"},"players":{"href":"http://api.football-data.org/v1/teams/328/players"}},"name":"Burnley FC","code":"BFC","shortName":"Burnley","squadMarketValue":null,"crestUrl":"https://upload.wikimedia.org/wikipedia/en/0/02/Burnley_FC_badge.png"},{"_links":{"self":{"href":"http://api.football-data.org/v1/teams/397"},"fixtures":{"href":"http://api.football-data.org/v1/teams/397/fixtures"},"players":{"href":"http://api.football-data.org/v1/teams/397/players"}},"name":"Brighton & Hove Albion","code":"BHAFC","shortName":"Brighton","squadMarketValue":null,"crestUrl":"https://upload.wikimedia.org/wikipedia/en/f/fd/Brighton_&_Hove_Albion_logo.svg"},{"_links":{"self":{"href":"http://api.football-data.org/v1/teams/65"},"fixtures":{"href":"http://api.football-data.org/v1/teams/65/fixtures"},"players":{"href":"http://api.football-data.org/v1/teams/65/players"}},"name":"Manchester City FC","code":"MCFC","shortName":"ManCity","squadMarketValue":null,"crestUrl":"https://upload.wikimedia.org/wikipedia/en/e/eb/Manchester_City_FC_badge.svg"},{"_links":{"self":{"href":"http://api.football-data.org/v1/teams/67"},"fixtures":{"href":"http://api.football-data.org/v1/teams/67/fixtures"},"players":{"href":"http://api.football-data.org/v1/teams/67/players"}},"name":"Newcastle United FC","code":"NUFC","shortName":"Newcastle","squadMarketValue":null,"crestUrl":"http://upload.wikimedia.org/wikipedia/de/5/56/Newcastle_United_Logo.svg"},{"_links":{"self":{"href":"http://api.football-data.org/v1/teams/73"},"fixtures":{"href":"http://api.football-data.org/v1/teams/73/fixtures"},"players":{"href":"http://api.football-data.org/v1/teams/73/players"}},"name":"Tottenham Hotspur FC","code":"THFC","shortName":"Spurs","squadMarketValue":null,"crestUrl":"http://upload.wikimedia.org/wikipedia/de/b/b4/Tottenham_Hotspur.svg"},{"_links":{"self":{"href":"http://api.football-data.org/v1/teams/66"},"fixtures":{"href":"http://api.football-data.org/v1/teams/66/fixtures"},"players":{"href":"http://api.football-data.org/v1/teams/66/players"}},"name":"Manchester United FC","code":"MUFC","shortName":"ManU","squadMarketValue":null,"crestUrl":"http://upload.wikimedia.org/wikipedia/de/d/da/Manchester_United_FC.svg"},{"_links":{"self":{"href":"http://api.football-data.org/v1/teams/563"},"fixtures":{"href":"http://api.football-data.org/v1/teams/563/fixtures"},"players":{"href":"http://api.football-data.org/v1/teams/563/players"}},"name":"West Ham United FC","code":"WHU","shortName":"West Ham","squadMarketValue":null,"crestUrl":"http://upload.wikimedia.org/wikipedia/de/e/e0/West_Ham_United_FC.svg"}]},
};

export const requestsInitState = {
	currentRequests: [],
};

function data(state = dataInitState, action){
	switch (action.type) {
		case RECEIVED_POSTS:

			console.log('received posts: '+action.dataName+' • '+ action.dataName);
			var obj = {};
			obj[action.dataName] = action.json;
			window.z = Object.assign({}, state, obj);
			return Object.assign({}, state, obj);

		default:
		  return state
	}
}

function requests(state= requestsInitState, action){
	switch (action.type) {
    case UPDATE_REQ_LIST:

    	let newArr
    	state.currentRequests.find( (item) => item === action.dataName )
    	?	newArr = state.currentRequests
    	: newArr = [...state.currentRequests, action.dataName];
    	console.log('A: '+JSON.stringify(state));
    	console.log('B: '+newArr);
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