import Layout from '../../components/layout'
import Head from 'next/head'
import useSWR, { useSWRPages } from 'swr';
import fetch from 'node-fetch'
import cookie from 'js-cookie';
import Router from 'next/router';
import cookies from 'next-cookies';
import { useEffect, useState } from 'react';

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

    const getMovieList = async (cb) => {
        console.log("cb");
        fetch(`http://${server.server_ip}:4000/api/movies/list/action`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                limit: 20
            })
        })
        .then((r) => r.json())
        .then((result) => {
            let movies = [];
            console.table(result.data)

            result.data.forEach(movie => {
                movies.push(<h1>{movie.name}</h1>)
                
            });

            setActionMovies(movies);
        });
    }
    useEffect(() => {
        validateAccess(getMovieList);
    }, []);


    return (
        <Layout>
            <Head>
            </Head>
            {actionMovies}
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