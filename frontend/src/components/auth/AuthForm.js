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
    width: 45%;
    height: 100%;
    background-color: ${oc.violet[1]}

    @media (max-width: 800px){
        width: 100%;
        height: 30%;
    }
`

const AuthSection = styled.div`
    width: 55%;
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
    padding: 3rem;
    padding-top: 3rem;
`

const SignInForm = styled.form`
    display: flex;
    flex-direction: column;
`

const StyledInput = styled.input`
    margin-top: 0.5rem;
    border: none;
    height: 2.5rem;
    background-color: ${oc.indigo[1]}
    &::placeholder {
        padding-left: 0.5rem;
        font-size: 1rem;
    }
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
    height: 2.5rem;
    background-color: ${oc.indigo[5]}
    color: white;
    border-radius: 3px;
    font-size: 1.5rem;
`

const Spacer = styled.div`
    flex: 1;
`

const ToSignUp = styled(Link)`
    margin-top: 0.5rem;
    color: ${oc.violet[4]}

    &:visited{
        color: ${oc.violet[4]}
    }

    &:hover{
        color: ${oc.violet[6]}
    }
`

const Separator = styled.div`
    height: 1px;
    width: 100%;
    background: #ced4da;
    margin-top: 1.5rem;
    margin-bottom: 1.5rem;
    position: relative;
`

const Or = styled.div`
    position: absolute;
    left: 50%;
    -webkit-transform: translate(-50%,-50%);
    -ms-transform: translate(-50%,-50%);
    transform: translate(-50%,-50%);
    background: #fff;
    padding-left: .5rem;
    padding-right: .5rem;
    font-size: .85em;
    font-weight: 600;
    color: #212529;
`

const SocialButtons = styled.div`
    margin: auto 0;
`

const FaceBookButton = styled.div`
    display: flex;
    background-color: ${oc.blue[7]};
    color: white;
    height: 2.5rem;
    line-height: 2.4rem;
    border-radius: 3px;
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
    border-radius: 3px;
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
    border-radius: 3px;
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
                            </SignInForm>
                            <ToSignUp>회원이 아니신가요?가입하기</ToSignUp>
                            <Separator><Or>or</Or></Separator>
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