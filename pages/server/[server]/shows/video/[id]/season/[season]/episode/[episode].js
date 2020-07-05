import Head from 'next/head'
import Layout from '../../../../../../../../../components/layout';
import { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/router'
import ReactPlayer from 'react-player'
import Styles from '../../../../../../../../../styles/video.module.css';
import fetch from 'node-fetch'
import vtt from 'vtt-live-edit';
import Router from 'next/router';
import cookies from 'next-cookies'

import VideoComponent from '../../../../../../../../../components/videoComponent';

let internalID, season, episode;

export default function Home(props) {
  const server = props.server;
  const router = useRouter();
  const { id } = router.query;
  const serverToken = props.serverToken;
  const [metadata, setMetadata] = useState({});
  const [watched, setWatched] = useState(false);

  internalID = router.query.internalID;
  season = router.query.season;
  episode = router.query.episode;

  const videoRef = useRef();


  // This has it's own useEffect because if it doesn't videojs doesn't work (????)
  useEffect(() => {
    fetch(`http://${server.server_ip}:4000/api/series/${id}/season/${season}/episode/${episode}?token=${serverToken}`, {
      method: 'GET',
      headers: {
          'Content-Type': 'application/json'
      }
    })
    .then(r => r.json())
    .then(result => {
      let meta = result.result;
      let finish_at = new Date(new Date().getTime() + meta.runtime * 60000);
      meta.finish_at = finish_at.getHours() + ":" + finish_at.getMinutes();
      for (let image of meta.images) {
        if (image.active && image.type === 'BACKDROP') {
          meta.backdrop = image.path;
        }
        if (image.active && image.type === 'POSTER') {
          meta.poster = image.path;
        }
      }

      let currentTime = "";
      let hours = Math.floor(meta.currentTime / 60 / 60)
      let minutes = Math.floor(meta.currentTime / 60)
      let seconds = Math.floor(meta.currentTime % 60);
      if (hours >= 1) {
        currentTime += `${hours}:`
      }
      if (minutes < 10) {
        minutes = `0${minutes}`;
      }
      if (seconds < 10) {
        seconds = `0${seconds}`
      }
      currentTime += `${minutes}:${seconds}`
      meta.currentTimeSeconds = meta.currentTime;
      meta.currentTime = currentTime;
      console.log(meta.show_name);

      videoRef.current.setTitle(meta.show_name);
      setWatched(meta.watched);
      setMetadata(meta);
    });
  }, []);


  const getNextEpisodeID = (cb) => {
    fetch(`http://${server.server_ip}:4000/api/series/getNextEpisode?serie_id=${id}&season=${season}&episode=${episode}&token=${serverToken}`)
    .then(r => r.json())
    .then(result => {
      season = result.season;
      episode = result.episode;
      internalID = result.internalID;
      cb(result.internalID);
    });
  }

  const onChangeEpisode = () => {
    // Change the URL so if the user reloads the page they get to the new episode
    window.history.replaceState('state', 'Video', `/server/${server.server_id}/shows/video/${id}/season/${season}/episode/${episode}?internalID=${internalID}`);
    videoRef.current.setSeason(season);
    videoRef.current.setEpisode(episode);
  }

  const markAsWatched = () => {
    fetch(`http://${server.server_ip}:4000/api/movies/${id}/setWatched?watched=true&token=${serverToken}`)
    .then(r => r.json())
    .then(status => {
      if (status.success) {
        setWatched(true);
      } else {
        console.log("ERROR MARKING AS WATCHED: " + status);
      }
    })      .catch(err => {
      console.log(err);
    });
  }

  const markAsNotWatched = () => {
    fetch(`http://${server.server_ip}:4000/api/movies/${id}/setWatched?watched=false&token=${serverToken}`)
    .then(r => r.json())
    .then(status => {
      if (status.success) {
        setWatched(false);
      } else {
        console.log("ERROR MARKING AS WATCHED: " + status);
      }
    })
    .catch(err => {
      console.log(err);
    });
  }

    
  return (
    <>
        <Head>
        <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@300&display=swap" rel="stylesheet" />
        <script src="https://vjs.zencdn.net/7.7.6/video.js"></script>
        <link href="https://unpkg.com/@silvermine/videojs-quality-selector/dist/css/quality-selector.css" rel="stylesheet" />
        <script src="http://code.jquery.com/jquery-1.9.1.min.js"></script>
        <link href="https://vjs.zencdn.net/7.7.6/video-js.css" rel="stylesheet" />
        <link href="/chromecast/silvermine-videojs-chromecast.css" rel="stylesheet" />
        <script src="https://unpkg.com/@silvermine/videojs-quality-selector/dist/js/silvermine-videojs-quality-selector.min.js"></script>
        <script src="/chromecast/silvermine-videojs-chromecast.min.js"></script>
        <script type="text/javascript" src="https://www.gstatic.com/cv/js/sender/v1/cast_sender.js?loadCastFramework=1"></script>

        </Head>

  

        <div id="container">
        <div style={{backgroundImage: `url('https://image.tmdb.org/t/p/original${metadata.backdrop}')`}} className={Styles.background}></div>
        <div className="backIcon" onClick={() => Router.back()}></div>
        <VideoComponent ref={videoRef} server={server} serverToken={serverToken}
                        internalID={internalID}
                        season={season}
                        episode={episode}
                        getNextEpisodeID={(cb) => getNextEpisodeID(cb)}
                        onChangeEpisode={() => onChangeEpisode()}
                        >
        </VideoComponent>

        <div className={Styles.top}>
          <div className={Styles.poster} style={{backgroundImage: `url('https://image.tmdb.org/t/p/original${metadata.poster}')`}} />
          <div className={Styles.description}>
            <h1>{metadata.title}</h1>
            <div className={Styles.metadata}>
              <p className={Styles.releaseDate}>{metadata.release_date}</p>
              <p className={Styles.runtime}>{Math.floor(metadata.runtime / 60) + "h " + metadata.runtime%60+"m"}</p>
              <p className={Styles.endsat}>Slutar vid {metadata.finish_at}</p>
              <p className={Styles.addedDate}>Tillagd {metadata.added_date}</p>
            </div>
            <div className={Styles.overview}>
                <p>{metadata.overview}</p>
            </div>
            <div className={Styles.actions}>
              {metadata.currentTimeSeconds > 0 &&
              <div style={{marginRight: "15px"}}>
                <div className={Styles.playButton} onClick={() => videoRef.current.show()}></div>
                <p style={{marginTop: "5px", fontSize: '14px'}}>Återuppta från {metadata.currentTime}</p>
              </div>
              }
              <div>
                <div className={Styles.playButton} onClick={() => videoRef.current.show()}></div>
                <p style={{marginTop: "5px", fontSize: '14px'}}>Spela från början</p>
              </div>
              {watched &&
              <>
                  <div style={{marginLeft: "15px"}}>
                  <div id="markAsWatched" style={{backgroundImage: "url('/images/cross.svg')"}} className={Styles.playButton} onClick={() => markAsNotWatched()}></div>
                  <p id="markAsWatchedText" style={{marginTop: "5px", fontSize: '14px'}}>Markera som osedd</p>
                  </div>
              </>
              }
              {!watched &&
              <>
                <div style={{marginLeft: "15px"}}>
                <div id="markAsWatched" style={{backgroundImage: "url('/images/eye.svg')"}} className={Styles.playButton} onClick={() => markAsWatched()}></div>
                <p id="markAsWatchedText" style={{marginTop: "5px", fontSize: '14px'}}>Markera som sedd</p>
                </div>
              </>
              }



            </div>
          </div>
        </div>
        <div className={Styles.bottom}>
          <h1>Actors</h1>
          <div className={Styles.actors}>
            <div className={Styles.actor}>

            </div>
          </div>
        </div>
        </div>
        </>
  )
}

// Get the information about the server and send it to the front end before render (this is server-side)
export async function getServerSideProps(context) {
  let serverId = context.params.server;
  let internalEpisodeID = context.query.internalID;

  return await fetch('http://localhost:3000/api/servers/getServer', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({
          id: serverId
      }),
  })
  .then((r) => r.json())
  .then(async (data) =>{
    return {
      props: {
          server: data.server,
          serverToken: cookies(context).serverToken || ''
      }
    }
    })
}