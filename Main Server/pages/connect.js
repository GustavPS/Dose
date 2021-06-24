import Head from 'next/head'
import Layout from '../components/layout'
import style from '../styles/connect.module.css';
import ConnectCode from '../components/connectCode';
import cookies from 'next-cookies';


export default function Connect(props) {
    const code = props.code;
    return (
        <Layout home relative>
            <Head>

            </Head>
            <div className={style.connect}>
                <h1>Connect</h1>
                <p>Enter this code to your app to connect your account!</p>
                <ConnectCode code={code}></ConnectCode>
            </div>
        </Layout>
  )
}

// Get the information about the server and send it to the front end before render (this is server-side)
export async function getServerSideProps(context) {

    return await fetch(`http://localhost:${process.env.SERVER_PORT}${process.env.SERVER_SUB_FOLDER}/api/auth/tv/getConnectCode?token=${cookies(context).token}`)
    .then(r => r.json())
    .then(result => {
        return {props: {
            code: result.code
        }}
    });
}
  