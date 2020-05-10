import Head from 'next/head'
import Layout from '../components/layout'
import style from '../styles/index.module.css';
import useSWR from 'swr';
import ServerBox from '../components/serverBox';
import Router from 'next/router';
let LoggedIn = true;

// Fetcher for useSWR, redirect to login if not authorized
const fetcher = url =>
  fetch(url)
    .then(r => {
      return r.json().then(result => {
        if (result.error !== undefined && result.error === 'unauthorized') {
          Router.push('/login');
        }
        return result;
      });
    }
  );
const chooseServer = server => {
  Router.push(`/server/${server.server_id}`);
}

export default function Home() {
  const { data, error } = useSWR('/api/servers/getServers', fetcher);

  return (
    <Layout home>
      <Head>
      </Head>
      {data && data.servers &&
      <div className={style.servers}>
        {data.servers.map((server, i) => <ServerBox onClick={() => chooseServer(server)} name={server.server_name} adress={server.server_ip}></ServerBox>)}
      </div>
      }

      {!data &&
      <h1>Loading</h1>
      }

      {error &&
      <h1>fel</h1>
      }
    </Layout>
  )
}