# jira-track-timeoriginalestimate
Adds up Original Estimate Time for issues in the active sprint, and output as CSV and optionally to Google Spreadsheets. Multiple active sprints not supported.
Useful if you are setting Original Estimate Time to Sub-tasks, because JIRA does not add them up in any screens, such as burndown charts.


## Output CSV format

```
dateStringInISO8601,sprintName,totalIssueCount,resolvedIssueCount,remainingIssueCount,totalTimeOriginalEstimate(seconds),resolvedTimeOriginalEstimate(seconds),remainingTimeOriginalEstimate(seconds)
```

example:
```
2017-02-25T14:50:06.095Z,Our Project 2/10 - 2/23,60,4,56,272280,19800,252480
```

Issues are counted only if they have a non-zero Original Estimate Time.


## Necessary environment variables

- JIRA_TRACK_TIMEORIGINALESTIMATE_HOST,
- JIRA_TRACK_TIMEORIGINALESTIMATE_PORT (default: 443),
- JIRA_TRACK_TIMEORIGINALESTIMATE_USERNAME,
- JIRA_TRACK_TIMEORIGINALESTIMATE_PASSWORD,
- JIRA_TRACK_TIMEORIGINALESTIMATE_APIVERSION (default: 2)


## Usage

node app.js myProjectName [Google Spreadsheets documentID] [Google Spreadsheets sheet name]


## Google Spreadsheets

To output to Google Spreadsheets, follow Step 1 of the [Google Sheeets API Node.js Quickstart](https://developers.google.com/sheets/api/quickstart/nodejs) to prepare the Google Sheets API.
Save the client secret file to `google_sheets_client_secret.json` instead of `client_secret.json` (it's set in .gitignore).

A new row will be appended each time you run this script.
If you want to set up calculated cells in advance for the rows to be appended, you should create a new sheet and reference the original sheet.
Otherwise, new rows will be appended below the calculated cells that you set up.
