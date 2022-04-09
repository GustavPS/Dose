import Layout from '../../../../components/layout'
import Head from 'next/head'
import cookie from 'js-cookie';
import Router from 'next/router';
import { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import Styles from '../../../../styles/server.module.css';
import MovieBackdrop from '../../../../components/movieBackdrop';
import Row from '../../../../components/Row/row';
import ContentServer from '../../../../lib/ContentServer';

export default (props) => {
    // props.server is from the SSR under this function
    const [genres, setGenres] = useState([]);
    const server = props.server;
    const contentServer = new ContentServer(server);

    const fetchData = () => {
        contentServer.getAllGenres().then(genres => {
            const promises = [];
            for (const genre of genres) {
                promises.push(contentServer.getShowsByGenre(genre.name));
            }
            Promise.all(promises).then(values => {
                setGenres(values.map((shows, idx) => {
                    return {
                        name: genres[idx].name,
                        shows: shows
                    }
                }));
            });
        });
    }

    useEffect(() => {
        fetchData();
    }, []);

    const selectShow = (id) => {
        Router.push(`/server/${server.server_id}/shows/video/${id}`);
    }

    const renderShow = (item, _index) => {
        const img = item.backdrop !== null ? `https://image.tmdb.org/t/p/w500/${item.backdrop}` : 'https://via.placeholder.com/2000x1000'
        return (
            <MovieBackdrop id={item.id} time={item.watchtime} runtime={item.runtime} title={item.title}
                overview={item.overview} backdrop={img} onClick={(id) => selectShow(item.id)}>
            </MovieBackdrop>
        )
    }


    // LAYOUT //
    return (
        <Layout relative searchEnabled server={server} serverToken={cookie.get('serverToken')}>
            <Head>
            </Head>
            <div style={{ color: 'white' }}>
                <Container fluid>
                    {genres.map((genre, idx) => {
                        return <Row
                            title={genre.name}
                            key={idx}
                            items={genre.shows}
                            itemSize={480}
                            render={renderShow}>
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
