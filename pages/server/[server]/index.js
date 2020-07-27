import Layout from '../../../components/layout'
import Head from 'next/head'
import fetch from 'node-fetch'
import cookie from 'js-cookie';
import Router from 'next/router';
import { useEffect, useState } from 'react';
import { Carousel, Container, Row, Col } from 'react-bootstrap';
import Link from 'next/link';

import useWindowSize from '../../../components/hooks/WindowSize';


import Styles from '../../../styles/server.module.css';

import MovieBackdrop from '../../../components/movieBackdrop';

const fetcher = url =>
  fetch(url)
    .then(r => {
      return r.json().then(result => {
          return result;
      });
    }
  );

export default (props) => {
    // props.server is from the SSR under this function
    let server = props.server;
    const [latestMovies, setLatesMovies] = useState(null);
    const [ongoingMovies, setOngoingMovies] = useState([]);
    const [ongoingShows, setOngoingShows] = useState([]);
    const [newlyAddedMovies, setNewlyAddedMovies] = useState([]);
    const [newlyAddedShows, setNewlyAddedShows] = useState([]);


    const windowSize = useWindowSize();
    let allContent = [];




    // Check if user have access to this server
    const validateAccess = async (cb) => {
        return await fetch(`http://${server.server_ip}:4000/api/auth/validate`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                token: cookie.get('token')
            }),
        })
        .then((r) => r.json())
        .then((data) => {
            if (data.status === 'success') {
                cookie.set('serverToken', data.token, {expires: 2});
                cb();
            } else {
                Router.push('/');

            }
        });
    }

    /**
     * Makes a query to the current active server for a list of movies
     * 
     * @param {string} genre 
     * @param {string} orderby 
     * @param {int} limit 
     */
    const getMovieList = async (genre=null, orderby=null, limit=20, ongoing=false) => {
        return new Promise((resolve, reject) => {
            let url;
            if (ongoing) {
                url = `http://${server.server_ip}:4000/api/movies/list/ongoing?${orderby !== null ? 'orderby='+orderby+'&' : ''}limit=${limit}&token=${cookie.get('serverToken')}`
            } else {
                url = `http://${server.server_ip}:4000/api/movies/list${genre !== null ? '/genre/'+genre : ''}?${orderby !== null ? 'orderby='+orderby+'&' : ''}limit=${limit}&token=${cookie.get('serverToken')}`
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

    const getShowList = async (genre=null, orderby=null, limit=20, ongoing=false) => {
        return new Promise((resolve, reject) => {
            let url;
            if (ongoing) {
                url = `http://${server.server_ip}:4000/api/series/list/ongoing?${orderby !== null ? 'orderby='+orderby+'&' : ''}limit=${limit}&token=${cookie.get('serverToken')}`
            } else {
                url = `http://${server.server_ip}:4000/api/series/list${genre !== null ? '/genre/'+genre : ''}?${orderby !== null ? 'orderby='+orderby+'&' : ''}limit=${limit}&token=${cookie.get('serverToken')}`
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
        validateAccess(() => {
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
                setLatesMovies(movieElements);
            });

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
                setOngoingMovies(movieElements);
            });

            // Get newly added movies
            getMovieList(null, 'added_date', 20).then(movies => {
                let movieElements = [];
                for (let movie of movies) {
                    let img = movie.backdrop !== null ? `https://image.tmdb.org/t/p/w500/${movie.backdrop}` : 'https://via.placeholder.com/2000x1000' 
                    movieElements.push(
                        <MovieBackdrop markAsDoneButton id={movie.id} time={movie.watchtime} runtime={movie.runtime} title={movie.title} overview={movie.overview} runtime={movie.runtime} backdrop={img} onClick={(id) => selectMovie(movie.id)}></MovieBackdrop>
                    );
                }
                setNewlyAddedMovies(movieElements);
                
            });

            // Get newly added shows
            getShowList(null, 'added_date', 20).then(shows => {
                let showElements = [];
                for (let show of shows) {
                    let img = show.backdrop !== null ? `https://image.tmdb.org/t/p/w500/${show.backdrop}` : 'https://via.placeholder.com/2000x1000' 
                    showElements.push(
                        <MovieBackdrop markAsDoneButton id={show.id} time={show.watchtime} runtime={show.runtime} title={show.title} overview={show.overview} runtime={show.runtime} backdrop={img} onClick={(id) => selectShow(show.id)}></MovieBackdrop>
                    );
                }
                setNewlyAddedShows(showElements);
                
            });

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
                setOngoingShows(showElements);
            });
        });
    }, []);


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
    return (
        <Layout searchEnabled server={server}>
            <Head>
            </Head>
            <Carousel interval={10000}>
                {latestMovies}
            </Carousel>
            <br></br>
            <div style={{color: 'white'}}>
                <Container fluid>
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
                                            <img src="/images/left.svg" width="70" />
                                        </div>
                                        <div className={Styles.scrollButton} style={{right: '0'}} onClick={() => scrollRight('ongoingMovies')}>
                                            <img src="/images/right.svg" width="70" />
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
                                            <img src="/images/left.svg" width="70" />
                                        </div>
                                        <div className={Styles.scrollButton} style={{right: '0'}} onClick={() => scrollRight('ongoingShows')}>
                                            <img src="/images/right.svg" width="70" />
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
                                            <img src="/images/left.svg" width="70" />
                                        </div>
                                        <div className={Styles.scrollButton} style={{right: '0'}} onClick={() => scrollRight('newlyAddedMovies')}>
                                            <img src="/images/right.svg" width="70" />
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
                                            <img src="/images/left.svg" width="70" />
                                        </div>
                                        <div className={Styles.scrollButton} style={{right: '0'}} onClick={() => scrollRight('newlyAddedShows')}>
                                            <img src="/images/right.svg" width="70" />
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
    )
}








// Get the information about the server and send it to the front end before render (this is server-side)
export async function getServerSideProps(context) {
    let serverId = context.params.server;
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
    .then((data) => {
        return {
            props: {
                server: data.server
            }
          }
    });
  }