import Layout from '../../../../components/layout'
import Head from 'next/head'
import fetch from 'node-fetch'
import cookie from 'js-cookie';
import Router from 'next/router';
import { useEffect, useState } from 'react';
import { Carousel, Container, Row, Col } from 'react-bootstrap';
import validateServerAccess from '../../../../lib/validateServerAccess';
import Styles from '../../../../styles/server.module.css';
import MovieBackdrop from '../../../../components/movieBackdrop';

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
    const [movies, setMovies] = useState([]);
    const [ongoingMovies, setOngoingMovies] = useState([]);
    let allContent = [];

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
                console.log(response);
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
            // Get all the newest released movies (The slieshow)
            getMovieList(null, 'added_date', 5).then(movies => {
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
                                style={{objectFit: 'cover', height: '80vh', minHeight: '500px'}}
                                onClick={() => {selectShow(movie.id)}}
                            />
                            <Carousel.Caption>
                                <h3>{movie.title}</h3>
                                <p>{movie.overview}</p>
                            </Carousel.Caption>
                        </Carousel.Item>
                    );
                }
                setLatesMovies(movieElements);
            });

            // Get ongoing movies
            getMovieList(null, 'added_date', 20, true).then(result => {
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
                setOngoingMovies(showElements);
            });

            




            // Get all genres from the server
            fetch(`${server.server_ip}/api/genre/list?token=${cookie.get('serverToken')}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then((r) => r.json())
            .then(async (result) => {
                let genres = result.genres;
                for (let genre of genres) {
                    // Get the movies for that genre
                    getMovieList(genre.name, 'added_date', 20).then(movieList => {
                        let genreList = movies;
                        movieList.reverse();
                        let movieElements = [];
                        for (let movie of movieList) {
                            let img = movie.backdrop !== null ? `https://image.tmdb.org/t/p/w500/${movie.backdrop}` : 'https://via.placeholder.com/2000x1000' 
                            movieElements.push(
                                <MovieBackdrop title={movie.title} overview={movie.overview} runtime={movie.runtime} backdrop={img} onClick={(id) => selectShow(movie.id)}></MovieBackdrop>
                            );
                        }
                        genreList.push({
                            name: genre.name,
                            movieElements: movieElements
                        });
                        setMovies([]);
                        setMovies(genreList);
                    });
                }
            });
        });
    }, []);


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

    const showMovies = () => {
        let render = []
        movies.map((genre, index) => {
            if (genre.movieElements.length != 0) {
                render.push(
                    <>
                        <h2 style={{textTransform: 'capitalize'}}>{genre.name}</h2>    
                    <div className={Styles.movieRow}>
                        <div id={genre.name + "Movies"} className={Styles.scrollable}>
                            {genre.movieElements}
                        </div>
                        {genre.movieElements.length >= 5 &&
                            <>
                                <div className={Styles.scrollButton} onClick={() => scrollLeft(genre.name + 'Movies')}>
                                    <img src="../../../../images/left.svg" width="70" />
                                </div>
                                <div className={Styles.scrollButton} style={{right: '0'}} onClick={() => scrollRight(genre.name + 'Movies')}>
                                    <img src="../../../../images/right.svg" width="70" />
                                </div>

                            </>
                        }
                        
                    </div>
                    <hr className={Styles.divider}></hr>
                    </>   
                );
            }
        })
        return render;
    }

    const selectShow = (id) => {
        Router.push(`/server/${server.server_id}/shows/video/${id}`);
    }

    const selectEpisode = (showID, seasonNumber, episodeNumber, internalEpisodeID) => {
        Router.push(`/server/${server.server_id}/shows/video/${showID}/season/${seasonNumber}/episode/${episodeNumber}?internalID=${internalEpisodeID}`)
    }


    // LAYOUT //
    return (
        <Layout searchEnabled server={server} serverToken={cookie.get('serverToken')}>
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
                            <h2 style={{textTransform: 'capitalize'}}>Ongoing</h2>    
                            <div className={Styles.movieRow}>
                                <div id="ongoingMovies" className={Styles.scrollable}>
                                    {ongoingMovies}
                                </div>
                                {ongoingMovies.length >= 5 &&
                                    <>
                                        <div className={Styles.scrollButton} onClick={() => scrollLeft('ongoingMovies')}>
                                            <img src="../../../../images/left.svg" width="70" />
                                        </div>
                                        <div className={Styles.scrollButton} style={{right: '0'}} onClick={() => scrollRight('ongoingMovies')}>
                                            <img src="../../../../images/right.svg" width="70" />
                                        </div>
                                    </>
                                }
                            </div> 
                        <hr className={Styles.divider}></hr>
                        </> 
                    }
                    {showMovies()}
                </Container>
            </div>
        </Layout>
    )
}








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
