import React, { Component } from 'react';
import {compose} from 'recompose'
import {withFirebase} from '../components/firebase'
import {AuthUserContext} from '../components/session'
import LoginPage from '../screens/LoginPage'
import '../assets/imageCard.css'


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
                            <img className="_img" src={p.image_link} alt="Not Found" />
                        </div>
                        <div class="card-stacked">
                            <div class="card-content">
                                <ul className="_listStyle">
                                    <li><b>Address</b> : {p.address}</li>
                                    <li><b>Posted By</b>: {p.citizen_name}</li>
                                    <li><b>Email </b>: {p.citizen_email}</li>
                                    <li><b>Squads Required </b>: {p.squads}</li>
                                    <li><b>Threat </b>: {p.threat}</li>
                                    <li><b>Time</b>: {new Date(p.timeStamp).toString()}</li>
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