// @flow
import React from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import oc from 'open-color';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebook, faTwitter, faGoogle } from "@fortawesome/free-brands-svg-icons"

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

const SocialButtons = styled.div`
    margin: auto;
    margin: 1rem 2rem;
`

const FaceBookButton = styled.div`
    display: flex;
    background-color: ${oc.blue[7]};
    color: white;
    height: 2.5rem;
    line-height: 2.4rem;
    &:hover{
        background-color: ${oc.blue[8]};
    }
`

const TwitterButton = styled.div`
    display: flex;
    background-color: ${oc.indigo[5]};
    color: white;
    margin-top: 0.5rem;
    height: 2.5rem;
    line-height: 2.4rem;
    &:hover{
        background-color: ${oc.indigo[7]};
    }
`

const GoogleButton = styled.div`
    display: flex;
    background-color: ${oc.red[7]};
    color: white;
    margin-top: 0.5rem;
    height: 2.5rem;
    line-height: 2.4rem;
    &:hover{
        background-color: ${oc.red[8]};
    }
`

const Icon = styled(FontAwesomeIcon)`
    margin-left: 1rem;
    font-size: 2rem;
    padding-top: 0.25rem;
`

const H3 = styled.h3`
    margin: 0;
    margin-left: 1rem;
    font-size: 1.5rem;
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
                            <H1>LogIn</H1>
                            <SignInForm>
                                <StyledInput name="email" placeholder="Email"/>
                                <StyledInput name="password" placeholder="Password"/>
                                <StyledButton>로그인</StyledButton>
                                <ToSignUp>회원이 아니신가요?가입하기</ToSignUp>
                            </SignInForm>
                            <SocialButtons>
                                <FaceBookButton>
                                    <Icon icon={faFacebook} />
                                    <H3>FaceBook 로그인</H3>
                                </FaceBookButton>
                                <TwitterButton>
                                    <Icon icon={faTwitter} />
                                    <H3>Twitter 로그인</H3>
                                </TwitterButton>
                                <GoogleButton>
                                    <Icon icon={faGoogle} />
                                    <H3>Google 로그인</H3>
                                </GoogleButton>
                            </SocialButtons>
                        </FormWrapper>
                    </SignInCard>
                </AuthSection>
            </Wrapper>
        )
    }
}

export default AuthForm;