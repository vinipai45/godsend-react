import React from 'react';
import '../../assets/imageCard.css'
import img from '../../assets/images/car-1.jpeg'

const ImageCard =()=>{
  return(
    
    <div className="col s12">
    <h2 className="header">Horizontal Card</h2>
    <div className="card horizontal">
      <div className="card-image">
        <img src="https://picsum.photos/200/300" />
      </div>
      <div className="card-stacked">
        <div className="card-content">
          <p>I am a very simple card. I am good at containing small bits of information.</p>
        </div>
        <div className="card-action">
          <a href="#">This is a link</a>
        </div>
      </div>
    </div>
  </div>
  
  );
}

export default ImageCard;