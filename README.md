# DOSE
A complete library solution for movies and TV Shows. Display and view your purchased content via the web using a beautiful UI.

### Features
* Full TV Show support
* Full Movie support
* Support for multiple libraries
* Track current time on movies and TV Shows
* Track next episode for TV Show
* Displays Movie and TV Show metadata (images, title, release date, overview etc..)
* Subtitle support
* Advanced Movie name matching
* Advanced TV Show, season and episode name matching

## Setup
DOSE is made up of two parts, the main server and then one or multiple movie servers. Each movie server connects to a main server. A movie request looks like this:
Client -> MainServer -> Client -> MovieServer -> Client

The client loads the webpage without any information from the MainServer. The client then sends a request to the MovieServer to get the movie information.

### Main Server
To start the main server run:

`$env:NODE_ENV="production"`

`npm run build`

`npm run start`

### Movie Server
To start the movie server run the following commands in the `MovieServer` folder.

`$env:NODE_ENV="production"`

`npm run build`

`npm run start`
