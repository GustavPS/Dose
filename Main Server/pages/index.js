import Head from 'next/head'
import Layout from '../components/layout'
import style from '../styles/index.module.css';
import useSWR from 'swr';
import ServerBox from '../components/serverBox';
import Router from 'next/router';
import cookie from 'js-cookie';

// Fetcher for useSWR, redirect to login if not authorized
const fetcher = url =>
  fetch(url)
    .then(r => {
      return r.json().then(result => {
        return result;
      });
    }
  );
const chooseServer = server => {
  cookie.set('server', JSON.stringify({
    id: server.server_id,
    name: server.server_name,
    ip: server.server_ip
  }));
  Router.push(`/server/${server.server_id}`);
}

export default function Home() {
  const { data, error } = useSWR(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/servers/getServers?token=${cookie.get('token')}`, fetcher);

  return (
    <Layout home relative>
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
