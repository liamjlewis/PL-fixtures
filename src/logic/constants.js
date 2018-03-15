export const FETCHING_TOGGLE = 'FETCHING_TOGGLE';
export const RECEIVED_POSTS = 'RECEIVED_POSTS';

export const endpoints = { 
	PL: 'http://api.football-data.org/v1/competitions/445',
	teams: 'http://api.football-data.org/v1/competitions/445/teams',
	table: 'http://api.football-data.org/v1/competitions/445/leagueTable',
	fixtures: 'http://api.football-data.org/v1/competitions/445/fixtures',
	teamFixtures: (teamNum) => 'http://api.football-data.org/v1/teams/'+teamNum+'/fixtures',
	teamByNum: (teamNum) => 'http://api.football-data.org/v1/teams/'+teamNum,
};