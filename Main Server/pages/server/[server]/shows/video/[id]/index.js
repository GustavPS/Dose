import Head from 'next/head'
import { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/router'
import ReactPlayer from 'react-player'
import Styles from '../../../../../../styles/video.module.css';
import fetch from 'node-fetch'
import vtt from 'vtt-live-edit';
import Router from 'next/router';
import SeasonPoster from '../../../../../../components/seasonPoster';
import cookies from 'next-cookies'
import validateServerAccess from '../../../../../../lib/validateServerAccess';
import ChangeImages from '../../../../../../components/changeImages';

// Fetcher for useSWR, redirect to login if not authorized
let fetchedMetadata = false;


export default function Home(props) {
  const server = props.server;
  const router = useRouter();
  const { id } = router.query;
  const serverToken = props.serverToken;
  const [metadata, setMetadata] = useState({
      seasons: []
  });
  const [loaded, setLoaded] = useState(false)


  // This has it's own useEffect because if it doesn't videojs doesn't work (????)
  useEffect(() => {
    validateServerAccess(server, (serverToken) => {
      fetch(`${server.server_ip}/api/series/${id}?token=${serverToken}`, {
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
          if (image.active && image.type === 'POSTER') {
            meta.poster = image.path;
          }
        }
  
        let new_added_date = new Date(parseInt(meta.added_date));
        let added_year = new_added_date.getFullYear();
        let added_month = new_added_date.getMonth() + 1;
        if(added_month < 10) {
          added_month = "0" + added_month.toString();
        }
        let adde_date = new_added_date.getDate();
        if(adde_date < 10) {
          adde_date = "0" + adde_date.toString();
        }
        meta.added_date = `${added_year}-${added_month}-${adde_date}`
  
        setMetadata(meta);
        return () => {
        }
      }).then(() => {
        setLoaded(true)
      });
    });
  }, []);

  const selectSeason = (seasonId) => {
      Router.push(`/server/${server.server_id}/shows/video/${id}/season/${seasonId}`);
  }



  const getSeasonElements = () => {
      let seasonElements = [];
      for (let season of metadata.seasons) {
            let img = season.poster_path !== null ? `https://image.tmdb.org/t/p/original/${season.poster_path}` : 'https://via.placeholder.com/2000x1000' 
          seasonElements.push(
              <SeasonPoster name={season.name} title={season.name} id={season.season_id} poster={img} onClick={() => selectSeason(season.season_id)}></SeasonPoster>
          )
      }
      return seasonElements;
  }




  
  return (
    <>
      {!loaded &&
        <div className={Styles.loadingioSpinnerEclipse}>
            <div className={Styles.ldio}>
                <div></div>
            </div>
        </div>
      }

      {loaded &&
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
            <h1>{metadata.title}</h1>
            <div className={Styles.metadata}>
              <p className={Styles.releaseDate}>Första avsnittet: {metadata.first_air_date}</p>
              <p className={Styles.addedDate}>Tillagd: {metadata.added_date}</p>
            </div>
            <div className={Styles.overview}>
                <p>{metadata.overview}</p>
            </div>
            <div className={Styles.actions}>
            <ChangeImages id={id} server={server} serverToken={serverToken} type="series"></ChangeImages>

            </div>
          </div>
        </div>
        <div className={Styles.bottom}>
          <h1>Seasons</h1>
          <div className={Styles.seasons}>
            {getSeasonElements()}
          </div>
        </div>
        </div>
        </>
      }
      </>
  )
}

// Get the information about the server and send it to the front end before render (this is server-side)
export async function getServerSideProps(context) {
  let serverId = context.params.server;
  let movieID = context.params.id;

  return await fetch(`http://localhost:${process.env.SERVER_PORT}${process.env.SERVER_SUB_FOLDER}/api/servers/getServer`, {
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
