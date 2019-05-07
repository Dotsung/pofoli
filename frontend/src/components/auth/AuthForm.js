// @flow
import React from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import oc from 'open-color';
import { Link } from 'react-router-dom';

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
`

const IntroSection = styled.div`
    width: 50%;
    background-color: ${oc.violet[1]}
`

const AuthSection = styled.div`
    width: 50%;
`

const SignInCard = styled.div`
    background-color: white;
    height: 50%;
    margin: 5rem;
`

const SignInForm = styled.form`
    padding: 3rem;
    display: flex;
    flex-direction: column;
`

const StyledInput = styled.input`
    margin-top: 0.5rem;
`

const StyledButton = styled.button`
`

class AuthForm extends React.Component {
    render(){
        return (
            <Wrapper>
                <GlobalStyle />
                <IntroSection />
                <AuthSection>
                    <SignInCard>
                        <SignInForm>
                            <StyledInput name="email" placeholder="Email"/>
                            <StyledInput name="password" placeholder="Password"/>
                            <StyledButton>LogIn</StyledButton>
                        </SignInForm>
                    </SignInCard>
                </AuthSection>
            </Wrapper>
        )
    }
}

export default AuthForm;