import Layout from '../../../../components/layout'
import Head from 'next/head'
import cookie from 'js-cookie';
import Router from 'next/router';
import { useEffect, useState } from 'react';
import { Carousel, Container } from 'react-bootstrap';
import Styles from '../../../../styles/server.module.css';
import Row from '../../../../components/Row/row';
import ContentServer from '../../../../lib/ContentServer';
import MovieBackdrop from '../../../../components/movieBackdrop';

export default (props) => {
    // props.server is from the SSR under this function
    const [genres, setGenres] = useState([]);
    const server = props.server;
    const contentServer = new ContentServer(server);

    const fetchData = () => {
        contentServer.getAllGenres().then(genres => {
            const promises = [];
            for (let genre of genres) {
                promises.push(contentServer.getMoviesByGenre(genre.name));
            }
            Promise.all(promises).then(values => {
                setGenres(values.map((movies, idx) => {
                    return {
                        name: genres[idx].name,
                        movies: movies
                    }
                }));
            });
        });
    }

    useEffect(() => {
        fetchData();
    }, []);

    const selectMovie = (id) => {
        Router.push(`/server/${server.server_id}/movies/video/${id}`);
    }
    
    const renderMovie = (item, _index) => {
        const img = item.backdrop !== null ? `https://image.tmdb.org/t/p/w500/${item.backdrop}` : 'https://via.placeholder.com/2000x1000'
        return (
            <MovieBackdrop id={item.id} time={item.watchtime} runtime={item.runtime} title={item.title}
                overview={item.overview} backdrop={img} onClick={(id) => selectMovie(item.id)}>
            </MovieBackdrop>
        )
    }

    // LAYOUT //
    return (
        <Layout relative searchEnabled server={server} serverToken={cookie.get('serverToken')}>
            <Head>
                <title>Dose</title>
            </Head>
            <br></br>
            <div style={{color: 'white'}}>
                <Container fluid>
                    {genres.map((genre, idx) => {
                        return <Row link={`/server/${server.server_id}/movies/genre/${genre.name}`}
                                    title={genre.name}
                                    key={idx}
                                    items={genre.movies}
                                    itemSize={480}
                                    render={renderMovie}>
                                </Row>
                    })}
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
