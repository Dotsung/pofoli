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

    @media (max-width: 800px){
        flex-direction: column;
    }
`

const IntroSection = styled.div`
    width: 50%;
    height: 100%;
    background-color: ${oc.violet[1]}

    @media (max-width: 800px){
        width: 100%;
        height: 30%;
    }
`

const AuthSection = styled.div`
    width: 50%;
    height: 100%;
    @media (max-width: 800px){
        width: 100%;
    }
`

const SignInCard = styled.div`
    background-color: white;
    margin: auto;
    width: 500px;
`

const FormWrapper = styled.div`
    display: flex;
    flex-direction: column;
    text-align: center;
    padding-top: 3rem;
`

const SignInForm = styled.form`
    padding: 1rem;
    display: flex;
    flex-direction: column;
`

const StyledInput = styled.input`
    margin-top: 0.5rem;
    border: none;
    height: 2rem;
    background-color: ${oc.indigo[1]}
`

const H1 = styled.h1`
    margin: 0;

`

const ButtonWrapper = styled.div`
    margin-top: 0.5rem;
    display: flex;
`

const StyledButton = styled.button`
    margin-top: 1rem;
    border: none;
    height: 2rem;
    background-color: ${oc.indigo[5]}
    color: white;
`

const Spacer = styled.div`
    flex: 1;
`

const ToSignUp = styled(Link)`
    color: ${oc.violet[4]}

    &:visited{
        color: ${oc.violet[4]}
    }

    &:hover{
        color: ${oc.violet[6]}
    }
`

class AuthForm extends React.Component {
    render(){
        return (
            <Wrapper>
                <GlobalStyle />
                <IntroSection />
                <AuthSection>
                    <SignInCard>
                        <FormWrapper>
                            <H1>Log In</H1>
                            <SignInForm>
                                <StyledInput name="email" placeholder="Email"/>
                                <StyledInput name="password" placeholder="Password"/>
                                <StyledButton>로그인</StyledButton>
                                <ToSignUp>회원이 아니신가요?가입하기</ToSignUp>
                            </SignInForm>
                        </FormWrapper>
                    </SignInCard>
                </AuthSection>
            </Wrapper>
        )
    }
}

export default AuthForm;