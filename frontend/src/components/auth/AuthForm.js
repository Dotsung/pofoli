// @flow
import React from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import oc from 'open-color';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebook, faTwitter, faGoogle } from "@fortawesome/free-brands-svg-icons"

import SignIn from './SignIn';

const GlobalStyle = createGlobalStyle`
    html, body {
        height: 100%;
        margin: 0px;
    }
    #root{
        height: 100%;
    }
    .App{
        height: 100%;
    }
`

const Wrapper = styled.div`
    width: 100%;
    height: 100%;
    display: flex;

    @media (max-width: 900px){
        flex-direction: column;
    }
`

const IntroSection = styled.div`
    width: 45%;
    height: 100%;
    background-color: ${oc.gray[8]}

    @media (max-width: 900px){
        width: 100%;
        height: 30%;
    }
`

const AuthSection = styled.div`
    width: 55%;
    height: 100%;
    display: flex;
    align-items: center;
    @media (max-width: 900px){
        width: 100%;
    }
`

class AuthForm extends React.Component {
    render(){
        return (
            <Wrapper>
                <GlobalStyle />
                <IntroSection />
                <AuthSection>
                    <SignIn />
                </AuthSection>
            </Wrapper>
        )
    }
}

export default AuthForm;