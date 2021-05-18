import React, { Component } from 'react';
import {compose} from 'recompose'
import {withFirebase} from '../components/firebase'
import {AuthUserContext} from '../components/session'
import LoginPage from '../screens/LoginPage'
import '../assets/imageCard.css'

import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';


class DetailsPageBase extends Component{
    constructor(props) {
        super(props)
        this.state = {
          placename : '',
          posts:[]
        }
    }
    componentDidMount = ()=>{
        const { placename } = this.props.match.params
        this.setState(() => ({ placename }))

        console.log("placename === "+placename);
        
        let placeRef = this.props.firebase.db.collection(placename);
        placeRef.get().then((snapshot)=>(
            snapshot.forEach((doc) => (
                this.setState((prevState) => ({
                    posts: [...prevState.posts, {
                        postId:doc.id,
                        address: doc.data().address,
                        citizen_email: doc.data().citizen_email,
                        citizen_name:doc.data().citizen_name,
                        image_link:doc.data().image_link,
                        squads:doc.data().squads,
                        threat:doc.data().threat,
                        timeStamp:doc.data().timeStamp
                    }]
                }))
            ))
        ))

        
    }

    render(){




        let displayPosts = this.state.posts.map((p) => (
            <div key={p.postId}>
                <div class="col s12">
                    <div class="card horizontal">
                        <div class="card-image">
                        <Carousel
                            autoPlay={true}  
                            infiniteLoop={true} 
                            interval={2000}
                            centerMode={true} 
                            centerSlidePercentage={100} 
                            showThumbs={false} 
                            showIndicators={false} 
                        >
                            { 
                                p.image_link.map((element)=>(
                                    <img className="_img" src={element} /> 
                                ))
                            }
                            
                        </Carousel>
                        </div>
                        <div class="card-stacked">
                            <div class="card-content">
                                <ul className="_listStyle">
                                    <li>Address : {p.address}</li>
                                    <li>Posted By: {p.citizen_name}</li>
                                    <li>Email : {p.citizen_email}</li>
                                    <li>Squads Required : {p.squads}</li>
                                    <li>Threat : {p.threat}</li>
                                    <li>Time: {new Date(p.timeStamp).toString()}</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        ))
        return (
            <>
            <AuthUserContext.Consumer>
                {authUser=>
                    authUser
                    ? 
                      <div className="row">
                        {displayPosts}
                      </div>
                    : <LoginPage />
                }
            </AuthUserContext.Consumer>
            </>
        );
    }


}

const DetailsPage = compose(
withFirebase,
)(DetailsPageBase);
  
export default DetailsPage;