import Layout from "../../../../../components/layout";
import Styles from "../../../../../styles/genre.module.css";
import cookie from "js-cookie";
import Head from "next/head";
import Router, { useRouter } from 'next/router'
import { useEffect, useState } from "react";
import MovieBackdrop from "../../../../../components/movieBackdrop";
import { useBottomScrollListener } from 'react-bottom-scroll-listener';
import ContentServer from "../../../../../lib/ContentServer";
import Spinner from "../../../../../components/Spinner/spinner";

const Main = (props) => {
    const router = useRouter();
    const server = props.server;
    const limit = 30;
    const contentServer = new ContentServer(server);
    const { genre } = router.query
    const [offset, setOffset] = useState(0);
    const [gotAllMovies, setGotAllMovies] = useState(false);
    const [fetchingNewData, setFetchingNewData] = useState(false);
    const [movies, setMovies] = useState([]);

    const handleScroll = () => {
        if (!fetchingNewData && !gotAllMovies) {
            fetchData();
        }
    }
    useBottomScrollListener(handleScroll);

    const fetchData = () => {
        setFetchingNewData(true);
        contentServer.getMoviesByGenre(genre, limit, offset).then(data => {
            if (data.length === 0) {
                setGotAllMovies(true);
                setFetchingNewData(false);
                return;
            }
            setOffset(offset + limit);
            setMovies(movies.concat(data));
            setFetchingNewData(false);
        });
    }

    useEffect(() => {
        fetchData();
    }, []);

    const selectMovie = (id) => {
        Router.push(`/server/${server.server_id}/movies/video/${id}`);
    }

    // LAYOUT //
    return (
        <Layout searchEnabled server={server} serverToken={cookie.get('serverToken')} style={{ overflowY: "scroll" }}>
            <Head>
            </Head>
            <div style={{ color: 'white', paddingTop: "120px" }} >
                <div style={{ textAlign: "center" }}>
                    <h1>{genre.charAt(0).toUpperCase() + genre.slice(1)} movies</h1>

                    {movies.map((movie, idx) => {
                        return (
                            <MovieBackdrop multipleRows
                                key={idx}
                                markAsDoneButton
                                id={movie.id}
                                runtime={movie.runtime}
                                title={movie.title}
                                overview={movie.overview}
                                backdrop={movie.backdrop !== null ? `https://image.tmdb.org/t/p/w500/${movie.backdrop}` : 'https://via.placeholder.com/2000x1000'}
                                onClick={(id) => selectMovie(movie.id)} />
                        )
                    })}
                    {fetchingNewData &&
                        <Spinner className={Styles.spinner}></Spinner>
                    }
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