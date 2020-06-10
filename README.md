# DOSE
A complete library solution for movies and TV Shows. Display and view your purchased content via the web using a beautiful UI.

### Features
* Full TV Show support
* Full Movie support
* Support for multiple libraries
* Track current time on movies and TV Shows
* Track next episode for TV Show
* Automatically fetches Movie and TV Show metadata (images, title, release date, overview etc..)
* Support for manually changing Movie and TV Show metadata.
* Subtitle support
* Advanced Movie name matching
* Advanced TV Show, season and episode name matching
* Automatically extract subtitles from video files
* Support for videos with multiple audio streams

## Setup
DOSE is made up of two parts, the main server and then one or multiple movie servers. Each movie server connects to a main server. A movie request looks like this:
Client -> MainServer -> Client -> MovieServer -> Client

The client loads the webpage without any information from the MainServer. The client then sends a request to the MovieServer to get the movie information.

### Main Server
Import the file `dose` to a postgresql database called `dose`.

To start the main server run:

`$env:NODE_ENV="production"`

`npm run build`

`npm run start`

There is currently no admin dashboard, so to setup you have to change the following values in the database:
Add a server to the table `server` containing the server ip of the `Movie Server`, set the `ID` to whatever you want.
Start the server and go to `/register` to create an account. Then go to the table `user_server` and create a new row containing the new user ID and the server id from the step before.

### Movie Server
Import the file `movieserver_dump` to a postgresql database called `MovieServer`

To start the movie server run the following commands in the `MovieServer` folder.

`$env:NODE_ENV="production"`

`npm run build`

`npm run start`

To setup a library open the table `library` and enter the name and the path to the movie/tv show library. The path must end with a `\` if you are on windows, or a `/` if you are on linux. `TYPE` should either be `MOVIES` or `SERIES` (you can't have movies and tv shows in the same library).
Open the table `users` and add the username that you created on the MainServer. `has_access` should be set to true.

## DISCLAIMER
I am not responsible or liable in any manner for any illegal content that people uses DOSE to view and/or host. I do not control and are not responsible for what people host, transmit, share or view using DOSE. I am not responsible for any illegal, offensive, inappropriate, obscene, unlawful or otherwise objectionable content that people host or view using DOSE.
