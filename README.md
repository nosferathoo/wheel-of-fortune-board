# Wheel of fortune board frontend
This is the ReactJS frontend part of my larger Wheel of Fortune VR event app.

## Installation

You will need node.js to run this app.
This will install all the necessary packages and dependencies:
```
npm install
```
Phrases are retrieved from Google Sheets using the **papaparse** package. Url for sheet can be changed in *App.js*. See this [article] (https://dev.to/bornfightcompany/using-google-sheets-as-a-simple-database-with-papa-parse-2k7o).
## Executing application
To start type:
```
npm start
```
## Usage
The main window of the application shows the board with hint, hidden phrase, team names (editable inputs) and scores:

<img width="1440" alt="Main window" src="https://github.com/nosferathoo/wheel_of_fortune_board/assets/2834098/acdf6e62-9e46-4645-ba70-9eb2663bd122">

Additional control window (preferably hidden on the second display) shows input for letters, current phrase, buttons to add/subtract score for current team, button to shuffle another entry and button to change current team.

<img width="422" alt="Control window" src="https://github.com/nosferathoo/wheel_of_fortune_board/assets/2834098/3416fa77-c45d-4793-a941-e55b2b09b6c5">

