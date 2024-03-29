import React from 'react';
import LoginPage from '../screens/LoginPage'
import { AuthUserContext } from '../components/session';
import CityCardList from '../components/CityCardList'


const HomeScreen = () => {
    return (
        <>
        <AuthUserContext.Consumer>
            {authUser=>
                authUser? <CityCardList authUser={authUser} /> : <LoginPage />
            }
        </AuthUserContext.Consumer>
        
        </>
    );
  }
  
  export default HomeScreen;
