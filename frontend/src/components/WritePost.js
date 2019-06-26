// @flow
import React from 'react';
import styled from 'styled-components';
import { observable, action } from 'mobx'
import { observer, inject } from 'mobx-react'
import oc from 'open-color';
import { Link } from 'react-router-dom';
import * as postApi from 'lib/api/post';

const WhiteBox = styled.div`
    position: fixed;
    top: 20%;
    left: 50%;
    margin: auto;
    width: 500px;
    z-index: 30;
    background-color: white;
    transform: translate(-50%);
`

const Spacer = styled.div`
    flex: 1;
`

const Wrapper = styled.div`
    padding: 20px;
    padding-top: 10px;
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

@inject('userStore')
@observer
class WritePost extends React.Component{
    state = {
        title: '',
        body: '',
        image: null
    }

    onChange = (e) => {
        const { name, value } = e.target; 
        this.setState({
            [name]: value
        });
    }

    onChangeFile = (e) => {
        this.setState({
            image: e.target.files[0]
        });
    }

    onSubmit = (e) => {
        e.preventDefault();

        console.log(this.state)

        const formData = new FormData();

        formData.append('title', this.state.title);
        formData.append('body', this.state.body);
        formData.append('image', this.state.image);
        
        postApi.write({ 
            token: this.props.userStore.token, 
            formData: formData
        })
        .then((result) => {
            console.log(result);
            console.log('성공');
        })
        .catch((result) => {
            console.log(result);
            console.log('실패');
        });

    }

    render(){
        const { title, body, image } = this.state;

        return(
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
                    <Form onSubmit={this.onSubmit}>
                        <InputBox>
                            <InputLabel>title</InputLabel>
                            <Input type="text" name="title" value={title} onChange={this.onChange}/>
                        </InputBox>
                        <InputBox>
                            <InputLabel>body</InputLabel>
                            <Input type="text" name="body" value={body} onChange={this.onChange} />
                        </InputBox>
                        <input type="file" onChange={this.onChangeFile} accept="image/*" />
                        <SubmitButton>Post</SubmitButton>
                    </Form>
                </Wrapper>
            </WhiteBox>
        )
    }
}

export default WritePost;