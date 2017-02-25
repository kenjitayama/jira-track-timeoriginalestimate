# jira-track-timeoriginalestimate
Adds up Original Estimate Time for issues in the active sprint and output as CSV. Multiple active sprints not supported.
Useful if you are setting Original Estimate Time to Sub-tasks, because JIRA does not add them up in any screens, such as burndown charts.


## Output CSV format

```
dateStringInISO8601,sprintName,totalIssueCount,resolvedIssueCount,remainingIssueCount,totalTimeOriginalEstimate(seconds),resolvedTimeOriginalEstimate(seconds),remainingTimeOriginalEstimate(seconds)
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
