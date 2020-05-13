import Head from 'next/head'
import Layout from '../../../../components/layout'
import Plyr from 'plyr';
import { useEffect } from 'react';
 
// Fetcher for useSWR, redirect to login if not authorized


export default function Home() {
  let player;

  useEffect(() => {


      // First real dialog starts around 1:47
      /*
	const source = 'http://localhost:4000/api/video/sdf';
	// For more dash options, see https://github.com/Dash-Industry-Forum/dash.js
	const dash = dashjs.MediaPlayer().create();
	const video = document.querySelector('video');
	//dash.getDebug().setLogToBrowserConsole(false);
	dash.initialize(video, source, true);

	// Update caption tracks after initializing Plyr to get the generated captions
	// For more options see: https://github.com/sampotts/plyr/#options
  const player = new Plyr(video, {captions: {active: true, update: true}});
  */

  // Expose player and dash so they can be used from the console
    player = new Plyr('#player');
    player.source = {
      type: 'video',
      title: 'Example title',
      sources: [
        {
          src: 'http://localhost:4000/api/video/abc',
          type: 'video/mp4'
        }
      ]
    };
    console.log(player);
    player.config.duration = 500;

    player.on('ready', event => {
      console.log('Player ready.');
    });
    player.on('seeking', event => {
      console.log(`seek ${event.detail.plyr}`);
    })
    player.on('seeked', event => {
      console.log(`Seek finished ${event.detail.plyr.currentTime}`)
    })
    player.on('progress', event => {
      console.log(`Progress: ${event.detail.plyr.currentTime}`)
    })
  });


  return (
    <>
        <Head>
            <link rel="stylesheet" href="https://cdn.plyr.io/3.6.2/plyr.css" />
            <script src="https://cdn.dashjs.org/latest/dash.all.min.js"></script>
        </Head>
  <video crossOrigin="true" id="player"></video>
        
    </>
  )
}