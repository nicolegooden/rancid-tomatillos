## Rancid Tomatillos
This is a paired project for the Turing School of Software & Design.

## Collaborators:
[Nicole Gooden](https://github.com/nicolegooden)

[Naomi Ware](https://github.com/nware1066)

## Overview:
As a user of Rancid Tomatillos, you can see, rate, and comment on a variety of movies. The user can log in, be directed to a page showing their movie ratings, and click on any image to see additional details about the movie.
Users can navigate back to the homepage from any of the other pages, and can also log out to be returned to the homepage.

## Deployed App:
[Rancid Tomatillos](https://nicolegooden.github.io/rancid-tomatillos/) is deployed via GitHub pages.

The login feature requires a valid email address and password:
+ Email: charlie@turing.io
+ Password: qwerty

Currently, the commenting feature is supported by a locally run server; until deployed, the commenting feature will not have complete functionality.  To get this up and running, follow the installation instructions for the Express server.

## Learning Goals:
+ Solidify React fundamentals
+ Solidify using React Router to create a multi-page user experience
+ Solidify component and asynchronous JS testing
+ Work with and navigate a shared, persistent API using GET, POST, and DELETE requests

## Tech Used:
This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

Rancid Tomatillos implements React, React Testing Library, and Jest.
We used React Router so that we could have a Single Page Application with the user experience of multiple pages.
Our workflow was managed with git, using GitHub for the repository and the project board with our issue tickets to allow for collaborative project planning.
Since we are working remotely, we have used Slack for daily messages and to share links and snippets of code; Tuple has been utilized to share screens and pair.

## Rancid Tomatillos in action!
![User logs in and displays movies, rates movies and navigates to detail page](https://media.giphy.com/media/EkwCg8BYQc8gGrXGtf/giphy.gif)

## Setup / Installation
To open this project, follow the steps outlined below.

From the terminal's CLI:

1. Run `git clone git@github.com:nicolegooden/rancid-tomatillos.git`

1. `cd` into the new repo, locally (repo is named `rancid-tomatillos`)

1. Run `npm install` to install all dependencies

1. Run `npm start` to open the application via `localhost:3000`

**The front-end server will need to stay open via `npm start` while using the application.  It is recommended to leave this command running in a second terminal tab if the intention is to actively work on this application.**

There is an Express server that handles movie comments; this server will also need to be running locally in order for users to submit a new movie comment and to view any existing comments.

This server exists in this [repo](https://github.com/nicolegooden/rancid-tomatillos-express-api).

To start this server on the backend, follow these terminal instructions:

1. Run `git clone git@github.com:nicolegooden/rancid-tomatillos-express-api.git`

1. `cd` into the new repo, locally (repo is named `rancid-tomatillos-microservice`)

1. Run `npm install` to install all dependencies

1. Run `npm start` to run the server via `localhost:3001`

**This Express app must be running any time a user wants to see movie comments or leave a movie review.**

In the near future, both the application and the Express server will be deployed.:3000) to view it in the browser.

To run any existing tests run `npm test` from the CLI.

## Successes:
+ Working with React and Router meant not relying on conditional logic, which was a nice change from Vanilla Javascript.
+ Working with an API successfully, including: making a substantial number of POST and GET requests to an API, displaying the retrieved data, and prompting the user to interact with it.

## Challenges:
+ Testing with React is more difficult than testing Vanilla Javascript, but the debugger tool was a real bonus.
+ Getting asynchronous functionality to behave synchronously, in regards to performing actions after fetch requests have been resolved.
To overcome this challenge, we have leaned on `async / await` and chaining `.then()` (with a callback function) to an imported fetch request.

## Next Steps:
In the future, adding functions to allow the user to select and display favorite movies can be added. Additional CSS could be included, particularly for the Header and perhaps with a richer color scheme, although the subtle color scheme currently in use has its own charm.

We plan to incorporate more sad path testing and error handling for invalid routes. Furthermore, it would make for a better user experience if the user could view the details from the movie show page without being logged in.
