/*

Sums up Original Estimate Time for issues in the current sprint.

Output CSV format:
totalIssueCount,resolvedIssueCount,totalTimeOriginalEstimate(seconds),resolvedTimeOriginalEstimate(seconds)

Issues are counted only if they have a non-zero Original Estimate Time.


Necessary environment variables:
JIRA_TRACK_TIMEORIGINALESTIMATE_HOST,
JIRA_TRACK_TIMEORIGINALESTIMATE_PORT (default: 443),
JIRA_TRACK_TIMEORIGINALESTIMATE_USERNAME,
JIRA_TRACK_TIMEORIGINALESTIMATE_PASSWORD,
JIRA_TRACK_TIMEORIGINALESTIMATE_APIVERSION (default: 2)

Usage:
node app.js myProjectName

*/


const JiraApi = require('jira-client');

const host = process.env.JIRA_TRACK_TIMEORIGINALESTIMATE_HOST;
const port = process.env.JIRA_TRACK_TIMEORIGINALESTIMATE_PORT || 443;
const username = process.env.JIRA_TRACK_TIMEORIGINALESTIMATE_USERNAME;
const password = process.env.JIRA_TRACK_TIMEORIGINALESTIMATE_PASSWORD;
const apiVersion = process.env.JIRA_TRACK_TIMEORIGINALESTIMATE_APIVERSION || 2;

if ( !(host && port && username && password) ) {
  console.error('environment variables not set: JIRA_TRACK_TIMEORIGINALESTIMATE_HOST, JIRA_TRACK_TIMEORIGINALESTIMATE_USERNAME, JIRA_TRACK_TIMEORIGINALESTIMATE_PASSWORD');
  process.exit(1);
}

if (process.argv.length != 3) {
  console.error('usage: node app.js myProjectName');
  process.exit(1);
}

const project = process.argv[2];

const jira = new JiraApi({
  protocol: 'https',
  host: host,
  port: port,
  username: username,
  password: password,
  apiVersion: apiVersion,
  strictSSL: true
});

jira.searchJira(`project = ${project} AND sprint in openSprints()`, {
  fields: ['timeoriginalestimate', 'resolution']
})
.then(response => {

  const issues = response.issues;

  let totalCount = 0;
  let resolvedCount = 0;
  let totalTime = 0;
  let resolvedTime = 0;

  issues.forEach(issue => {

    const fields = issue.fields;
    const resolution = fields.resolution;
    const time = fields.timeoriginalestimate;

    if (!time) {
      return;
    }
    
    totalCount++;
    totalTime += time;

    if (resolution != null) {
      resolvedCount++;
      resolvedTime += time;
    }
  })

  console.log(`${totalCount},${resolvedCount},${totalTime},${resolvedTime}`);
})
.catch(err => {
  console.error(err);
})
