import Head from 'next/head'
import { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/router'
import { Form, Button, ListGroup, Image} from 'react-bootstrap';
import Styles from '../../../../../styles/movies.video.module.css';
import fetch from 'node-fetch'
import Router from 'next/router';
import cookies from 'next-cookies'

import HlsPlayer from '../../../../../components/hlsPlayer';
import VideoTrailer from '.././../../../../components/videoTrailer';
import validateServerAccess from '../../../../../lib/validateServerAccess';
import Actor from '../../../../../components/actor';
import useWindowSize from '../../../../../components/hooks/WindowSize';
import MovieBackdrop from '../../../../../components/movieBackdrop';



import ChangeImages from '../../../../../components/changeImages';

// Fetcher for useSWR, redirect to login if not authorized
let fetchedMetadata = false;


export default function Home(props) {
  const server = props.server;
  const router = useRouter();
  const { id } = router.query;
  const serverToken = props.serverToken;
  const [metadata, setMetadata] = useState({});
  const [watched, setWatched] = useState(false);
  const [inWatchList, setInWatchList] = useState(false);
  const [actors, setActors] = useState([]);
  const [recommended, setRecommended] = useState([]);

  const [viewTrailer, setViewTrailer] = useState(false);
  const [trailer, setTrailer] = useState(false);

  const [loaded, setLoaded] = useState(false)
  const [recommendedLoaded, setRecommendedLoaded] = useState(false);

  const videoRef = useRef();
  const windowSize = useWindowSize();



  // Used for manual metadata search
  const [metadataBox, setMetadataBox] = useState(false);
  const [metadataSearchResult, setMetadataSearchResult] = useState([]);
  const metadataSearch = useRef(null);



  // This has it's own useEffect because if it doesn't videojs doesn't work (????)
  useEffect(() => {
    validateServerAccess(server, (serverToken) => {
      fetch(`${server.server_ip}/api/movies/${id}/getRecommended?token=${serverToken}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
      })
      .then(r => r.json())
      .then(result => {
        if (result.success) {
          console.log(result);
          result.movies.forEach(movie => {
            for (let image of movie.images) {
                if (image.active) {
                    if (image.type === 'BACKDROP') {
                        if (image.path === 'no_image') {
                            movie.backdrop = null;
                        } else {
                            movie.backdrop = image.path;
                        }
                    } else {
                        if (image.path === 'no_image') {
                            movie.backdrop = null;
                        } else {
                            movie.poster = image.path;
                        }
                    }

                    if (movie.backdrop != null && movie.poster != null) {
                        break;
                    }
                }
            }
        });
          setRecommended(result.movies);
        }
      })
      .then(() => {
        setRecommendedLoaded(true);
      });



      fetch(`${server.server_ip}/api/movies/${id}?token=${serverToken}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
      })
      .then(r => r.json())
      .then(result => {
        let meta = result.result;
        console.log(meta)
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
  
        let currentTime = "";
        let hours = Math.floor(meta.currentTime / 60 / 60)
        let minutes = Math.floor((meta.currentTime / 60) % 60)
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
        console.log(videoRef)
        videoRef.current.setTitle(meta.title);
  
        setInWatchList(meta.inwatchlist);
        setWatched(meta.watched);
        setMetadata(meta);
        setTrailer(meta.trailer);
        meta.actors = meta.actors.sort((a, b) => {
          return parseFloat(a.order) - parseFloat(b.order);
        });
        setActors(meta.actors);

        if (router.query.autoPlay) {
          videoRef.current.show();
        }
      }).then(() => {
        setLoaded(true)
      });
    });
  }, []);

  const markAsWatched = () => {
    validateServerAccess(server, (serverToken) => {
      fetch(`${server.server_ip}/api/movies/${id}/setWatched?watched=true&token=${serverToken}`)
      .then(r => r.json())
      .then(status => {
        if (status.success) {
          setWatched(true);
        } else {
          console.log("ERROR MARKING AS WATCHED: " + status);
        }
      }).catch(err => {
        console.log(err);
      });
    });

  }

  const markAsNotWatched = () => {
    validateServerAccess(server, (serverToken) => {
      fetch(`${server.server_ip}/api/movies/${id}/setWatched?watched=false&token=${serverToken}`)
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
    });
  }

  const addToWatchList = () => {
    validateServerAccess(server, (serverToken) => {
      fetch(`${server.server_ip}/api/movies/${id}/addToWatchList?add=true&token=${serverToken}`)
      .then(r => r.json())
      .then(status => {
        if (status.success) {
          setInWatchList(true);
        } else {
          console.log("ERROR adding to watchlist: " + status);
        }
      })      .catch(err => {
        console.log(err);
      });
    });
  }

  const removeFromWatchList = () => {
    validateServerAccess(server, (serverToken) => {
      fetch(`${server.server_ip}/api/movies/${id}/addToWatchList?add=false&token=${serverToken}`)
      .then(r => r.json())
      .then(status => {
        if (status.success) {
          setInWatchList(false);
        } else {
          console.log("ERROR removing from watchlist: " + status);
        }
      })
      .catch(err => {
        console.log(err);
      });
    });
  }

  const searchMetadata = (event) => {
    let search = metadataSearch.current.value;
    if(search != ""){
      validateServerAccess(server, (serverToken) => {
        fetch(`${server.server_ip}/api/movies/searchMetadata?search=${search}&token=${serverToken}`)
        .then(r => r.json())
        .then(result => {
          console.log(result);
          let metadataElements = [];
          for (let movie of result) {
            let img = movie.poster_path !== null ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}` : 'https://via.placeholder.com/500x750' 
            metadataElements.push(
              <ListGroup.Item key={movie.id} className={Styles.metadataSearchRow} data-metadataid={movie.id}>
                <Image src={img} />
                <div>
                  <h5>{movie.title}</h5>
                  <p>{movie.overview}</p>
                </div>
                <Button onClick={() => updateMetadata(movie.id)}>Välj</Button>
              </ListGroup.Item>
            );        
          }
          setMetadataSearchResult(metadataElements);
        });
      });
    }
   
    event.preventDefault();
  }

  const updateMetadata = (metadataID) => {
    validateServerAccess(server, (serverToken) => {
      fetch(`${server.server_ip}/api/movies/${id}/updateMetadata?metadataID=${metadataID}&token=${serverToken}`)
      .then(r => r.json())
      .then(json => {
        if (json.success) {
          Router.reload(window.location.pathname);
        }
      });
    });
  }


  const getActors = () => {
    let elements = [];
    for (const actor of actors) {
      elements.push(
        <Actor key={actor.order} name={actor.name} characterName={actor.character} image={actor.image} />
      )
    }
    return elements;
  }

  const getRecommended = () => {
    let elements = [];
    for (const movie of recommended) {
      let img = movie.backdrop !== null ? `https://image.tmdb.org/t/p/w500/${movie.backdrop}` : 'https://via.placeholder.com/2000x1000' 
      elements.push(
          <MovieBackdrop markAsDoneButton id={movie.id} time={0} runtime={0} title={movie.title} overview={movie.overview} backdrop={img} onClick={(id) => selectMovie(movie.id)}></MovieBackdrop>
      );
    }
    return elements;
  }

  const selectMovie = (id) => {
    Router.push(`/server/${server.server_id}/movies/video/${id}`);
    Router.events.on("routeChangeComplete", () => {
      Router.reload(window.location.pathname);


    });
  }
  
  const scrollLeft = (id) => {
    document.getElementById(id).scrollLeft -= (window.innerWidth)*0.8;
    window.scrollTo(window.scrollX, window.scrollY - 1);
    window.scrollTo(window.scrollX, window.scrollY + 1);
  }
  const scrollRight = (id) => {
      document.getElementById(id).scrollLeft += (window.innerWidth)*0.8;
      window.scrollTo(window.scrollX, window.scrollY - 1);
      window.scrollTo(window.scrollX, window.scrollY + 1);
  }
  return (
    <>
    <HlsPlayer
      ref={videoRef}
      server={server}
      id={id}
      type={"movie"}>

    </HlsPlayer>
   
    {(!loaded || !recommendedLoaded) &&
    <>
      <Head>
        <title>Dose</title>
      </Head>
      <div className={Styles.loadingioSpinnerEclipse}>
          <div className={Styles.ldio}>
              <div></div>
          </div>
      </div>
    </>
    }
    {loaded && recommendedLoaded && 
    <>


  <Head>
      <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@300&display=swap" rel="stylesheet" />
      <title>{metadata.title + " (" + metadata.release_date.split('-')[0] + ")"}</title>
      <meta name="title" content={metadata.title + " (" + metadata.release_date + ")"} />
      <meta name="description" content={metadata.overview} />

      <meta property="og:type" content="website" />
      <meta property="og:title" content={metadata.title + " (" + metadata.release_date.split('-')[0] + ")"} />
      <meta property="og:description" content={metadata.overview} />
      <meta property="og:image" content={"https://image.tmdb.org/t/p/original" + metadata.backdrop} />

      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:title" content={metadata.title + " (" + metadata.release_date.split('-')[0] + ")"} />
      <meta property="twitter:description" content={metadata.overview} />
      <meta property="twitter:image" content={"https://image.tmdb.org/t/p/original" + metadata.backdrop} />
    </Head>

    {trailer !== false && viewTrailer &&
    <VideoTrailer onClose={() => setViewTrailer(false)} videoPath={trailer} />
    }


    <div id="container">
    <div style={{backgroundImage: `url('https://image.tmdb.org/t/p/original${metadata.backdrop}')`}} className={Styles.background}></div>
    <div className="backIcon" onClick={() => {
      Router.back();
      Router.events.on("routeChangeComplete", () => {
        Router.reload(window.location.pathname);
      });
      }}></div>


    {metadataBox &&
      <div className="metadataBox">
        <Form onSubmit={searchMetadata}>
          <Form.Group controlId="formSearch">
            <Form.Label>Update metadata for {metadata.path}</Form.Label>
            <Form.Control ref={metadataSearch} type="text" placeholder="Search for new metadata..." />
          </Form.Group>
          <Button variant="primary" type="submit">
            Search
          </Button>
        </Form>
        <div style={{clear: 'both'}}></div>

        <ListGroup id="metadataSearchResult">
          {metadataSearchResult}
        </ListGroup>
      </div>
    }


    <div className={Styles.top}>
      <div className={Styles.poster} style={{backgroundImage: `url('https://image.tmdb.org/t/p/original${metadata.poster}')`}} />
      <div className={Styles.description}>
        <h1>{metadata.title}</h1>
        <div className={Styles.metadata}>
          <p className={Styles.releaseDate}>{metadata.release_date}</p>
          <p className={Styles.runtime}>{Math.floor(metadata.runtime / 60) + "h " + metadata.runtime%60+"m"}</p>
          <p className={Styles.endsat}>Ends At {metadata.finish_at}</p>
          <p className={Styles.addedDate}>Added {metadata.added_date}</p>
        </div>
        <div className={Styles.overview}>
            <p>{metadata.overview}</p>
        </div>
        <div className={Styles.actions}>
          {metadata.currentTimeSeconds > 0 &&
          <div style={{marginRight: "15px"}} className={Styles.actionButton}>
            <div className={Styles.playButton} onClick={() => videoRef.current.show(metadata.currentTimeSeconds)}></div>
            <p style={{marginTop: "5px", fontSize: '14px'}}>Resume from {metadata.currentTime}</p>
          </div>
          }
          <div style={{marginRight: "15px"}} className={Styles.actionButton}>
            <div className={Styles.playButton} onClick={() => videoRef.current.show()}></div>
            <p style={{marginTop: "5px", fontSize: '14px'}}>Play from start</p>
          </div>
          <div className={`${Styles.actionButton} ${Styles.buttonHiddenForMobile}`}>
            <div className={Styles.playButton} onClick={() => setViewTrailer(true)}></div>
            <p style={{marginTop: "5px", fontSize: '14px'}}>Show trailer</p>
          </div>
          {watched &&
              <div style={{marginLeft: "15px"}} className={Styles.actionButton}>
              <div id="markAsWatched" style={{backgroundImage: `url('${process.env.NEXT_PUBLIC_SERVER_URL}/images/cross.svg')`}} className={Styles.playButton} onClick={() => markAsNotWatched()}></div>
              <p id="markAsWatchedText" style={{marginTop: "5px", fontSize: '14px'}}>Mark as watched</p>
              </div>
          }
          {!watched &&
            <div style={{marginLeft: "15px"}} className={Styles.actionButton}>
              <div id="markAsWatched" style={{backgroundImage: `url('${process.env.NEXT_PUBLIC_SERVER_URL}/images/eye.svg')`}} className={Styles.playButton} onClick={() => markAsWatched()}></div>
              <p id="markAsWatchedText" style={{marginTop: "5px", fontSize: '14px'}}>Unmark as watched</p>
            </div>
          }
          {inWatchList &&
              <div style={{marginLeft: "15px"}} className={Styles.actionButton}>
              <div id="inWatchList" style={{backgroundImage: `url('${process.env.NEXT_PUBLIC_SERVER_URL}/images/cross.svg')`}} className={Styles.playButton} onClick={() => removeFromWatchList()}></div>
              <p id="inWatchListText" style={{marginTop: "5px", fontSize: '14px'}}>Remove from watchlist</p>
              </div>
          }
          {!inWatchList &&
            <div style={{marginLeft: "15px"}} className={Styles.actionButton}>
              <div id="inWatchList" style={{backgroundImage: `url('${process.env.NEXT_PUBLIC_SERVER_URL}/images/eye.svg')`}} className={Styles.playButton} onClick={() => addToWatchList()}></div>
              <p id="inWatchListText" style={{marginTop: "5px", fontSize: '14px'}}>Add to watchlist</p>
            </div>
          }
          <div className={`${Styles.actionButton} ${Styles.buttonHiddenForMobile}`}>
            <div style={{marginLeft: "15px", backgroundImage: `url('${process.env.NEXT_PUBLIC_SERVER_URL}/images/search.svg')`}} className={Styles.playButton} onClick={() => setMetadataBox(true)}></div>
            <p style={{marginLeft: "15px", marginTop: "5px", fontSize: '14px'}}>Update metadata</p>
          </div>

          <ChangeImages  id={id} server={server} serverToken={serverToken} type="movies"></ChangeImages>
          <div style={{clear: 'both'}}></div>
        </div>
      </div>
    </div>
    <div className={Styles.bottom}>
      <h1>Actors</h1>
      <div className={Styles.actors}>
        <div id="actors" className={Styles.actorBox}>
          {getActors()}
        </div>
        {actors.length * 200 > windowSize.width &&
                                <>
                                    <div className={Styles.scrollButton} onClick={() => scrollLeft('actors')}>
                                        <img src={`${process.env.NEXT_PUBLIC_SERVER_URL}/images/left.svg`} width="70" height="70" />
                                    </div>
                                    <div className={Styles.scrollButton} style={{right: '0'}} onClick={() => scrollRight('actors')}>
                                        <img src={`${process.env.NEXT_PUBLIC_SERVER_URL}/images/right.svg`} width="70" height="70" />
                                    </div>
                                </>
                            }
      </div>

    <h1>Recommended</h1>
    {recommended.length > 0 &&
                    <div style={{position: 'relative'}}>
                        <div className={Styles.movieRow}>
                            <div id="recommended" className={Styles.scrollable}>
                                {getRecommended()}
                            </div>
                            {recommended.length * 480 > windowSize.width &&
                                <div>
                                    <div className={Styles.scrollButton} onClick={() => scrollLeft('recommended')}>
                                        <img src={`${process.env.NEXT_PUBLIC_SERVER_URL}/images/left.svg`} width="70" height="70" />
                                    </div>
                                    <div className={Styles.scrollButton} style={{right: '0'}} onClick={() => scrollRight('recommended')}>
                                        <img src={`${process.env.NEXT_PUBLIC_SERVER_URL}/images/right.svg`} width="70" height="70" />
                                    </div>
                                </div>
                            }
                        </div> 
                    <hr className={Styles.divider}></hr>
                    </div> 
                }
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
