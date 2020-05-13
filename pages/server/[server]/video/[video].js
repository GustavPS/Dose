import Head from 'next/head'
import Layout from '../../../../components/layout'
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router'
import ReactPlayer from 'react-player'
 
import Plyr from 'plyr';

// Fetcher for useSWR, redirect to login if not authorized


export default function Home() {
  /*
  const router = useRouter();
  const { video } = router.query;
  */
  let baseVideoUrl = 'http://localhost:4000/api/video/sdf';
  const [currentVideoUrl, setcurrentVideoUrl] = useState(baseVideoUrl)

  const onSeek = () => {
    let seconds = document.getElementById('seekInput').value;
    player.src({
      "type": "video/webm",
      "src": `${baseVideoUrl}?time=${seconds}`
    });
    //player.src(`${baseVideoUrl}?time=${seconds}`);
  }

  let video;

  useEffect(() => {
    video = videojs("video");
    video.src({
      src: 'http://localhost:4000/api/video/sdf',
      type: 'video/webm'
    });


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
           src: "http://localhost:4000/api/video/sdf?start=" + time,
           type: 'video/webm'
          });
         video.play();
         return this;
     };

     // Get the dureation of the movie
     $.getJSON( "http://localhost:4000/api/video/sdf/getDuration", function( data ) 
     {
         video.theDuration= data.duration;
     });


  });


  return (
    <>
        <Head>
        <script src="http://code.jquery.com/jquery-1.9.1.min.js"></script>
        <link href="https://vjs.zencdn.net/7.7.6/video-js.css" rel="stylesheet" />
        <script src="https://vjs.zencdn.net/7.7.6/video.js"></script>

        </Head>
        <video id="video" className="video-js vjs-default-skin" controls preload="auto" width="640" height="264">
        </video>

        </>
  )
}