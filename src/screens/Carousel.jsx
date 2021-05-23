import React, { Component } from 'react';
// import ReactDOM from 'react-dom';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';

class DemoCarousel extends Component {
    render() {
        return (
            <Carousel centerMode={true} centerSlidePercentage autoPlay>
                <div>
                    <img src="https://firebasestorage.googleapis.com/v0/b/godsend-aef97.appspot.com/o/Images%2F5631?alt=media&token=2e4af7cf-cc6d-46d1-9e9c-d434bd131266" alt="#"/>
                    
                </div>
                <div>
                    <img src="https://firebasestorage.googleapis.com/v0/b/godsend-aef97.appspot.com/o/Images%2F9395?alt=media&token=2c468975-b7df-4e1c-ae93-35f8c53341ad" alt="#" />
                    
                </div>
                <div>
                    <img src="https://firebasestorage.googleapis.com/v0/b/godsend-aef97.appspot.com/o/Images%2F9395?alt=media&token=2c468975-b7df-4e1c-ae93-35f8c53341ad" alt="#"/>
                    
                </div>
            </Carousel>
        );
    }
}

export default DemoCarousel