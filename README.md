# jira-track-timeoriginalestimate
Sums up Original Estimate Time for issues in the active sprint. Multiple active sprints not supported.


## Output CSV format

```
dateStringInISO8601,sprintName,totalIssueCount,resolvedIssueCount,totalTimeOriginalEstimate(seconds),resolvedTimeOriginalEstimate(seconds)
```

example:
```
2017-02-18T23:39:07.671Z,Sprint 1,7,5,90180,57780
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
