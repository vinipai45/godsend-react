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
          category:'',
          posts:[]
        }
    }
    componentDidMount = ()=>{
        const { placename,category } = this.props.match.params
        this.setState(() => ({ placename,category }))

        console.log("category==="+category);
        console.log("placename === "+placename);
        
        let placeRef = this.props.firebase.db.collection(placename);



        // placeRef.get()
        
        
        // .then((snapshot)=>(
        //     snapshot.forEach((doc) => {
        //         if(doc.data().squads.includes(category)){
        //             this.setState((prevState) => ({
        //                 posts: [...prevState.posts, {
        //                     postId:doc.id,
        //                     address: doc.data().address,
        //                     citizen_email: doc.data().citizen_email,
        //                     citizen_name:doc.data().citizen_name,
        //                     image_link:doc.data().image_link,
        //                     squads:doc.data().squads ,
        //                     threat:doc.data().threat,
        //                     timeStamp:doc.data().timeStamp
        //                 }]
        //             }))
        //         }
        //     })
        // ))

        placeRef.orderBy("timeStamp", "desc").onSnapshot(
            (querySnapshot) => {
                //incidentList.innerHTML="";
                querySnapshot.docChanges().forEach(
                    (change) => {
                        console.log("the change loop");
                        if (change.type === "added") {
                            // use jsx to print the div of the cards data from 
                           //change.doc.data().address
                          //gives the place string where accident has taken place 
                          if(change.doc.data().squads.includes(category)){
                            this.setState((prevState) => ({
                                posts: [...prevState.posts, {
                                    postId:change.doc.id,
                                    address: change.doc.data().address,
                                    citizen_email: change.doc.data().citizen_email,
                                    citizen_name:change.doc.data().citizen_name,
                                    image_link:change.doc.data().image_link,
                                    squads:change.doc.data().squads ,
                                    threat:change.doc.data().threat,
                                    timeStamp:change.doc.data().timeStamp
                                }]
                            }))
                          }                    
                        }
                        if(change.type === "modified"){
                            var localPosts = []
                            for (let index = 0; index < this.state.posts.length; index++) {
                                if(this.state.posts[index].postId == change.doc.id){
                                    localPosts.push({
                                        postId:change.doc.id,
                                        address: change.doc.data().address,
                                        citizen_email: change.doc.data().citizen_email,
                                        citizen_name:change.doc.data().citizen_name,
                                        image_link:change.doc.data().image_link,
                                        squads:change.doc.data().squads ,
                                        threat:change.doc.data().threat,
                                        timeStamp:change.doc.data().timeStamp
                                    });
                                }else{
                                    localPosts.push(this.state.posts[index])
                                }
                                
                            }
                            this.setState(() => ({
                            posts: localPosts
                        }))
                        }
                    }
                );
            }
        );



    }

    render(){

        let displayPosts = this.state.posts.map((p) => (
            
            <div key={p.postId}>
							 <div class="col s12 m6 l3">
								<div class="card">
									<div class="">
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
                                    <img className="_img" src={element} alt="/"/> 
                                ))
                            }
                            
                        </Carousel>
									
									</div>
									<div class="card-content" style={{"margin-top":"-50%"}}>
									<ul className="_listStyle">
											<li><b>Address</b> : {p.address}</li>
											<li><b>Posted By</b>: {p.citizen_name}</li>
											<li><b>Email </b>: {p.citizen_email}</li>
											<li><b>Threat </b>: {p.threat}</li>
											<li><b>Time</b>: {new Date(p.timeStamp).toString()}</li>
										</ul>
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
                    ? <>
                    {<center><h5>{this.state.category.toUpperCase() + " squad".toUpperCase()}</h5></center>}
                    <div className="row">
                        {displayPosts}
                      </div>
                    </>
                      
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