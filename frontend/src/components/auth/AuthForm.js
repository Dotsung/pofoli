// @flow
import React from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import oc from 'open-color';
import { Link } from 'react-router-dom';
import { Route } from 'react-router-dom';

import SignIn from './SignIn';

import Img1 from 'testimg/img9.gif';

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
    position: relative;
    width: 100%;
    height: 100%;
    background-image: url(${Img1});
    background-repeat: no-repeat;
    background-size: 1920px 1080px;
    display: flex;
    align-items: center;
`

const Mask = styled.div`
    position: absolute;
    top:0;
    left:0;
    width: 100%;
    height: 100%;
    background-color: black;
    opacity: 0.5;
`

const AuthSection = styled.div`
    width: 50%;
    height: 100%;
    background-color: ${oc.indigo[5]};
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
                <IntroSection>
                    <Mask />
                    <Route path='/auth/signin' component={SignIn} />
                </IntroSection>
            </Wrapper>
        )
    }
}

export default AuthForm;