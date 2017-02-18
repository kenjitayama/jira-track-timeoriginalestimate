# jira-track-timeoriginalestimate
Sums up Original Estimate Time for issues in the current sprint


## Output CSV format

```
totalIssueCount,resolvedIssueCount,totalTimeOriginalEstimate,resolvedTimeOriginalEstimate
```

Issues are counted only if they have a non-zero Original Estimate Time.


## Necessary environment variables

- JIRA_TRACK_TIMEORIGINALESTIMATE_HOST,
- JIRA_TRACK_TIMEORIGINALESTIMATE_PORT (default: 443),
- JIRA_TRACK_TIMEORIGINALESTIMATE_USERNAME,
- JIRA_TRACK_TIMEORIGINALESTIMATE_PASSWORD,
- JIRA_TRACK_TIMEORIGINALESTIMATE_APIVERSION (default: 2)


## Usage

node app.js myProjectName
