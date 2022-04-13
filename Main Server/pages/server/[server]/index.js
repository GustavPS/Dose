import Layout from '../../../components/layout'
import Row from '../../../components/Row/row';
import Head from 'next/head'
import cookie from 'js-cookie';
import Router from 'next/router';
import { useEffect, useState, useRef } from 'react';
import { Container } from 'react-bootstrap';
import Link from 'next/link';
import Styles from '../../../styles/server.module.css';
import MovieBackdrop from '../../../components/movieBackdrop';
import EpisodePoster from '../../../components/episodePoster';
import socketIOClient from "socket.io-client";
import ContentServer from '../../../lib/ContentServer';

const Main = (props) => {
    // props.server is from the SSR under this function
    const server = props.server;
    const contentServer = new ContentServer(server);
    const [ongoingMovies, setOngoingMovies] = useState([]);
    const [movieWatchList, setMovieWatchList] = useState([]);
    const [ongoingShows, setOngoingShows] = useState([]);
    const [newlyAddedMovies, setNewlyAddedMovies] = useState([]);
    const [newlyAddedShows, setNewlyAddedShows] = useState([]);
    const [newlyAddedEpisodes, setNewlyAddedEpisodes] = useState([]);
    const [recommendedMovie, setRecommendedMovie] = useState(false);
    const [popularMovies, setPopularMovies] = useState([]);
    const [loaded, setLoaded] = useState(false)

    const newlyAddedMoviesRef = useRef(null);
    newlyAddedMoviesRef.current = newlyAddedMovies;

    const fetchData = () => {
        const promises = [
            contentServer.getPopularMovies(),
            contentServer.getOngoingMovies(),
            contentServer.getWatchlist(),
            contentServer.getNewlyAddedMovies(),
            contentServer.getNewlyAddedShows(),
            contentServer.getOngoingShows(),
            contentServer.getNewlyAddedEpisodes()
        ];
        Promise.all(promises).then(([popularMovies, ongoingMovies, watchlist, newlyAddedMovies, newlyAddedShows, ongoingShows, newlyAddedEpisodes]) => {
            setPopularMovies(popularMovies);
            setOngoingMovies(ongoingMovies);
            setMovieWatchList(watchlist);
            setNewlyAddedMovies(newlyAddedMovies);
            setNewlyAddedShows(newlyAddedShows);
            setOngoingShows([...ongoingShows.upcoming, ...ongoingShows.ongoing]);
            setNewlyAddedEpisodes(newlyAddedEpisodes);
            setLoaded(true);
        });
    }

    const setupSockets = () => {
        const socket = socketIOClient(server.server_ip);
        socket.on("newMovie", movie => {
            if (!newlyAddedMovies.includes(movie)) {
                setNewlyAddedMovies(oldArray => [movie, ...oldArray.slice(0, 19)]);
            }
        });
        socket.on("newEpisode", episode => {
            if (!newlyAddedEpisodes.includes(episode)) {
                setNewlyAddedEpisodes(oldArray => [episode, ...oldArray.slice(0, 19)]);
            }
        });
        socket.on("newShow", show => {
            if (!newlyAddedShows.includes(show)) {
                setNewlyAddedShows(oldArray => [show, ...oldArray.slice(0, 19)]);
            }
        });
    }

    useEffect(() => {
        setupSockets();
        fetchData();
        contentServer.getRandomTrailer().then(movie => {
            setRecommendedMovie(movie);
        }).catch(err => {
            console.error(err);
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

    const renderMovie = (item, index) => {
        const img = item.backdrop !== null ? `https://image.tmdb.org/t/p/w500/${item.backdrop}` : 'https://via.placeholder.com/2000x1000'
        return (
            <MovieBackdrop id={item.id} time={item.watchtime} runtime={item.runtime} title={item.title}
                overview={item.overview} backdrop={img} onClick={(id) => selectMovie(item.id)}>
            </MovieBackdrop>
        )
    }

    const renderShows = (item, index) => {
        const img = item.backdrop !== null ? `https://image.tmdb.org/t/p/w500/${item.backdrop}` : 'https://via.placeholder.com/2000x1000'
        return (
            <MovieBackdrop id={item.id} time={item.watchtime} runtime={item.runtime} title={item.title} overview={item.overview}
                backdrop={img} onClick={(id) => selectShow(item.id)}>
            </MovieBackdrop>
        )
    }

    const renderEpisodes = (item, index) => {
        const poster = item.season_poster !== null ? `https://image.tmdb.org/t/p/w500/${item.season_poster}` : 'https://via.placeholder.com/500x1000';
        const backdrop = item.backdrop !== null ? `https://image.tmdb.org/t/p/w500/${item.backdrop}` : 'https://via.placeholder.com/500x1000'
        return (
            <EpisodePoster show={item.serie_id} season={item.season} episode={item.episode} poster={poster}
                internalEpisodeID={item.internalepisodeid} backdrop={backdrop}
                onClick={(season, episode, show, internalEpisodeID) => selectEpisode(show, season, episode, internalEpisodeID)}>
            </EpisodePoster>
        );
    };

    const renderOngoing = (item, index) => {
        let img = item.backdrop !== null ? `https://image.tmdb.org/t/p/w500/${item.backdrop}` : 'https://via.placeholder.com/2000x1000'
        return (
            <MovieBackdrop showTitle id={item.id} time={item.time_watched} title={item.season_name + " - Episode " + item.episode_number}
                overview={item.overview} runtime={item.total_time} backdrop={img}
                onClick={(id) => selectEpisode(item.show_id, item.season_number, item.episode_number, item.internalepisodeid)}>
            </MovieBackdrop>
        );
    }

    // LAYOUT //
    return (<>
        <Head>
            <title>Dose - {server.server_name}</title>
        </Head>
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
                    <title>Dose - {server.server_name}</title>
                </Head>
                {recommendedMovie != false &&
                    <div className={Styles.recommended}>
                        <video autoPlay={true} loop={true} preload="auto" muted>
                            <source src={`${server.server_ip}/api/trailer/${recommendedMovie["id"]}?type=MOVIE&token=${cookie.get('serverToken')}`} type="video/mp4" />
                        </video>
                        <div className={Styles.recommendedInformation}>
                            {recommendedMovie["activeLogo"] != false &&
                                <img src={`https://image.tmdb.org/t/p/original/${recommendedMovie["activeLogo"].path}`} className={Styles.logo} alt="Logo" />
                            }
                            {recommendedMovie["activeLogo"] == false &&
                                <h1>{recommendedMovie["title"]}</h1>
                            }
                            <p>{recommendedMovie["overview"]}</p>
                            <div className={Styles.controls}>
                                <Link passHref={true} href={`/server/${server.server_id}/movies/video/${recommendedMovie["id"]}?autoPlay=true`}>
                                    <img src={`${process.env.NEXT_PUBLIC_SERVER_URL}/images/001-play-button.png`} alt="Play" />
                                </Link>
                                <Link passHref={true} href={`/server/${server.server_id}/movies/video/${recommendedMovie["id"]}`}>
                                    <img src={`${process.env.NEXT_PUBLIC_SERVER_URL}/images/002-information.png`} alt="More info" />
                                </Link>
                            </div>
                        </div>
                    </div>
                }

                <br></br>
                <div style={{ color: 'white' }}>
                    <Container fluid className={Styles.contentRows}>

                        <Row title="Popular" items={popularMovies} itemSize={480} render={renderMovie}></Row>
                        <Row title="Ongoing Movies" items={ongoingMovies} itemSize={480} render={renderMovie}></Row>
                        <Row title="Ongoing Shows" items={ongoingShows} itemSize={480} render={renderOngoing}></Row>
                        <Row title="Watchlist" items={movieWatchList} itemSize={480} render={renderMovie}></Row>
                        <Row title="Newly added" items={newlyAddedMovies} itemSize={480} render={renderMovie}></Row>
                        <Row title="Newly Added Episodes" items={newlyAddedEpisodes} itemSize={202} render={renderEpisodes}></Row>
                        <Row title="Newly Added Shows" items={newlyAddedShows} itemSize={480} render={renderShows}></Row>

                    </Container>
                </div>
            </Layout>
        }
    </>
    )
}

export default Main;

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
    }).then((r) => r.json()).then((data) => {
        return {
            props: {
                server: data.server
            }
        }
    });
}
