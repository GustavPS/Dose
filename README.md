# DOSE
<div align="center">
  <img src="https://img.shields.io/badge/all_contributors-2-orange.svg?style=flat-square" alt="Coverage status">
  <img src="https://github.com/GustavPS/Dose/actions/workflows/main.yml/badge.svg" alt="CI status">
  <img src="https://github.com/GustavPS/Dose/actions/workflows/codeql-analysis.yml/badge.svg" alt="Security status">
  
</div>



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

### Android TV
The android TV app is available [here](https://github.com/GustavPS/DoseReactNative)

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

### Movie Server
First you have to edit `.env.local` in ContentServer and set the temp folder to a path. This path should have a quite large volume, since the temp transcoding files are located here.

To start the movie server run the following commands in the `MovieServer` folder.

`$env:NODE_ENV="production"`

`npm run build`

`npm run start`

Go to http://localhost:3001 and follow the setup process. After you've done the setup steps it's recommended that you restart the server. 

#### Add users
To add users to the server go to http://localhost:3001/dashboard/admins and add the users. Note that they have to be registered to the Main Server before this step.

## DISCLAIMER
I am not responsible or liable in any manner for any illegal content that people uses DOSE to view and/or host. I do not control and are not responsible for what people host, transmit, share or view using DOSE. I am not responsible for any illegal, offensive, inappropriate, obscene, unlawful or otherwise objectionable content that people host or view using DOSE.

## Contributors ✨

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="https://github.com/weeklyvillain"><img src="https://avatars.githubusercontent.com/u/16028826?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Filip Eriksson</b></sub></a><br /><a href="https://github.com/GustavPS/Dose/commits?author=weeklyvillain" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/GustavPS"><img src="https://avatars.githubusercontent.com/u/8510654?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Gustav P Svensson</b></sub></a><br /><a href="https://github.com/GustavPS/Dose/commits?author=GustavPS" title="Code">💻</a></td>
  </tr>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!
