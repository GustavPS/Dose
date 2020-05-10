import Head from 'next/head'
import styles from './layout.module.css'
import utilStyles from '../styles/utils.module.css'
import Link from 'next/link'

const name = 'Gustav P Svensson'

export default function Layout({ children, home }) {
  return (
    <div>
      <Head>
      </Head>
      <header>
          
      </header>
      <main>{children}</main>
    </div>
  )
}