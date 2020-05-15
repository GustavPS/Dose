import Head from 'next/head'
import Layout from '../../../../components/layout'
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router'
import ReactPlayer from 'react-player'
import Styles from '../../../../styles/video.module.css';
import fetch from 'node-fetch'
import vtt from 'vtt-live-edit';

import cookies from 'next-cookies'

// Fetcher for useSWR, redirect to login if not authorized


export default function Home(props) {
  const server = props.server;
  const availableSubtitles = props.subtitles;
  const router = useRouter();
  const { id } = router.query;
  const serverToken = props.serverToken;
  console.log(serverToken);

  let baseVideoUrl = `http://${server.server_ip}:4000/api/video/${id}`;

  let video;

  useEffect(() => {
    // Initiate video.js


    video = videojs("video");
    require('@silvermine/videojs-quality-selector')(videojs);
    video.controlBar.addChild('QualitySelector');

    // Load the video
    video.src([{
      src: `http://${server.server_ip}:4000/api/video/${id}?token=${serverToken}&quality=directplay`,
      type: 'video/webm',
      label: 'directplay',
      selected: true
    },
    {
      src: `http://${server.server_ip}:4000/api/video/${id}?token=${serverToken}&quality=1080p`,
      type: 'video/mp4',
      label: '1080P'
    },
    {
      src: `http://${server.server_ip}:4000/api/video/${id}?token=${serverToken}&quality=720p`,
      type: 'video/mp4',
      label: '720P'
    },
    {
      src: `http://${server.server_ip}:4000/api/video/${id}?token=${serverToken}&quality=480p`,
      type: 'video/mp4',
      label: '480P'
    },
    {
      src: `http://${server.server_ip}:4000/api/video/${id}?token=${serverToken}&quality=240p`,
      type: 'video/mp4',
      label: '240P'
    },
  ]);

    // Set the poster image
    video.poster("https://image.tmdb.org/t/p/original/k20j3PMQSelVQ6M4dQoHuvtvPF5.jpg");

    // Load all the subtitles
    for (let subtitle of availableSubtitles) {
        video.addRemoteTextTrack({
          kind: 'subtitles',
          label: subtitle.language,
          language: subtitle.language,
          src: `http://${server.server_ip}:4000/api/subtitles/get?id=${subtitle.id}`
        }, false);
    }


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

         /* THE CODE BELOW WILL RUN WHEN THE USER SEEKS THE VIDEO */

         // Save the current source (So we know what quality to play after seek)
         let currentQuality = video.currentSource().label;
         console.log(currentQuality);
         // Find the current active subtitle and save it so we know what to show after seek.
         let tracks = video.textTracks();
         let activeSub;
         for (let i = 0; i < tracks.length; i++) {
           if (tracks[i].mode == 'showing') {
             activeSub = tracks[i].label;
           }
         }

         // Hack video.js start time (So we can see the videos playing time / current time)
         video.start= time;
         video.oldCurrentTime(0);
         // Set the new source (with the offset)
         console.log("ÄR VI FRAMME SNART????");
         video.src(
          [
             {
               src: `http://${server.server_ip}:4000/api/video/${id}?start=${time}&token=${serverToken}&quality=directplay`,
               type: 'video/webm',
               label: 'directplay',
               selected: currentQuality === "directplay"
             },
             {
               src: `http://${server.server_ip}:4000/api/video/${id}?start=${time}&token=${serverToken}&quality=1080p`,
               type: 'video/mp4',
               label: '1080P',
               selected: currentQuality === "1080P"
             },
             {
               src: `http://${server.server_ip}:4000/api/video/${id}?start=${time}&token=${serverToken}&quality=720p`,
               type: 'video/mp4',
               label: '720P',
               selected: currentQuality === "720P"
             },
             {
              src: `http://${server.server_ip}:4000/api/video/${id}?start=${time}&token=${serverToken}&quality=480p`,
              type: 'video/mp4',
              label: '480P',
              selected: currentQuality === "480P"
            },
            {
              src: `http://${server.server_ip}:4000/api/video/${id}?start=${time}&token=${serverToken}&quality=240p`,
              type: 'video/mp4',
              label: '240P',
              selected: currentQuality === "240P"
            }
          ]);


          // Add the subtitles again, and set "activeSub" to active.
          for (let subtitle of availableSubtitles) {
            if (subtitle.language === activeSub) {
              video.addRemoteTextTrack({
                kind: 'subtitles',
                label: subtitle.language,
                language: subtitle.language,
                src: `http://${server.server_ip}:4000/api/subtitles/get?id=${subtitle.id}&start=${time}`,
                default: true
              }, false);
            } else {
              video.addRemoteTextTrack({
                kind: 'subtitles',
                label: subtitle.language,
                language: subtitle.language,
                src: `http://${server.server_ip}:4000/api/subtitles/get?id=${subtitle.id}&start=${time}`
              }, false);
            }
            try {
              //video.play();
            } catch (e) {
              console.log("Play canceled, probably a new seek.");
            }
          }

         return this;
     };

       // Get the dureation of the movie
       if (id !== undefined) {
        $.getJSON( `http://${server.server_ip}:4000/api/video/${id}/getDuration`, function( data ) 
        {
            video.theDuration= data.duration;
        });
       }


  });


  return (
    <>
        <Head>
        <link href="https://unpkg.com/@silvermine/videojs-quality-selector/dist/css/quality-selector.css" rel="stylesheet" />
        <script src="http://code.jquery.com/jquery-1.9.1.min.js"></script>
        <link href="https://vjs.zencdn.net/7.7.6/video-js.css" rel="stylesheet" />
        <link href="/chromecast/silvermine-videojs-chromecast.css" rel="stylesheet" />
        <script src="https://vjs.zencdn.net/7.7.6/video.js"></script>
        <script src="https://unpkg.com/@silvermine/videojs-quality-selector/dist/js/silvermine-videojs-quality-selector.min.js"></script>

        <script src="/chromecast/silvermine-videojs-chromecast.min.js"></script>
        <script type="text/javascript" src="https://www.gstatic.com/cv/js/sender/v1/cast_sender.js?loadCastFramework=1"></script>

        </Head>
        <video id="video"className={Styles.videoPlayer + " video-js vjs-default-skin"} controls preload="auto">
        </video>

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

// Get the information about the server and send it to the front end before render (this is server-side)
export async function getServerSideProps(context) {
  let serverId = context.params.server;
  let movieID = context.params.id;

  return await fetch('http://88.129.86.234:3000/api/servers/getServer', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({
          id: serverId
      }),
  })
  .then((r) => r.json())
  .then(async (data) =>{
    console.log(data);
    return await fetch(`http://${data.server.server_ip}:4000/api/subtitles/list?movie=${movieID}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
    })
    .then((r) => r.json())
    .then((subtitles) => {
      console.log(subtitles);
      return {
        props: {
            server: data.server,
            subtitles: subtitles.subtitles,
            serverToken: cookies(context).serverToken || ''
        }
      }
    })

  });
}