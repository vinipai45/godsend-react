import React, { Component } from 'react';
import {withFirebase} from "../components/firebase"
import {compose} from 'recompose'
import { Link } from 'react-router-dom';
import {AuthUserContext} from '../components/session'
import LoginPage from '../screens/LoginPage';


class CardList extends Component {

  constructor(props) {
    super(props)
    this.state = {
      posts: []
    }
  }

  componentDidMount = () => {
    this.props.firebase.places().get().then((snapshot) => (
        snapshot.forEach((doc) => (
            this.setState((prevState) => ({
                posts: [...prevState.posts, {
                    placeId: doc.id,
                    place: doc.data().place,
                }]
            }))
        ))
    ))
}
  render() {
    // async function getCityCard() {
    //     let commentitems = await this.props.firebase.db.collection('places').get().map((data,index) => {
    //       return (
    //           <li key={index}>
    //             {console.log(data.data)}
    //             {/* <p class="row">{}</p>
    //             <div class="row pt-2">
    //               <p>
    //                 --{},{" "}
    //                 {new Intl.DateTimeFormat("en-US", {
    //                   year: "numeric",
    //                   month: "short",
    //                   day: "2-digit",
    //                 }).format(new Date(Date.parse()))}
    //               </p>
    //             </div> */}
    //           </li>
    //       );
    //     })
    //   }
    let displayPosts = this.state.posts.map((p) => (
      <div className="col s12 m6 l4 " key={p.placeId}>
      <div className="card hoverable">
        <div className="card-content">
          <span className="card-title">{p.place}</span>
          <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eum, expedita sunt. Quod rerum facere alias quos asperiores illum eius officia velit totam dolorum! Maiores repellendus similique odio ipsam, voluptatibus eum.</p>
        </div>
        <div className="card-action hoverable _moreInCard">
          <Link to={p.place} ><a className="purple-text" href="#">More <i class="material-icons right">forward</i></a></Link>
        </div>
      </div>
    </div>
  ))
      return(
        <>
        <AuthUserContext.Consumer>
            {authUser=>
                authUser
                ? 
                  <div className="row">{displayPosts}</div> 
                : <LoginPage />
            }
        </AuthUserContext.Consumer>
        </>
      )
  }
}

const CityCardList = compose(
  withFirebase,
)(CardList);
 
export default  CityCardList ;

