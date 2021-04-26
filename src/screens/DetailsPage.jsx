import React, { Component } from 'react';
import AccidentCardList from '../components/AccidentCardList'
import {AuthUserContext} from '../components/session'
import LoginPage from '../screens/LoginPage'


const DetailsPage = () => {
    return (
        <>
        <AuthUserContext.Consumer>
            {authUser=>
                authUser? <AccidentCardList /> : <LoginPage />
            }
        </AuthUserContext.Consumer>
        </>
    );
  }
  
  export default DetailsPage;