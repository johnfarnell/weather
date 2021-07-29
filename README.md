# Introduction to the WEATHER app

Upon starting the application, the user is invited to enter search criteria for the location (building, city, suburb etc) that in which they are interested
in. In the event that the system finds more than one location, the user will then be invited to select from a drop-down list. 

Once a location is identified as the one of interest, a list of the upcoming 7 day weather forecast is presented.

# How to run the application without downloading anything

For a quick demonstration of the workings of this application, please copy the following link https://github.com/johnfarnell/weather and paste it in to the
`URL to GitHub Repository` text field at the https://codesandbox.io/s/github. The application will be rendered in that page

# How to run the application on the local machine

Assuming node (12.18.2) and typescript(4.3.5) is installed, this codebase can be git cloned to a local folder and after entering 

`npm install` and `npm start` it will be available at http://localhost:3000

# Technical

This application has been written using typescript(4.3.5) using react, react-redux, redux-thunk and relies on the styled-components for easy to maintain components. 
I have not included test cases and focused more on the code development in the time I have taken. I understood this to be acceptable for the purposes of the 
code exercise. I have designed the code to allow for unit testing should this be an issue.

The calls to the api rely on react-thunk to provide the asynchronous behaviour required for the interaction with the openweather and location apis. There are redux actions
to control the rendering of the page as the user is asked to wait for the data retrieval.

There is basic styling in the application which allows for a friendly interface. The main components on the page rely on the css grid to provide a clean presentation and reliable positioning on the information, in particular the weather forecasting

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

