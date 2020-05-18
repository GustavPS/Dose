import Head from 'next/head'
import { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/router'
import ReactPlayer from 'react-player'
import Styles from '../../../../../../../../styles/video.module.css'
import fetch from 'node-fetch'
import vtt from 'vtt-live-edit';
import Router from 'next/router';

import EpisodeRow from '../../../../../../../../components/episodeRow';

import cookies from 'next-cookies'

// Fetcher for useSWR, redirect to login if not authorized
let fetchedMetadata = false;


export default function Home(props) {
  const server = props.server;
  const router = useRouter();
  const { id, season } = router.query;
  const serverToken = props.serverToken;
  const [metadata, setMetadata] = useState({
      episodes: []
  });



  // This has it's own useEffect because if it doesn't videojs doesn't work (????)
  useEffect(() => {
    fetch(`http://${server.server_ip}:4000/api/series/${id}/season/${season}?token=${serverToken}`, {
      method: 'GET',
      headers: {
          'Content-Type': 'application/json'
      }
    })
    .then(r => r.json())
    .then(result => {
      let meta = result.result;
      for (let image of meta.images) {
        if (image.active && image.type === 'BACKDROP') {
          meta.backdrop = image.path;
        }
      }
      console.log(meta);
      meta.poster = meta.poster_path;
      setMetadata(meta);
      return () => {
      }
    });
  }, []);

  const selectEpisode = (episodeID, internalID) => {
      Router.push(`/server/${server.server_id}/shows/video/${id}/season/${season}/episode/${episodeID}?internalID=${internalID}`);
  }



  const getEpisodeElements = () => {
      console.log(metadata);
      let episodeElements = [];
      for (let episode of metadata.episodes) {
        console.log(episode.backdrop);
          let img = episode.backdrop !== null ? `https://image.tmdb.org/t/p/w500/${episode.backdrop}` : 'https://via.placeholder.com/2000x1000' 
          episodeElements.push(
              <>
              <EpisodeRow name={episode.name} overview={episode.overview} episode={episode.episode}  backdrop={img} onClick={() => selectEpisode(episode.episode, episode.internalID)}></EpisodeRow>
              <br></br>
              <br></br>
              </>
          )
      }
      return episodeElements;
  }



  
  return (
    <>
        <Head>
        <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@300&display=swap" rel="stylesheet" />

        <script src="http://code.jquery.com/jquery-1.9.1.min.js"></script>
        <script type="text/javascript" src="https://www.gstatic.com/cv/js/sender/v1/cast_sender.js?loadCastFramework=1"></script>

        </Head>

        <div id="container">
        <div style={{backgroundImage: `url('https://image.tmdb.org/t/p/original${metadata.backdrop}')`}} className={Styles.background}></div>
        <div className="backIcon" onClick={() => Router.back()}></div>


        <div className={Styles.top}>
          <div className={Styles.poster} style={{backgroundImage: `url('https://image.tmdb.org/t/p/original${metadata.poster}')`}} />
          <div className={Styles.description}>
            <h1>{metadata.name}</h1>
            <div className={Styles.metadata}>
              <p className={Styles.releaseDate}>Första avsnittet: {metadata.air_date}</p>
              <p className={Styles.addedDate}>Tillagd: {metadata.added_date}</p>
            </div>
            <div className={Styles.overview}>
                <p>{metadata.overview}</p>
            </div>
            <div className={Styles.actions}>
            </div>
          </div>
        </div>
        <div className={Styles.bottom}>
          <h1>Episodes</h1>
          <div>
            {getEpisodeElements()}
          </div>
        </div>
        </div>
        </>
  )
}

// Get the information about the server and send it to the front end before render (this is server-side)
export async function getServerSideProps(context) {
  let serverId = context.params.server;
  let movieID = context.params.id;

  return await fetch('http://88.129.86.234:3000/api/servers/getServer', {
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
  });
}