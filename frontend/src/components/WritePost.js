// @flow
import React, { useState } from 'react';
import styled from 'styled-components';
import { styled as materialStyled } from '@material-ui/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import { inject } from 'mobx-react';
import { observer } from 'mobx-react-lite';

import oc from 'open-color';
import { Link, Redirect } from 'react-router-dom';
import * as postApi from 'lib/api/post';

const WhiteBox = styled.div`
    margin: auto;
    margin-top: 100px;
    margin-bottom: 100px;
    width: 500px;
    background-color: white;
    box-sizing: border-box;
`

const Spacer = styled.div`
    width: 20px;
`

const Wrapper = styled.div`
    padding: 10px;
    box-sizing: border-box;
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

const FileInput = styled.input`
`

const PreviewImage = styled.img`
    width: 100%;
`

const ButtonBox = styled.div`
    width: 100%;
    display: flex;
    margin-top: 10px;
`

const Cancel = styled(Link)`
    width: 100%;
`

const SubmitButton = styled.button`
    border: 1px solid ${oc.indigo[5]};
    background-color: ${oc.indigo[5]};
    color: white;
    height: 38px;
    font-size: 1.5rem;
    width: 100%;
    cursor: pointer;
    &:hover{
        background-color: ${oc.indigo[7]};
    }
`

const CancelButton = styled.button`
    border: 1px solid ${oc.indigo[5]};
    background-color: white;
    height: 38px;
    width: 100%;
    color: ${oc.indigo[5]};
    font-size: 1.5rem;
    cursor: pointer;

    &:hover{
        border: 1px solid ${oc.indigo[7]};
        color: ${oc.indigo[7]};
        background-color: ${oc.indigo[1]};
    }
`

const WritePost = ({token, getList}) => {
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [image, setImage] = useState(null);
    const [previewImage, setPreviewImage] = useState(null);
    const [redirect, setRedirect] = useState(false);

    const onChangeTitle = e => {
        setTitle(e.target.value);
    }

    const onChangeBody = e => {
        setBody(e.target.value);
    }

    const onChangeFile = e => {
        if (e.target.files && e.target.files[0]) {
            setImage(e.target.files[0]);
            setPreviewImage(URL.createObjectURL(e.target.files[0]))
        }
    }

    const onSubmit = e => {
        e.preventDefault();
        
        const formData = new FormData();

        formData.append('title', title);
        formData.append('body', body);
        formData.append('image', image);

        postApi.write({
            token,
            formData
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
                <Form onSubmit={onSubmit}>
                    <TextField
                        label="제목"
                        margin="dense"
                        variant="outlined"
                        value={title}
                        onChange={onChangeTitle}
                        autoComplete="off"
                    />
                    <PreviewImage src={previewImage} />
                    <TextField
                        label="내용"
                        multiline
                        rows="3"
                        margin="dense"
                        variant="outlined"
                        value={body}
                        onChange={onChangeBody}
                    />
                    <FileInput onChange={onChangeFile} accept="image/*" type="file"/>
                    <ButtonBox>
                        <Cancel to="/">
                            <CancelButton>취소</CancelButton>
                        </Cancel>
                        <Spacer />
                        <SubmitButton>Post</SubmitButton>
                    </ButtonBox>
                </Form>
            </Wrapper>
        </WhiteBox>
        </>
    )
}

export default inject(({ userStore, postListStore }) => ({
    token: userStore.token,
    thumbnail: userStore.thumbnail,
    getList: postListStore.getList
}))(observer(WritePost));