// @flow
import React, { useState } from 'react';
import styled from 'styled-components';

import { inject } from 'mobx-react';
import { observer } from 'mobx-react-lite';

import oc from 'open-color';
import { Link, Redirect } from 'react-router-dom';
import * as postApi from 'lib/api/post';

const WhiteBox = styled.div`
    position: fixed;
    top: 20%;
    left: 50%;
    margin: auto;
    width: 500px;
    z-index: 30;
    background-color: white;
    box-sizing: border-box;
    transform: translate(-50%);
`

const Spacer = styled.div`
    flex: 1;
`

const Wrapper = styled.div`
    padding: 20px;
    padding-top: 10px;
    box-sizing: border-box;
`

const Head = styled.div`
    display: flex;
    width: 100%;
`

const H1 = styled.h1`
    margin: 0;
`

const Slicer = styled.div`
    height: 1px;
    width: 100%;
    background-color: ${oc.gray[5]}
    margin-top: 0.5rem;
    margin-bottom: 0.5rem;
`

const Form = styled.form`
    padding: 10px;
    display: flex;
    width: 100%
    flex-direction: column;
    box-sizing: border-box;
`

const InputBox = styled.div`
    display: flex;
    width: 100%
    flex-direction: column;
`

const Input = styled.input`
    width: 100%
    border: none;
    border-bottom: 1px solid ${oc.gray[6]};
`

const InputLabel = styled.h3`
    margin: 0;
`

const SubmitButton = styled.button`

`

const WritePost = ({token, getList}) => {
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [image, setImage] = useState(null);
    const [redirect, setRedirect] = useState(false);

    const onChangeTitle = e => {
        setTitle(e.target.value);
    }

    const onChangeBody = e => {
        setBody(e.target.value);
    }

    const onChangeFile = e => {
        setImage(e.target.files[0])
    }

    const onSubmit = e => {
        e.preventDefault();
        
        const formData = new FormData();

        formData.append('title', title);
        formData.append('body', body);
        formData.append('image', image);

        postApi.write({ 
            token: token, 
            formData: formData
        })
        .then((result) => {
            console.log(result);
            console.log('성공');
            setRedirect(true);
            getList();
        })
        .catch((result) => {
            console.log(result);
            console.log('실패');
        });
    }

    return(
        <>
        {redirect?<Redirect to='/'/>:``}
        <WhiteBox>
            <Wrapper>
                <Head>
                    <H1>Write New Post</H1>
                    <Spacer />
                    <Link to="/">
                        <H1>X</H1>
                    </Link>
                </Head>
                <Slicer />
                <Form onSubmit={onSubmit}>
                    <InputBox>
                        <InputLabel>title</InputLabel>
                        <Input type="text" value={title} onChange={onChangeTitle}/>
                    </InputBox>
                    <InputBox>
                        <InputLabel>body</InputLabel>
                        <Input type="text" value={body} onChange={onChangeBody} />
                    </InputBox>
                    <input type="file" onChange={onChangeFile} accept="image/*" />
                    <SubmitButton>Post</SubmitButton>
                </Form>
            </Wrapper>
        </WhiteBox>
        </>
    )
}

export default inject(({ userStore, postListStore }) => ({
    token: userStore.token,
    getList: postListStore.getList
}))(observer(WritePost));