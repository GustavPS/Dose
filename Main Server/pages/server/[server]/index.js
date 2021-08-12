import Layout from '../../../components/layout'
import Head from 'next/head'
import fetch from 'node-fetch'
import cookie from 'js-cookie';
import Router from 'next/router';
import { useEffect, useState } from 'react';
import { Carousel, Container, Row, Col } from 'react-bootstrap';
import Link from 'next/link';
import validateServerAccess from '../../../lib/validateServerAccess';
import useWindowSize from '../../../components/hooks/WindowSize';
import Styles from '../../../styles/server.module.css';
import MovieBackdrop from '../../../components/movieBackdrop';
import EpisodePoster from '../../../components/episodePoster';

const fetcher = url =>
  fetch(url)
    .then(r => {
      return r.json().then(result => {
          return result;
      });
    }
  );

const main = (props) => {
    // props.server is from the SSR under this function
    let server = props.server;
    
    const [latestMovies, setLatesMovies] = useState(null);
    const [ongoingMovies, setOngoingMovies] = useState([]);
    const [movieWatchList, setMovieWatchList] = useState([]);
    const [ongoingShows, setOngoingShows] = useState([]);
    const [newlyAddedMovies, setNewlyAddedMovies] = useState([]);
    const [newlyAddedShows, setNewlyAddedShows] = useState([]);
    const [newlyAddedEpisodes, setNewlyAddedEpisodes] = useState([]);
    const [recommendedMovie, setRecommendedMovie] = useState([]);
    let loading = 0;
    const [loaded, setLoaded] = useState(false)



    const windowSize = useWindowSize();
    let allContent = [];

    /**
     * Makes a query to the current active server for a list of movies
     * 
     * @param {string} genre 
     * @param {string} orderby 
     * @param {int} limit 
     */
    const getMovieList = async (genre=null, orderby=null, limit=20, ongoing=false, watchlist=false) => {
        return new Promise((resolve, reject) => {
            let url;
            if (ongoing) {
                url = `${server.server_ip}/api/movies/list/ongoing?${orderby !== null ? 'orderby='+orderby+'&' : ''}limit=${limit}&token=${cookie.get('serverToken')}`
            } else if(watchlist) {
                url = `${server.server_ip}/api/movies/list/watchlist?${orderby !== null ? 'orderby='+orderby+'&' : ''}limit=${limit}&token=${cookie.get('serverToken')}`
            } else {
                url = `${server.server_ip}/api/movies/list${genre !== null ? '/genre/'+genre : ''}?${orderby !== null ? 'orderby='+orderby+'&' : ''}limit=${limit}&token=${cookie.get('serverToken')}`
            }
            fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    limit: 20
                })
            })
            .then((r) => r.json())
            .then((response) => {
                // Mark the movies active image
                response.result.forEach(movie => {
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
                resolve(response.result);
            });
        });
    }

    /**
     * Makes a query to the current active server for a list of new episodes
     * 
     * @param {string} genre 
     * @param {string} orderby 
     * @param {int} limit 
     */
         const getNewEpisodeList = async (orderby=null, limit=20) => {
            return new Promise((resolve, reject) => {
                let url;
                url = `${server.server_ip}/api/series/list/episodes?${orderby !== null ? 'orderby='+orderby+'&' : ''}limit=${limit}&token=${cookie.get('serverToken')}`
                fetch(url, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        limit: 20
                    })
                })
                .then((r) => r.json())
                .then((response) => {
                    // Mark the movies active image
                    response.result.forEach(episode => {
                        for (let image of episode.images) {
                            if (image.active) {
                                if (image.type === 'BACKDROP') {
                                    if (image.path === 'no_image') {
                                        episode.backdrop = null;
                                    } else {
                                        episode.backdrop = image.path;
                                    }
                                } else if (image.type === 'POSTER') {
                                    if (image.path === 'no_image') {
                                        episode.poster = null;
                                    } else {
                                        episode.poster = image.path;
                                    }
                                } else {
                                    if (image.path === 'no_image') {
                                        episode.backdrop = null;
                                    } else {
                                        episode.poster = image.path;
                                    }
                                }
    
                                if (episode.backdrop != null && episode.poster != null) {
                                    break;
                                }
                            }
                        }
                    });
                    console.log(response.result);
                    resolve(response.result);
                });
            });
        }

    const getShowList = async (genre=null, orderby=null, limit=20, ongoing=false) => {
        return new Promise((resolve, reject) => {
            let url;
            if (ongoing) {
                url = `${server.server_ip}/api/series/list/ongoing?${orderby !== null ? 'orderby='+orderby+'&' : ''}limit=${limit}&token=${cookie.get('serverToken')}`
            } else {
                url = `${server.server_ip}/api/series/list${genre !== null ? '/genre/'+genre : ''}?${orderby !== null ? 'orderby='+orderby+'&' : ''}limit=${limit}&token=${cookie.get('serverToken')}`
            }
            fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    limit: 20
                })
            })
            .then((r) => r.json())
            .then((response) => {
                // Mark the movies active image
                if (ongoing) {
                    response.upcoming.forEach(movie => {
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

                    response.ongoing.forEach(movie => {
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
                    resolve(response);
                    return;
                }


                response.result.forEach(movie => {
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
                resolve(response.result);
            });
        });
    }

    useEffect(() => {
        validateServerAccess(server, (serverToken) => {
            // Get recommended video (random video right now)
            fetch(`${server.server_ip}/api/movies/list/random?trailer=true&token=${cookie.get('serverToken')}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
            })
            .then((r) => r.json())
            .then(result => {
                console.log(result);
                if (result.status === 'success') {
                    setRecommendedMovie(result.movie);
                } else {
                    console.log("Error getting recommended movie");
                }
            })
            

            // Get all the newest released movies (The slieshow)
            getMovieList(null, 'release_date', 5).then(movies => {
                movies.reverse();
                let movieElements = [];
                for (let movie of movies) {
                    let img = movie.backdrop !== null ? `https://image.tmdb.org/t/p/original/${movie.backdrop}` : 'https://via.placeholder.com/2000x1000' 
                    movieElements.push(
                        <Carousel.Item>
                            <img 
                                className="d-block w-100"
                                src={img}
                                alt={movie.title}
                                style={{objectFit: 'cover', height: '90vh', minHeight: '500px', cursor: 'pointer'}}
                                onClick={() => {selectMovie(movie.id)}}
                            />
                            <Carousel.Caption>
                                <h3 style={{textShadow: '0px 0px 6px #000'}}>{movie.title}</h3>
                                <p style={{textShadow: '0px 0px 6px #000'}}>{movie.overview}</p>
                            </Carousel.Caption>
                        </Carousel.Item>
                    );
                }
                loading++
                setLatesMovies(movieElements);

            }).then(() => {
                if(loading == 7) {
                    setLoaded(true)
                }
            })

            // Get ongoing movies
            getMovieList(null, 'release_date', 20, true).then(movies => {
                movies.reverse();
                let movieElements = [];
                for (let movie of movies) {
                    let img = movie.backdrop !== null ? `https://image.tmdb.org/t/p/w500/${movie.backdrop}` : 'https://via.placeholder.com/2000x1000' 
                    movieElements.push(
                        <MovieBackdrop markAsDoneButton id={movie.id} time={movie.watchtime} runtime={movie.runtime} title={movie.title} overview={movie.overview} runtime={movie.runtime} backdrop={img} onClick={(id) => selectMovie(movie.id)}></MovieBackdrop>
                    );
                }
                loading++
                setOngoingMovies(movieElements);

            }).then(() => {
                if(loading == 7) {
                    setLoaded(true)
                }
            })

            // Get watchlist for movies
            getMovieList(null, 'release_date', 20, false, true).then(movies => {
                movies.reverse();
                let movieElements = [];
                for (let movie of movies) {
                    let img = movie.backdrop !== null ? `https://image.tmdb.org/t/p/w500/${movie.backdrop}` : 'https://via.placeholder.com/2000x1000' 
                    movieElements.push(
                        <MovieBackdrop markAsDoneButton id={movie.id} time={movie.watchtime} runtime={movie.runtime} title={movie.title} overview={movie.overview} runtime={movie.runtime} backdrop={img} onClick={(id) => selectMovie(movie.id)}></MovieBackdrop>
                    );
                }
                loading++
                setMovieWatchList(movieElements);

            }).then(() => {
                if(loading == 7) {
                    setLoaded(true)
                }
            })

            // Get newly added movies
            getMovieList(null, 'added_date', 20).then(movies => {
                let movieElements = [];
                for (let movie of movies) {
                    let img = movie.backdrop !== null ? `https://image.tmdb.org/t/p/w500/${movie.backdrop}` : 'https://via.placeholder.com/2000x1000' 
                    movieElements.push(
                        <MovieBackdrop markAsDoneButton id={movie.id} time={movie.watchtime} runtime={movie.runtime} title={movie.title} overview={movie.overview} runtime={movie.runtime} backdrop={img} onClick={(id) => selectMovie(movie.id)}></MovieBackdrop>
                    );
                }
                loading++
                setNewlyAddedMovies(movieElements);

            }).then(() => {
                if(loading == 7) {
                    setLoaded(true)
                }
            })

            // Get newly added shows
            getShowList(null, 'added_date', 20).then(shows => {
                let showElements = [];
                for (let show of shows) {
                    let img = show.backdrop !== null ? `https://image.tmdb.org/t/p/w500/${show.backdrop}` : 'https://via.placeholder.com/2000x1000' 
                    showElements.push(
                        <MovieBackdrop markAsDoneButton id={show.id} time={show.watchtime} runtime={show.runtime} title={show.title} overview={show.overview} runtime={show.runtime} backdrop={img} onClick={(id) => selectShow(show.id)}></MovieBackdrop>
                    );
                }
                loading++
                setNewlyAddedShows(showElements);

            }).then(() => {
                if(loading == 7) {
                    setLoaded(true)
                }
            })
            // Get ongoing shows
            getShowList(null, 'added_date', 20, true).then(result => {
                let showElements = [];
                for (let show of result.upcoming) {
                    let img = show.backdrop !== null ? `https://image.tmdb.org/t/p/w500/${show.backdrop}` : 'https://via.placeholder.com/2000x1000' 
                    showElements.push(
                        <MovieBackdrop showTitle markAsDoneButton id={show.id} time={show.time_watched} runtime={show.runtime} title={show.season_name + " - Episode " + show.episode_number}
                                       overview={show.overview} runtime={show.total_time} backdrop={img} onClick={(id) => selectEpisode(show.show_id, show.season_number, show.episode_number, show.internalepisodeid)}></MovieBackdrop>
                    );
                }
                for (let show of result.ongoing) {
                    let img = show.backdrop !== null ? `https://image.tmdb.org/t/p/w500/${show.backdrop}` : 'https://via.placeholder.com/2000x1000' 
                    showElements.push(
                        <MovieBackdrop showTitle markAsDoneButton id={show.id} time={show.time_watched} runtime={show.runtime} title={show.season_name + " - Episode " + show.episode_number}
                                       overview={show.overview} runtime={show.total_time} backdrop={img} onClick={(id) => selectEpisode(show.show_id, show.season_number, show.episode_number, show.internalepisodeid)}></MovieBackdrop>
                    );
                }
                loading++
                setOngoingShows(showElements);

            }).then(() => {
                if(loading == 7) {
                    setLoaded(true)
                }
            })

            getNewEpisodeList('added_date', 20).then(episodes => {
                let episodeElements = [];

                for (let episode of episodes) {
                    let poster = episode.poster !== null ? `https://image.tmdb.org/t/p/w500/${episode.poster}` : 'https://via.placeholder.com/500x1000';
                    let backdrop = episode.backdrop !== null ? `https://image.tmdb.org/t/p/w500/${episode.backdrop}` : 'https://via.placeholder.com/500x1000' 
                    episodeElements.push(
                        <EpisodePoster show={episode.serie_id} season={episode.season} episode={episode.episode} poster={poster} internalEpisodeID={episode.internalepisodeid} backdrop={backdrop}
                            onClick={(season, episode, show, internalEpisodeID) => selectEpisode(show, season, episode, internalEpisodeID)}></EpisodePoster>
                    );
                }
                loading++
                setNewlyAddedEpisodes(episodeElements);
            }).then(() => {
                if(loading == 7) {
                    setLoaded(true)
                }
            })
        });
    }, [loading]);


    const selectMovie = (id) => {
        Router.push(`/server/${server.server_id}/movies/video/${id}`);
    }

    const selectShow = (id) => {
        Router.push(`/server/${server.server_id}/shows/video/${id}`);
    }

    const selectEpisode = (showID, seasonNumber, episodeNumber, internalEpisodeID) => {
        Router.push(`/server/${server.server_id}/shows/video/${showID}/season/${seasonNumber}/episode/${episodeNumber}?internalID=${internalEpisodeID}`)
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

    // LAYOUT //
    return (<>
        {!loaded &&
            <div className={Styles.loadingioSpinnerEclipse}>
            <div className={Styles.ldio}>
                <div></div>
            </div>
            </div>
        }
        {loaded &&

        <Layout searchEnabled server={server} serverToken={cookie.get('serverToken')}>
        <Head>
        </Head>

        <div className={Styles.recommended}>
            <video  autoPlay={true} loop={true} preload="auto" muted>
                <source src={`${server.server_ip}/api/trailer/${recommendedMovie["id"]}?type=MOVIE&token=${cookie.get('serverToken')}`}type="video/mp4" />
            </video>
            <div className={Styles.recommendedInformation}>
                <h1>{recommendedMovie["title"]}</h1>
                <p>{recommendedMovie["overview"]}</p>
                <div className={Styles.controls}>
                    <Link href={`/server/${server.server_id}/movies/video/${recommendedMovie["id"]}?autoPlay=true`}>
                        <img src={`${process.env.NEXT_PUBLIC_SERVER_URL}/images/001-play-button.png`} />
                    </Link>
                    <Link href={`/server/${server.server_id}/movies/video/${recommendedMovie["id"]}`}>
                        <img src={`${process.env.NEXT_PUBLIC_SERVER_URL}/images/002-information.png`} />
                    </Link>
                </div>
            </div>


        </div>
            
        <br></br>
        <div style={{color: 'white'}}>
            <Container fluid className={Styles.contentRows}>
                {ongoingMovies.length > 0 &&
                    <>
                        <h2 style={{textTransform: 'capitalize'}}>Pågående filmer</h2>  
                        <div className={Styles.movieRow}>
                            <div id="ongoingMovies" className={Styles.scrollable}>
                                {ongoingMovies}
                            </div>
                            {ongoingMovies.length * 480 > windowSize.width &&
                                <>
                                    <div className={Styles.scrollButton} onClick={() => scrollLeft('ongoingMovies')}>
                                        <img src={`${process.env.NEXT_PUBLIC_SERVER_URL}/images/left.svg`} width="70" />
                                    </div>
                                    <div className={Styles.scrollButton} style={{right: '0'}} onClick={() => scrollRight('ongoingMovies')}>
                                        <img src={`${process.env.NEXT_PUBLIC_SERVER_URL}/images/right.svg`} width="70" />
                                    </div>
                                </>
                            }
                        </div> 
                    <hr className={Styles.divider}></hr>
                    </> 
                }

                {ongoingShows.length > 0 &&
                    <>
                        <h2 style={{textTransform: 'capitalize'}}>Pågående serier</h2>    
                        <div className={Styles.movieRow}>
                            <div id="ongoingShows" className={Styles.scrollable}>
                                {ongoingShows}
                            </div>
                            {ongoingShows.length * 480 > windowSize.width &&
                                <>
                                    <div className={Styles.scrollButton} onClick={() => scrollLeft('ongoingShows')}>
                                        <img src={`${process.env.NEXT_PUBLIC_SERVER_URL}/images/left.svg`} width="70" height="70" />
                                    </div>
                                    <div className={Styles.scrollButton} style={{right: '0'}} onClick={() => scrollRight('ongoingShows')}>
                                        <img src={`${process.env.NEXT_PUBLIC_SERVER_URL}/images/right.svg`} width="70" height="70" />
                                    </div>
                                </>
                            }
                        </div> 
                    <hr className={Styles.divider}></hr>
                    </> 
                }

                {newlyAddedMovies.length > 0 &&
                    <>
                        <Link href={"/server/" + server.server_id + "/movies"}><a style={{color: 'white'}}><h2 style={{textTransform: 'capitalize'}}>Nyligen tillagda filmer</h2></a></Link>   
                        <div className={Styles.movieRow}>
                            <div id="newlyAddedMovies" className={Styles.scrollable}>
                                {newlyAddedMovies}
                            </div>
                            {newlyAddedMovies.length * 480 > windowSize.width &&
                                <>
                                    <div className={Styles.scrollButton} onClick={() => scrollLeft('newlyAddedMovies')}>
                                        <img src={`${process.env.NEXT_PUBLIC_SERVER_URL}/images/left.svg`} width="70" height="70" />
                                    </div>
                                    <div className={Styles.scrollButton} style={{right: '0'}} onClick={() => scrollRight('newlyAddedMovies')}>
                                        <img src={`${process.env.NEXT_PUBLIC_SERVER_URL}/images/right.svg`} width="70" height="70" />
                                    </div>
                                </>
                            }
                        </div> 
                    <hr className={Styles.divider}></hr>
                    </> 
                }

                {movieWatchList.length > 0 &&
                    <>
                        <Link href={"/server/" + server.server_id + "/movies"}><a style={{color: 'white'}}><h2 style={{textTransform: 'capitalize'}}>Filmer att se senare</h2></a></Link>   
                        <div className={Styles.movieRow}>
                            <div id="movieWatchList" className={Styles.scrollable}>
                                {movieWatchList}
                            </div>
                            {movieWatchList.length * 480 > windowSize.width &&
                                <>
                                    <div className={Styles.scrollButton} onClick={() => scrollLeft('movieWatchList')}>
                                        <img src={`${process.env.NEXT_PUBLIC_SERVER_URL}/images/left.svg`} width="70" height="70" />
                                    </div>
                                    <div className={Styles.scrollButton} style={{right: '0'}} onClick={() => scrollRight('movieWatchList')}>
                                        <img src={`${process.env.NEXT_PUBLIC_SERVER_URL}/images/right.svg`} width="70" height="70" />
                                    </div>
                                </>
                            }
                        </div> 
                    <hr className={Styles.divider}></hr>
                    </> 
                }
                
                {newlyAddedEpisodes.length > 0 &&
                    <>
                        <Link href={"/server/" + server.server_id + "/shows"}><a style={{color: 'white'}}><h2 style={{textTransform: 'capitalize'}}>Nyligen tillagda avsnitt</h2></a></Link>
                        <div className={Styles.movieRow}>
                            <div id="newlyAddedEpisodes" className={Styles.scrollable}>
                                {newlyAddedEpisodes}
                            </div>
                            {newlyAddedEpisodes.length * 480 > windowSize.width &&
                                <>
                                    <div className={Styles.scrollButton} onClick={() => scrollLeft('newlyAddedEpisodes')}>
                                        <img src={`${process.env.NEXT_PUBLIC_SERVER_URL}/images/left.svg`} width="70" height="70" />
                                    </div>
                                    <div className={Styles.scrollButton} style={{right: '0'}} onClick={() => scrollRight('newlyAddedEpisodes')}>
                                        <img src={`${process.env.NEXT_PUBLIC_SERVER_URL}/images/right.svg`} width="70" height="70" />
                                    </div>
                                </>
                            }
                        </div> 
                    <hr className={Styles.divider}></hr>
                    </> 
                }
                
                {newlyAddedShows.length > 0 &&
                    <>
                        <Link href={"/server/" + server.server_id + "/shows"}><a style={{color: 'white'}}><h2 style={{textTransform: 'capitalize'}}>Nyligen tillagda serier</h2></a></Link>
                        <div className={Styles.movieRow}>
                            <div id="newlyAddedShows" className={Styles.scrollable}>
                                {newlyAddedShows}
                            </div>
                            {newlyAddedShows.length * 480 > windowSize.width &&
                                <>
                                    <div className={Styles.scrollButton} onClick={() => scrollLeft('newlyAddedShows')}>
                                        <img src={`${process.env.NEXT_PUBLIC_SERVER_URL}/images/left.svg`} width="70" height="70" />
                                    </div>
                                    <div className={Styles.scrollButton} style={{right: '0'}} onClick={() => scrollRight('newlyAddedShows')}>
                                        <img src={`${process.env.NEXT_PUBLIC_SERVER_URL}/images/right.svg`} width="70" height="70" />
                                    </div>
                                </>
                            }
                        </div> 
                    <hr className={Styles.divider}></hr>
                    </> 
                }
            </Container>
        </div>
        </Layout>
        }
        </>
    )
}

export default main;








// Get the information about the server and send it to the front end before render (this is server-side)
export async function getServerSideProps(context) {
    let serverId = context.params.server;
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
    .then((data) => {
        return {
            props: {
                server: data.server
            }
          }
    });
  }
