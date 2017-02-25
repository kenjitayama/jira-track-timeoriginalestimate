const JiraApi = require('jira-client');
const Sheets = require('./googleSheets');

//
// environment variables
// 
const host = process.env.JIRA_TRACK_TIMEORIGINALESTIMATE_HOST;
const port = process.env.JIRA_TRACK_TIMEORIGINALESTIMATE_PORT || 443;
const username = process.env.JIRA_TRACK_TIMEORIGINALESTIMATE_USERNAME;
const password = process.env.JIRA_TRACK_TIMEORIGINALESTIMATE_PASSWORD;
const apiVersion = process.env.JIRA_TRACK_TIMEORIGINALESTIMATE_APIVERSION || 2;

if ( !(host && port && username && password) ) {
  console.error('environment variables not set: JIRA_TRACK_TIMEORIGINALESTIMATE_HOST, JIRA_TRACK_TIMEORIGINALESTIMATE_USERNAME, JIRA_TRACK_TIMEORIGINALESTIMATE_PASSWORD');
  process.exit(1);
}

//
// commandline args
//
if (process.argv.length < 3) {
  console.error('usage: node app.js myProjectName [Google Spreadsheets documentID] [Google Spreadsheets sheet name] ');
  process.exit(1);
}
const [ , , project, sheetDocID, sheetName] = process.argv


const jira = new JiraApi({
  protocol: 'https',
  host: host,
  port: port,
  username: username,
  password: password,
  apiVersion: apiVersion,
  strictSSL: true
});

const query = `project = ${project} AND sprint in openSprints()`;

function searchWithPagination(query, startAt, responseHandler, completion) {

  jira.searchJira(query, {
    fields: ['timeoriginalestimate', 'resolution'],
    startAt: startAt
  })
  .then((response) => {

    responseHandler(response);

    const {startAt, maxResults, total} = response;
    const count = response.issues.length;
    const nextStartAt = startAt + count;

    if (nextStartAt < total) {
      searchWithPagination(query, nextStartAt, responseHandler, completion);
    } else {
      completion();
    }
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
}


const now = new Date();
let totalCount = 0;
let resolvedCount = 0;
let totalTime = 0;
let resolvedTime = 0;
let lastKey = null;

searchWithPagination(query, 0, (response) => {

  const issues = response.issues;

  issues.forEach((issue) => {

    const fields = issue.fields;
    const resolution = fields.resolution;
    const time = fields.timeoriginalestimate;

    lastKey = issue.key;

    if (!time) {
      return;
    }
    
    totalCount++;
    totalTime += time;

    if (resolution != null) {
      resolvedCount++;
      resolvedTime += time;
    }
  });

}, () => {
  
  jira.findIssue(lastKey)
  .then((response) => {

    const resStr = JSON.stringify(response);
    const match = resStr.match(/com\.atlassian\.greenhopper\.service\.sprint\.Sprint.*?name=(.*?),/);
    if (!match) {
      console.error('failed to find sprint name from response');
      process.exit(1);
    }
    const sprint = match[1];
    const vals = [
      now.toISOString(),
      sprint,
      totalCount,
      resolvedCount,
      totalCount - resolvedCount, // remaining count
      totalTime,
      resolvedTime,
      totalTime - resolvedTime // remaining time
    ];
    console.log(vals.join(','));

    // output to Google Spreadsheets if documentID and sheetName provided
    if (sheetDocID && sheetName) {
      Sheets.appendRow(vals, sheetDocID, sheetName);
    }
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
});
