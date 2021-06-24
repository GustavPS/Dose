import Styles from './changeImages.module.css';
import {Container, Row, Col, Button, Image } from 'react-bootstrap';
import { useState } from 'react';
import { useRouter } from 'next/router'
import validateServerAccess from '../lib/validateServerAccess';


let selectedImages = [];


export default function ChangeImages(props) {
    const [imageBox, setImageBox] = useState(false);
    const [movieBackdropResult, setMovieBackdropResult] = useState([]);
    const [moviePosterResult, setMoviePosterResult] = useState([]);
    const {server, id, serverToken, type} = props;
    const Router = useRouter();




    const updateImages = () => {
        let poster;
        let backdrop;
        console.log(selectedImages);
        for (let image of selectedImages) {
          if (image.type === 'POSTER') {
            poster = image.id;
          } else if (image.type === 'BACKDROP') {
            backdrop = image.id;
          }
        }
        console.log(selectedImages);
        console.log(poster);
        console.log(backdrop);
  
        validateServerAccess(server, (serverToken) => {
          fetch(`${server.server_ip}/api/${type}/${id}/setImages?poster=${poster}&backdrop=${backdrop}&token=${serverToken}`)
          .then(r => r.json())
          .then(json => {
            if (json.success) {
              Router.reload(window.location.pathname);
            }
          });
        });
      }
  
      const selectImage = (imageID, type) => {
        let selected = [];
  
        // Add the other type that we did not select to the new selected list
        for (let image of selectedImages) {
          if (image.type !== type) {
            selected.push(image);
          } else {
            // Remove the active class
            document.body.querySelector(`img[data-imageid="${image.id}"]`).classList.remove(Styles.activeImage);
          }
        }
  
        document.body.querySelector(`img[data-imageid="${imageID}"]`).classList.add(Styles.activeImage);
  
        selected.push({
          id: imageID,
          type: type
        })
        selectedImages = [];
        for (let image of selected) {
          selectedImages.push(image);
        }
      }

    const getImages = () => {
      validateServerAccess(server, (serverToken) => {
        fetch(`${server.server_ip}/api/${type}/${id}/getImages?token=${serverToken}`)
        .then(r => r.json())
        .then(images => {
          let backdropElements = [];
          let posterElements = [];
          let count = 0;
          selectedImages = [];
          for (let image of images) {
            let img = `https://image.tmdb.org/t/p/w500/${image.path}`
            if (image.active) {
              selectedImages.push({
                id: image.id,
                type: image.type
              });
            }
            let active = image.active;
            if (image.type === 'BACKDROP') {
              backdropElements.push(
                <Col key={count} className={Styles.metadataSearchRow}>
                  <Image style={{width: "500px"}} src={img} className={'imageSearchImg', active ? Styles.activeImage : ''} onClick={() => selectImage(image.id, image.type)} data-imageid={image.id}/>
                </Col>
              );
            } else {
              posterElements.push(
                <Col key={count} className={Styles.metadataSearchRow}>
                  <Image style={{width: "200px"}} src={img} className={'imageSearchImg', active ? Styles.activeImage : ''} onClick={() => selectImage(image.id, image.type)} data-imageid={image.id}/>
                </Col>
              );
            }
            count++;
          }
          setMoviePosterResult(posterElements);
          setMovieBackdropResult(backdropElements);
          setImageBox(true);
        });
      });
    }

    return (
        <>
            <div style={{marginLeft: "27px"}}>
                <div style={{backgroundImage: `url('${process.env.NEXT_PUBLIC_SERVER_URL}/images/search.svg')`}} className={Styles.playButton} onClick={() => getImages()}></div>
                <p style={{marginTop: "5px", fontSize: '14px'}}>Välj bild</p>
            </div>

            {imageBox &&
            <div className="metadataBox">

                <Container>
                    <Button style={{display: 'table', margin: '0 auto'}} variant="primary" type="submit" onClick={() => updateImages()}>
                        Spara
                    </Button>
                <h3>Backdrops</h3>
                <Row>
                    {movieBackdropResult}
                </Row>
                <h3>Posters</h3>
                <Row>
                    {moviePosterResult}
                </Row>
                </Container>
                
            </div>
            }
        </>
    )
}