
export function dateConvert(string, timeToggle){

  //Convert month into text form
  let d = new Date(string);
  let m = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sept','Oct','Nov','Dec'];

  //Parse time in human-readable format
  const timeStart = (string.search('T') + 1)
  const theTime = timeToggle ? string.slice(timeStart, (timeStart + 5)) : ''

  return d.getDate()+'/'+m[d.getMonth()]+'/'+d.getFullYear()+' '+theTime;
}