import Layout from '../../../components/layout'
import Head from 'next/head'
import fetch from 'node-fetch'
import cookie from 'js-cookie';
import Router from 'next/router';
import { useEffect, useState } from 'react';
import { Carousel, Container, Row, Col } from 'react-bootstrap';

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
    const [actionMovies, setActionMovies] = useState(null);
    const [latestMovies, setLatesMovies] = useState(null);
    const [dramaMovies, setDramaMovies] = useState(null);
    const [documentaryMovies, setDocumentaryMovies] = useState(null);

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
    const getMovieList = async (genre=null, orderby=null, limit=20) => {
        return new Promise((resolve, reject) => {
            const url = `http://${server.server_ip}:4000/api/movies/list${genre !== null ? '/'+genre : ''}?${orderby !== null ? 'orderby='+orderby+'&' : ''}limit=${limit}`
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

    useEffect(() => {
        validateAccess(() => {
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
                                style={{objectFit: 'cover', height: '80vh', minHeight: '500px'}}
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
            getMovieList('action', 'added_date', 20).then(movies => {
                movies.reverse();
                let movieElements = [];
                for (let movie of movies) {
                    let img = movie.backdrop !== null ? `https://image.tmdb.org/t/p/original/${movie.backdrop}` : 'https://via.placeholder.com/2000x1000' 
                    movieElements.push(
                        <MovieBackdrop title={movie.title} overview={movie.overview} runtime={movie.runtime} backdrop={img}></MovieBackdrop>
                    );
                }
                setActionMovies(movieElements);
            });

            getMovieList('drama', 'added_date', 20).then(movies => {
                movies.reverse();
                let movieElements = [];
                for (let movie of movies) {
                    let img = movie.backdrop !== null ? `https://image.tmdb.org/t/p/original/${movie.backdrop}` : 'https://via.placeholder.com/2000x1000' 
                    movieElements.push(
                        <MovieBackdrop title={movie.title} overview={movie.overview} runtime={movie.runtime} backdrop={img}></MovieBackdrop>
                    );
                }
                setDramaMovies(movieElements);
            });

            getMovieList('documentary', 'added_date', 20).then(movies => {
                movies.reverse();
                let movieElements = [];
                for (let movie of movies) {
                    let img = movie.backdrop !== null ? `https://image.tmdb.org/t/p/original/${movie.backdrop}` : 'https://via.placeholder.com/2000x1000' 
                    movieElements.push(
                        <MovieBackdrop title={movie.title} overview={movie.overview} runtime={movie.runtime} backdrop={img}></MovieBackdrop>
                    );
                }
                setDocumentaryMovies(movieElements);
            });
        });


    }, []);


    const scrollLeft = (id) => {
        document.getElementById(id).scrollLeft -= 1000;

    }
    const scrollRight = (id) => {
        document.getElementById(id).scrollLeft += 1000;
    }

    // LAYOUT //
    return (
        <Layout>
            <Head>
            </Head>
            <Carousel interval={10000}>
                {latestMovies}
            </Carousel>
            <br></br>
            <div style={{color: 'white'}}>
                <Container fluid>
                    <h2>Action</h2>
                    <div className={Styles.movieRow}>
                        <div id="actionMovies" className={Styles.scrollable}>
                            {actionMovies}
                        </div>
                        <div className={Styles.scrollButton} onClick={() => scrollLeft('actionMovies')}>
                            <img src="/images/left.svg" width="70" />
                        </div>
                        <div className={Styles.scrollButton} style={{right: '0'}} onClick={() => scrollRight('actionMovies')}>
                            <img src="/images/right.svg" width="70" />
                        </div>
                    </div>

                    <h2>Drama</h2>
                    <div className={Styles.movieRow}>
                        <div id="dramaMovies" className={Styles.scrollable}>
                            {dramaMovies}
                        </div>
                        <div className={Styles.scrollButton} onClick={() => scrollLeft('dramaMovies')}>
                            <img src="/images/left.svg" width="70" />
                        </div>
                        <div className={Styles.scrollButton} style={{right: '0'}} onClick={() => scrollRight('dramaMovies')}>
                            <img src="/images/right.svg" width="70" />
                        </div>
                    </div>

                    <h2>Documentaries</h2>
                    <div className={Styles.movieRow}>
                        <div id="documentaryMovies" className={Styles.scrollable}>
                            {documentaryMovies}
                        </div>
                        <div className={Styles.scrollButton} onClick={() => scrollLeft('documentaryMovies')}>
                            <img src="/images/left.svg" width="70" />
                        </div>
                        <div className={Styles.scrollButton} style={{right: '0'}} onClick={() => scrollRight('documentaryMovies')}>
                            <img src="/images/right.svg" width="70" />
                        </div>
                    </div>
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