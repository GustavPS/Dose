import Head from 'next/head'
import Layout from '../../../../components/layout'
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router'
import ReactPlayer from 'react-player'
import Styles from '../../../../styles/video.module.css';

 
import Plyr from 'plyr';

// Fetcher for useSWR, redirect to login if not authorized


export default function Home() {
  const router = useRouter();
  const { id } = router.query;

  let baseVideoUrl = `http://localhost:4000/api/video/${id}`;

  let video;

  useEffect(() => {
    video = videojs("video");
    video.src({
      src: `http://localhost:4000/api/video/${id}`,
      type: 'video/webm',
    });
    video.poster("https://image.tmdb.org/t/p/original/k20j3PMQSelVQ6M4dQoHuvtvPF5.jpg");


     // hack duration
     video.duration= function() {return video.theDuration; };
     video.start= 0;

     // The original code for "currentTime"
     video.oldCurrentTime = function currentTime(seconds) {
      if (typeof seconds !== 'undefined') {
        if (seconds < 0) {
          seconds = 0;
        }

        this.techCall_('setCurrentTime', seconds);
        return;
      }
      this.cache_.currentTime = this.techGet_('currentTime') || 0;
      return this.cache_.currentTime;
    }

      // Our modified currentTime
     video.currentTime= function(time) 
     { 
         if( time == undefined )
         {
             return video.oldCurrentTime() + video.start;
         }
         video.start= time;
         video.oldCurrentTime(0);
         video.src({
           src: `http://localhost:4000/api/video/${id}?start=${time}`,
           type: 'video/webm'
          });
         video.play();
         return this;
     };

       // Get the dureation of the movie
       if (id !== undefined) {
        $.getJSON( `http://localhost:4000/api/video/${id}/getDuration`, function( data ) 
        {
            video.theDuration= data.duration;
        });
       }

  });


  return (
    <>
        <Head>
        <script src="http://code.jquery.com/jquery-1.9.1.min.js"></script>
        <link href="https://vjs.zencdn.net/7.7.6/video-js.css" rel="stylesheet" />
        <script src="https://vjs.zencdn.net/7.7.6/video.js"></script>

        </Head>
        <video id="video"className={Styles.videoPlayer + " video-js vjs-default-skin"} controls preload="auto"></video>

        <div className={Styles.description}>
            <h1>Top Gun</h1>
            <div className={Styles.overview}>
                <p>As students at the United States Navy's elite fighter weapons school compete to be best in the class, one daring young pilot learns a few things from a civilian instructor that are not taught in the classroom.</p>
            </div>

            <div className={Styles.actors}>
                <h2>Actors</h2>
            </div>
        </div>
        </>
  )
}