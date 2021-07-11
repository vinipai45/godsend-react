import React, { Component } from 'react';
import {compose} from 'recompose'
import {withFirebase} from '../components/firebase'
import {AuthUserContext} from '../components/session'
import { Carousel } from 'react-responsive-carousel';
import ImageGallery from 'react-image-gallery';

import LoginPage from '../screens/LoginPage'

const images = [
  {
    original: 'https://picsum.photos/id/1018/1000/600/',
    thumbnail: 'https://picsum.photos/id/1018/250/150/',
  },
  {
    original: 'https://picsum.photos/id/1015/1000/600/',
    thumbnail: 'https://picsum.photos/id/1015/250/150/',
  },
  {
    original: 'https://picsum.photos/id/1019/1000/600/',
    thumbnail: 'https://picsum.photos/id/1019/250/150/',
  },
];

class ImagePreviewBase extends Component {

  constructor(props) {
    super(props)
    this.state = {
      docId : '',
      placename : '',
      category:'',
      doc:null
    }
}
  
  componentDidMount() {
    const { placename,category,docId } = this.props.match.params
    this.setState(() => ({ placename,category,docId }))

    console.log("category==="+category);
    console.log("placename === "+placename);
    console.log("docId === "+docId);
    
    let placeRef = this.props.firebase.db.collection(placename);

    placeRef.doc(docId).get().then(snapshot=> {
      this.setState({
        doc: snapshot.data()
      })
        console.log(this.state.doc);
    }).catch(err=> {
      console.log('Error getting documents', err);
    })
  }

  render() { 
    console.log("Image Preview Component mounted")

    return ( <>
      <AuthUserContext.Consumer>
          {authUser=>
              authUser
              ? <>
              {/* {<center><h5>{this.state.category.toUpperCase() + " squad".toUpperCase()}</h5></center>} */}
              <div className="row">
                  {this.state.doc!=null ? <div>
                    <ImageGallery items={
                        this.state.doc.image_link.map((element)=>(
                          {original: element,thumbnail: element}
                        ) )
                      } />
                    {/* <Carousel
                    // autoPlay={true}  
                    infiniteLoop={true} 
                    interval={2000}
                    centerMode={true} 
                    centerSlidePercentage={100} 
                    showThumbs={false} 
                    showIndicators={false}
                    >
                      {
                        this.state.doc.image_link.map((element)=>(
                          <img style={{height: "100%"}} src={element} alt="/"/>
                        ) )
                      }
                    
                  </Carousel> */}
                  </div>: <></>}
                </div>
              </>
                
              : <LoginPage />
          }
      </AuthUserContext.Consumer>
      </> );
  }
}

const ImagePreview = compose(
  withFirebase,
  )(ImagePreviewBase);
 
export default ImagePreview;