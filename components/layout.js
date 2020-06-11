import Head from 'next/head'
import styles from './layout.module.css'
import Search from './search';
import {useState} from 'react'
import MovieBackdrop from './movieBackdrop';
import Router from 'next/router';


export default function Layout({ children, home, searchEnabled, server, relative}) {

  const [searchResults, setSearchResults] = useState([]);
  let currentResults = [];
  let count = 0;

  const selectMovie = (id) => {
      Router.push(`/server/${server.server_id}/video/${id}`);
  }

  const onSearch = (result) => {
      let elements = []
      for (let content of result) {
          let img;
          for (let image of content.images) {
              if (image.type === 'BACKDROP') {
                  img = image.path !== null ? `https://image.tmdb.org/t/p/w500/${image.path}` : 'https://via.placeholder.com/2000x1000' 
                  break;
              }
          }
          elements.push(
            <MovieBackdrop showTitle key={count} id={content.id} title={content.title} overview={content.overview} backdrop={img} onClick={(id) => selectMovie(content.id)}></MovieBackdrop>
          );
          count++;
      }

      let shouldReRender = false;
      for (let obj of currentResults) {
          let found = false;
          for (let content of result) {
              if (obj.id === content.id) {
                  found = true;
                  break;
              }
          }
          if (!found) {
              shouldReRender = true;
              break;
          }
      }
      currentResults = result;
      if (result.length > 0) {
        document.getElementById('searchRow').classList.add(styles.SearchResultOpen);
      } else {
        document.getElementById('searchRow').classList.remove(styles.SearchResultOpen);
      }
      if (shouldReRender) {
        setSearchResults(elements);
      }
  }



  return (
    <div>
      <Head>
        <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@300&display=swap" rel="stylesheet" />
      </Head>
      <header style={relative !== undefined ? {position: 'relative'} : {}}>
        <Search searchEnabled={searchEnabled} server={server} onSearch={(result) => onSearch(result)}></Search>
      </header>
      <div id="searchRow" className={styles.SearchResult}>
        {searchResults}
      </div>
      <main>{children}</main>
    </div>
  )
}