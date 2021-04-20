import React from 'react';
import '../../assets/imageCard.css'
import img from '../../assets/images/car-1.jpeg'

const ImageCard =()=>{
  return(
    
    <div class="col s12 m3">
      <div class="card">
        <div class="card-image">
          <img className="_img" src={img} />
          <span class="card-title">Near Bus Stand</span>
        </div>
        <div class="card-content">
          <p>I am a very simple card. I am good at containing small bits of information.
          I am convenient because I require little markup to use effectively.</p>
        </div>
        <div class="card-action">
          <a href="#">This is a link</a>
        </div>
      </div>
    </div>
  
  );
}

export default ImageCard;