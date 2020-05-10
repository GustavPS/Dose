import Layout from '../../components/layout'
import Head from 'next/head'
import useSWR from 'swr';
import fetch from 'node-fetch'
import cookie from 'js-cookie';
import Router from 'next/router';


// Check if user have access to this server
const validateAccess = () => {
    fetch('http://localhost:4000/api/auth/validate', {
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
        } else {
            Router.push('/');
        }
    });
}


export default function Server() {
    validateAccess();


    return (
        <Layout>
            <Head>
            </Head>
        </Layout>
    )
}
