import Head from 'next/head'
import styles from './layout.module.css'
import Search from './search';
import {useState} from 'react'
import MovieBackdrop from './movieBackdrop';
import Router from 'next/router';
import useWindowSize from './hooks/WindowSize';


export default function Layout({ children, home, searchEnabled, server, relative, serverToken}) {
  const windowSize = useWindowSize();
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  let currentResults = [];
  let count = 0;
  searchEnabled = searchEnabled == undefined ? false : true;
  let shouldShowMenu = server == undefined ? false : true;

  const selectMovie = (id) => {
      Router.push(`/server/${server.server_id}/movies/video/${id}`);
  }

  const selectShow = (id) => {
    Router.push(`/server/${server.server_id}/shows/video/${id}`);
  }

  const onSearch = (result) => {
    console.log("search enabled " + searchEnabled)
    console.log(result);
      let elements = []
      for (let content of result) {
          let img;
          for (let image of content.images) {
              if (image.type === 'BACKDROP') {
                  img = image.path !== 'no_image' ? `https://image.tmdb.org/t/p/w500/${image.path}` : 'https://via.placeholder.com/2000x1000' 
                  break;
              }
          }
          if (content.type === 'movie') {
            elements.push(
              <MovieBackdrop multipleRows key={count} id={content.id} title={content.title} overview={content.overview} backdrop={img} onClick={(id) => selectMovie(id)}></MovieBackdrop>
            );
          } else if (content.type === 'serie') {
            elements.push(
              <MovieBackdrop multipleRows key={count} id={content.id} title={content.title} overview={content.overview} backdrop={img} onClick={(id) => selectShow(id)}></MovieBackdrop>
            );
          }

          count++;
      }
      setIsSearching(true);
      setSearchResults(elements);
  }

  const onClose = () => {
    setIsSearching(false);
  }



  return (
    <div>
      <Head>
        <link rel="shortcut icon" 
        type="image/x-icon"
        href={`${process.env.NEXT_PUBLIC_SERVER_URL}/favicon.ico`} />
        <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@300&display=swap" rel="stylesheet" />
        <title>Dose</title>
      </Head>
      <header className={styles.header} style={relative !== undefined ? {position: 'relative'} : {}}>
          {!shouldShowMenu &&
            <img className={styles.logo} src={`${process.env.NEXT_PUBLIC_SERVER_URL}/images/logo.png`} layout="fill"></img>
          }
          {shouldShowMenu &&
            <>
              <a href={`/server/${server.server_id}`}><img className={styles.logo} src={`${process.env.NEXT_PUBLIC_SERVER_URL}/images/logo.png`} layout="fill"></img></a>
              <a href={`/server/${server.server_id}/movies`} className={styles.menuBtn}>Movies</a>
              <a href={`/server/${server.server_id}/shows`} className={styles.menuBtn}>Shows</a>
            </>
          }

        
        {searchEnabled &&
          <Search onClose={() => onClose()} searchEnabled={searchEnabled} server={server} serverToken={serverToken} onSearch={(result) => onSearch(result)}></Search>}
      </header>
      {isSearching &&
      <div style={{position: 'relative', top: '115px', textAlign: 'center'}}>
          <h2 style={{textTransform: 'capitalize', margin: '0 0 15px 15px', color: 'white'}}>Results ({searchResults.length})</h2>  
        <div className={styles.searchResultBox}>
            {searchResults}
        </div>
        </div>
      }

      {!isSearching &&
        <main>{children}</main>
      }
    </div>
  )
}

