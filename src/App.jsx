import React,{Component} from "react";
import { BrowserRouter as Router,Route } from 'react-router-dom';
import * as ROUTES from './constants/routes'
import SignupPage from './screens/SignupPage'
import LoginPage from './screens/LoginPage'
import HomeScreen from './screens/HomeScreen'
import DetailsPage from './screens/DetailsPage'
import NavBar from './components/NavBar'
import { withAuthentication } from './components/session';

class App extends Component {
    render(){
      return(
          <Router>
            <NavBar />
            <Route exact path={ROUTES.HOME} component={HomeScreen} />
            <Route exact path={ROUTES.DETAILS_PAGE} component={DetailsPage} />
            <Route exact path={ROUTES.SIGN_UP} component={SignupPage} />
            <Route exact path={ROUTES.LOGIN} component={LoginPage} />
          </Router>
       
      );
    }
}
export default withAuthentication(App);