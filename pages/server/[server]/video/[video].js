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
    video.src('http://localhost:4000/api/video/sdf');

     // hack duration
     video.duration= function() {return video.theDuration; };
     video.start= 0;
     video.oldCurrentTime= video.currentTime;
     video.currentTime= function(time) 
     { 
         if( time == undefined )
         {
             return video.oldCurrentTime + video.start;
         }
         video.start= time;
         video.oldCurrentTime = 0;
         video.src("http://localhost:4000/api/video/sdf?start=" + time);
         video.play();
         return this;
     };
     $.getJSON( "http://localhost:4000/api/video/sdf/getDuration", function( data ) 
     {
         video.theDuration= data.duration;
     });


  });


  return (
    <>
        <Head>
        <script src="http://code.jquery.com/jquery-1.9.1.min.js"></script>
        <link href="//vjs.zencdn.net/4.5/video-js.css" rel="stylesheet" />
    <script src="//vjs.zencdn.net/4.5/video.js"></script>

        </Head>
        <video id="video" className="video-js vjs-default-skin" controls preload="auto" width="640" height="264">
        </video>

        </>
  )
}