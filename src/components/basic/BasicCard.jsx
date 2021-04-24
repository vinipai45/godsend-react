import React from 'react';
import { Link, useHistory } from 'react-router-dom'
import '../../assets/basicCard.css';

const BasicCard =()=>{
  return(
    
    <div className="col s12 m6 l4 ">
      <div className="card hoverable">
        <div className="card-content">
          <span className="card-title">Karkala</span>
          <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eum, expedita sunt. Quod rerum facere alias quos asperiores illum eius officia velit totam dolorum! Maiores repellendus similique odio ipsam, voluptatibus eum.</p>
        </div>
        <div className="card-action hoverable _moreInCard">
          <Link to="/accidents"><a className="purple-text" href="#">More <i class="material-icons right">forward</i></a></Link>
        </div>
      </div>
    </div>
  
  );
}

export default BasicCard;