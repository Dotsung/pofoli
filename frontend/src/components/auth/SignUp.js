// @flow
import React, {useState, useReducer} from 'react';
import styled from 'styled-components';
import oc from 'open-color';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faTwitter, faGoogle } from "@fortawesome/free-brands-svg-icons";
import * as authApi from 'lib/api/auth';
import { Redirect } from 'react-router';

import './Spinner.css';

import TextField from '@material-ui/core/TextField';

const SignUpCard = styled.div`
    background-color: white;
    margin: auto;
    transform: translateY(-20%);
    width: 500px;
    z-index: 2;
    @media (max-width: 650px){
        width: 100%;
        height: 100%;
        margin: auto;
        transform: none;
    }
`

const LodingSection = styled.div`
  display: ${props => (props.loading ? `bolck` : `none`)};
`;

const FormWrapper = styled.div`
    display: flex;
    flex-direction: column;
    text-align: center;
    padding: 3rem;
    @media (max-width: 550px){
        padding: 2rem;
    }
`

const SignUpForm = styled.form`
    display: flex;
    flex-direction: column;
`

const ErrMsg = styled.p`
    color: ${oc.red[6]};
    text-align: left;
`

const StyledInput = styled.input`
    margin-top: 0.5rem;
    border: none;
    height: 2.5rem;
    width: 100%;
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

const SubmitButton = styled.button`
    border: none;
    margin-top: 3rem;
    height: 2.5rem;
    background-color: ${oc.indigo[6]};
    color: white;
    font-size: 1.5rem;
    cursor: pointer;
    &:hover{
        background-color: ${oc.indigo[8]};
    }
    ${props=>props.loading?`display:none`:``};
`

const Spacer = styled.div`
    flex: 1;
`

const ToSignIn = styled(Link)`
    margin-top: 1.5rem;
    font-size: 1rem;
    color: ${oc.gray[6]};

    &:visited{
        color: ${oc.gray[6]}
    }

    &:hover{
        color: ${oc.gray[7]}
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

function reducer(state, action){
    return {
        ...state,
        [action.name]: action.value
    };
}

const SignUp = () => {
    const [redirect, setRedirect] = useState(false);
    const [errMsg, setErrMsg] = useState('');
    const [loading, setLoading] = useState(false);

    const [emailErr, setEmailErr] = useState(false);
    const [usernameErr, setUsernameErr] = useState(false);
    const [passwordErr, setPasswordErr] = useState(false);
    const [confirmPasswordErr, setConfirmPasswordErr] = useState(false);

    const [state, dispatch] = useReducer(reducer, {
        email: '',
        username: '',
        password: '',
        confirmPassword: ''
    });
    const { email, username, password, confirmPassword } = state;
    
    const onChange = e => {
        dispatch(e.target);
    };

    const onSubmit = e => {
        e.preventDefault();
        setErrMsg('');
        setEmailErr(false);
        setUsernameErr(false);
        setPasswordErr(false);
        setConfirmPasswordErr(false);

        if(username.length < 2 || username.length > 15) {
            setUsernameErr(true);
            setErrMsg('닉네임은 2~15글자여야 합니다.');
            return;
        } else if (password.length < 6) {
            setPasswordErr(true);
            setErrMsg('비밀번호는 6글자 이상이어야 합니다.');
            return;
        } else if (password !== confirmPassword) {
            setPasswordErr(true);
            setConfirmPasswordErr(true);
            setErrMsg('비밀번호와 비밀번호 확인이 일치하지 않습니다.');
            return;
        }

        setLoading(true);

        authApi.localRegister({email, username, password})
        .then((result) => {
            console.log(result);
            alert(`가입 완료되었습니다.`);
            setRedirect(true);
        })
        .catch((result) => {
            // console.log(result.response);
            // console.log(result.response.status)
            // console.log(result.response.data);
            if(result.response.status === 400){
                setErrMsg('잘못된 입력값입니다.')
            } else if(result.response.status === 409) {
                if(result.response.data.key === 'email') {
                    setEmailErr(true);
                    setErrMsg('이미 존재하는 이메일입니다.');
                } else if (result.response.data.key === 'username') {
                    setUsernameErr(true);
                    setErrMsg('이미 존재하는 닉네임입니다.');
                }
            } else if(result.response.status === 500){
                setErrMsg('서버 오류');
            }
            setLoading(false);
        });
    }

    if(redirect){
        return <Redirect to='/auth/signin'/>; 
    }

    return(
        <SignUpCard>
            <FormWrapper>
                <H1>회원가입</H1>
                <SignUpForm onSubmit={onSubmit}>
                    <ErrMsg>{errMsg}</ErrMsg>
                    <TextField
                        required
                        label="이메일"
                        name="email"
                        value={email}
                        onChange={onChange}
                        error={emailErr}
                        margin="normal"
                    />
                    <TextField
                        required
                        label="닉네임"
                        name="username"
                        value={username}
                        onChange={onChange}
                        error={usernameErr}
                        margin="normal"
                    />
                    <TextField
                        required
                        label="비밀번호"
                        name="password"
                        type="password"
                        value={password}
                        onChange={onChange}
                        error={passwordErr}
                        margin="normal"
                    />
                    <TextField
                        required
                        label="비밀번호 확인"
                        name="confirmPassword"
                        type="password"
                        value={confirmPassword}
                        onChange={onChange}
                        error={confirmPasswordErr}
                        margin="normal"
                    />
                    <SubmitButton loading={loading?1:0}>가입하기</SubmitButton>
                    <LodingSection loading={loading?1:0}>
                        <div className="spinner">
                        <div className="bounce1" />
                        <div className="bounce2" />
                        <div className="bounce3" />
                        </div>
                    </LodingSection>
                </SignUpForm>
                <ToSignIn to='/auth/signin'>계정이 이미 있으신가요?로그인</ToSignIn>
            </FormWrapper>
        </SignUpCard>
    )
    
}

export default SignUp;