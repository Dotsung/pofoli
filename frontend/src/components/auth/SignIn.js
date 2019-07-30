// @flow
import React, {useState} from 'react';
import styled from 'styled-components';
import { inject } from 'mobx-react';
import { observer } from 'mobx-react-lite';
import oc from 'open-color';

import { Link, Redirect } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebook, faTwitter, faGoogle } from "@fortawesome/free-brands-svg-icons"

import { styled as materialStyled } from '@material-ui/styles';
import TextField from '@material-ui/core/TextField';

import * as authApi from 'lib/api/auth';

const SignInCard = styled.div`
    background-color: white;
    margin: auto;
    transform: translateY(-30%);
    width: 500px;
    z-index: 2;
    @media (max-width: 550px){
        width: 100%;
        height: 100%;
        margin: auto;
        transform: none;
    }
`

const ErrMsg = styled.p`
    color: ${oc.red[6]};
    text-align: left;
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
    background-color: ${oc.gray[2]};
    border-radius: 3px;
    font-size: 1rem;
    &::placeholder {
        padding-left: 0.5rem;
        font-size: 1rem;
    }
`

const H1 = styled.h1`
    margin: 0;
    margin-bottom: 1rem;
    font-size: 2.5rem;
`

const ButtonWrapper = styled.div`
    margin-top: 0.5rem;
    display: flex;
`

const SubmitButton = styled.button`
    margin-top: 2rem;
    border: none;
    height: 2.5rem;
    background-color: ${oc.indigo[6]};
    &:hover{
        background-color: ${oc.indigo[8]};
    }
    color: white;
    font-size: 1.5rem;
    cursor: pointer;
`

const Spacer = styled.div`
    flex: 1;
`

const ToSignUp = styled(Link)`
    margin-top: 1.5rem;
    font-size: 1rem;
    color: ${oc.gray[6]};

    &:visited{
        color: ${oc.gray[6]};
    }

    &:hover{
        color: ${oc.gray[7]};
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

const SignIn = ({Login, RefreshPostList}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [redirect, setRedirect] = useState(false);

    const [errMsg, setErrMsg] = useState('');
    const [emailErr, setEmailErr] = useState(false);
    const [passwordErr, setPasswordErr] = useState(false);

    const onChangeEmail = e => {
        setEmail(e.target.value);
        setEmailErr(false);
    }

    const onChangePassword = e => {
        setPassword(e.target.value);
        setPasswordErr(false);
    }

    const onSubmit = e => {
        e.preventDefault();

        if(email === '') {
            setErrMsg('이메일을 입력해 주세요.');
            setEmailErr(true);
            return;
        } else if (password === '') {
            setErrMsg('비밀번호를 입력해 주세요.');
            setPasswordErr(true);
            return;
        }

        authApi.localLogin({email, password})
        .then((result) => {
            console.log(result);
            console.log('성공');
            localStorage.setItem('dotia-token', result.data.token);
            Login();
            RefreshPostList();
            setRedirect(true);
        })
        .catch((result) => {
            console.log(result);
            console.log('실패');
            setErrMsg('이메일과 비밀번호가 등록된 정보와 일치하지 않습니다.')
        });
    }
    
    if(redirect){
        return <Redirect to='/'/>; 
    }

    return(
        <SignInCard>
            <FormWrapper>
                <H1>로그인</H1>
                <SignInForm onSubmit={onSubmit}>
                    <ErrMsg>{errMsg}</ErrMsg>
                    <TextField
                        error={emailErr}
                        label="Email"
                        value={email}
                        onChange={onChangeEmail}
                    />
                    <TextField
                        error={passwordErr}
                        label="Password"
                        type="password"
                        value={password}
                        onChange={onChangePassword}
                        margin="normal"
                    />
                    <SubmitButton>로그인</SubmitButton>
                </SignInForm>
                <ToSignUp to='/auth/signup'>회원이 아니신가요?가입하기</ToSignUp>
            </FormWrapper>
        </SignInCard>
    )
    
}

export default inject(({ userStore, postListStore }) => ({
    Login: userStore.Login,
    RefreshPostList: postListStore.Login
}))(observer(SignIn));