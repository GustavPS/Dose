import Head from 'next/head'
import styles from './layout.module.css'
import Search from './search';
import {useState} from 'react'
import MovieBackdrop from './movieBackdrop';
import Router from 'next/router';
import Image from 'next/image';
import useWindowSize from './hooks/WindowSize';


export default function Layout({ children, home, searchEnabled, server, relative}) {
  const windowSize = useWindowSize();
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  let currentResults = [];
  let count = 0;
  searchEnabled = searchEnabled == undefined ? false : true;

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
                  img = image.path !== null ? `https://image.tmdb.org/t/p/w500/${image.path}` : 'https://via.placeholder.com/2000x1000' 
                  break;
              }
          }
          if (content.type === 'movie') {
            elements.push(
              <MovieBackdrop showTitle key={count} id={content.id} title={content.title} overview={content.overview} backdrop={img} onClick={(id) => selectMovie(content.id)}></MovieBackdrop>
            );
          } else if (content.type === 'serie') {
            elements.push(
              <MovieBackdrop showTitle key={count} id={content.id} title={content.title} overview={content.overview} backdrop={img} onClick={(id) => selectShow(content.id)}></MovieBackdrop>
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

  const scrollLeft = (id) => {
    document.getElementById(id).scrollLeft -= (window.innerWidth)*0.8;
    window.scrollTo(window.scrollX, window.scrollY - 1);
    window.scrollTo(window.scrollX, window.scrollY + 1);
  }
  const scrollRight = (id) => {
      document.getElementById(id).scrollLeft += (window.innerWidth)*0.8;
      window.scrollTo(window.scrollX, window.scrollY - 1);
      window.scrollTo(window.scrollX, window.scrollY + 1);
  }



  return (
    <div>
      <Head>
        <link rel="icon" 
        type="image/png" 
        href="../public/images/favicon.png" />
        <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@300&display=swap" rel="stylesheet" />
      </Head>
      <header style={relative !== undefined ? {position: 'relative'} : {}}>
        <img className={styles.logo} src={`${process.env.NEXT_PUBLIC_SERVER_URL}/images/logo.png`} layout="fill"></img>
        {searchEnabled &&
          <Search onClose={() => onClose()} searchEnabled={searchEnabled} server={server} onSearch={(result) => onSearch(result)}></Search>}
      </header>
      {isSearching &&
      <div style={{position: 'relative', top: '115px'}}>
          <h2 style={{textTransform: 'capitalize', margin: '0 0 15px 15px', color: 'white'}}>Sökresultat</h2>  
        <div className={styles.searchResultBox}>
          <div id="searchRow" className={styles.SearchResult}>
            {searchResults}
          </div>
          {searchResults.length * 480 > windowSize.width &&
                                        <>
                                            <div className={styles.scrollButton} onClick={() => scrollLeft('searchRow')}>
                                                <img src={`${process.env.NEXT_PUBLIC_SERVER_URL}/images/left.svg`} width="70" height="70" />
                                            </div>
                                            <div className={styles.scrollButton} style={{right: '0'}} onClick={() => scrollRight('searchRow')}>
                                                <img src={`${process.env.NEXT_PUBLIC_SERVER_URL}/images/right.svg`} width="70" height="70" />
                                            </div>
                                        </>
          }
        </div>
        </div>
      }

      {!isSearching &&
        <main>{children}</main>
      }
    </div>
  )
}