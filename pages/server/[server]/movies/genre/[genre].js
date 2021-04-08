import Layout from "../../../../../components/layout";
import cookie from "js-cookie";
import Head from "next/head";
import Router, { useRouter } from 'next/router'
import getMoviesByGenre from '../../../../../lib/movieApi';
import {useEffect, useState} from "react";
import MovieBackdrop from "../../../../../components/movieBackdrop";
import { useBottomScrollListener } from 'react-bottom-scroll-listener';


const Main = (props) => {
    let router = useRouter();
    let server = props.server;
    let {genre} = router.query
    let limit = 30;
    const [offset, setOffset] = useState(0);
    const [gotAllMovies, setGotAllMovies] = useState(false);
    const [fetchingNewData, setFetchingNewData] = useState(false);
    const [movies, setMovies] = useState([]);

    const handleScroll = () => {
        if (!fetchingNewData && !gotAllMovies) {
            getMovies();
        }
    }
    useBottomScrollListener(handleScroll);

    const getMovies = () => {
        setFetchingNewData(true);
        getMoviesByGenre(server, genre, offset, limit)
            .then(result => {
                setOffset(result.nextOffset);
                if (result.movies.length === 0) {
                    setGotAllMovies(true);
                    return;
                }

                let movieElements = [];
                for (let movie of result.movies) {
                    let img = movie.backdrop !== null ? `https://image.tmdb.org/t/p/w500/${movie.backdrop}` : 'https://via.placeholder.com/2000x1000'
                    movieElements.push(
                        <MovieBackdrop multipleRows
                                       markAsDoneButton
                                       id={movie.id}
                                       runtime={movie.runtime}
                                       title={movie.title}
                                       overview={movie.overview}
                                       runtime={movie.runtime}
                                       backdrop={img}
                                       onClick={(id) => selectMovie(movie.id)} />
                    );
                }
                setMovies(movies.concat(movieElements));
                setFetchingNewData(false);
            });
    }

    useEffect(() => {
        getMovies();
    }, []);

    const selectMovie = (id) => {
        Router.push(`/server/${server.server_id}/movies/video/${id}`);
    }


    // LAYOUT //
    return (
        <Layout searchEnabled server={server} serverToken={cookie.get('serverToken')} style={{overflowY: "scroll"}}>
            <Head>
            </Head>
            <div style={{color: 'white', paddingTop: "120px"}} >
                <div style={{textAlign: "center"}}>
                    <h1>{genre.charAt(0).toUpperCase() + genre.slice(1)} movies</h1>
                    {movies}
                </div>
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


export default Main;