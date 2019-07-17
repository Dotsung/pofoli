// @flow
import React from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import oc from 'open-color';
import { Link } from 'react-router-dom';
import { Route } from 'react-router-dom';

import SignIn from './SignIn';
import SignUp from './SignUp';

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
    background-size: 100%;
    display: flex;
    align-items: center;
    flex-direction: column;
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

const TitleWrapper = styled.div`
    display: flex;
    width: 100%;
`

const ToHome = styled(Link)`
    z-index: 2;
    color: white;

    &:visited{
        text-decoration: none;
        color: white;
    }
    &:hover{
        text-decoration: none;
        color: ${oc.gray[3]}
    }
    &:link{
        text-decoration: none;
    }
`

const Title = styled.h1`
    z-index: 2;
    font-size: 2rem;
    margin: 0;
    margin-left: 1rem;
    margin-top: 0.5rem;
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

const AuthForm = () => {
    return (
        <Wrapper>
            <GlobalStyle />
            <IntroSection>
                <Mask />
                <TitleWrapper>
                    <ToHome to='/'><Title>Dotia</Title></ToHome>
                </TitleWrapper>
                <Route path='/auth/signin' component={SignIn} />
                <Route path='/auth/signup' component={SignUp} />
            </IntroSection>
        </Wrapper>
    )
}

export default AuthForm;