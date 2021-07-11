import React, { Component } from 'react';
import {withFirebase} from "../components/firebase"
import {compose} from 'recompose'
import { Link } from 'react-router-dom';
import {AuthUserContext} from '../components/session'
import LoginPage from '../screens/LoginPage';

var userdata;

class CardList extends Component {

  

  constructor(props) {
    super(props)
    
    this.state = {
      posts: []
    }
  }

  

  componentDidMount = async() => {

    const snapshot = await this.props.firebase.db.collection('squad_users').get()
    snapshot.forEach(doc=>{
      const data = doc.data();
      if(this.props.authUser.uid == data.user_id) {
          userdata = data;
      } 
        // console.log("doc.data===========",JSON.stringify(doc.data()));
    })

    console.log("final user data=====",JSON.stringify(userdata));
  
    // this.props.firebase.places().get().then((snapshot) => (
    //     snapshot.forEach((doc) => (
    //         this.setState((prevState) => ({
    //             posts: [...prevState.posts, {
    //                 placeId: doc.id,
    //                 place: doc.data().place,
    //             }]
    //         }))
    //     ))
    // ))


    this.props.firebase.places().onSnapshot(
      (querySnapshot) => {
          //incidentList.innerHTML="";
          querySnapshot.docChanges().forEach(
              (change) => {
                  console.log("the change loop");
                  if (change.type === "added") {
                      // use jsx to print the div of the cards data from 
                     //change.doc.data().address
                    //gives the place string where accident has taken place 
                    this.setState((prevState) => ({
                      posts: [...prevState.posts, {
                          placeId: change.doc.id,
                          place: change.doc.data().place,
                      }]
                  }))
                  }
              }
          );
      }
  );







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
    let FetchData = ()=>{
      fetch('http://localhost:5000/notify',{
          method:'post',
          body:JSON.stringify({
              place:"PLACE HERE",
              threat:"THREAT HERE",
              imageUrl:"IMAGE ALT"
          }),
          headers: {
              'Content-Type': 'application/json'
          }
      }).catch(err=>console.log(err))
    }

    let displayPosts = this.state.posts.map((p) => (
      <div className="col s12 m6 l4 " key={p.placeId}>
      <div className="card hoverable">
        <div className="card-content">
          <span className="card-title">{p.place}</span>
          {/* <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eum, expedita sunt. Quod rerum facere alias quos asperiores illum eius officia velit totam dolorum! Maiores repellendus similique odio ipsam, voluptatibus eum.</p> */}
        </div>
        <Link to={p.place+"/"+userdata.category} >
          <div className="card-action hoverable _moreInCard">
            <p className="purple-text">More <i class="material-icons right">forward</i></p>
          </div>
        </Link>
      </div>
    </div>
  ))
      return(
        <>
        <AuthUserContext.Consumer>
            {authUser=>
                authUser
                ? <>
                    {!userdata ? <></> : <center><h5>{userdata.category + " squad"}</h5></center>  }
                    <div className="row">
                    {displayPosts}
                    <button onClick={()=>FetchData()}>Notify demo</button>
                    </div> 
                  </>
                  
                : <LoginPage  />
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

