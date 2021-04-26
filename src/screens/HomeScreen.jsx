import React, { Component } from 'react';
import LoginPage from '../screens/LoginPage'
import { AuthUserContext } from '../components/session';
import CityCardList from '../components/CityCardList'


const HomeScreen = () => {
    return (
        <>
        <AuthUserContext.Consumer>
            {authUser=>
                authUser? <CityCardList /> : <LoginPage />
            }
        </AuthUserContext.Consumer>
        
        </>
    );
  }
  
  export default HomeScreen;
