// @flow
import React from 'react';
import styled from 'styled-components';
import oc from 'open-color';
import { observer, inject } from 'mobx-react';

import * as commentApi from 'lib/api/comment';

const Wrapper = styled.div`
    display: flex;
    margin: 5px 0;
    padding: 10px 0;
    //border-top: 1px solid ${oc.gray[5]};
`

const UserThumbnail = styled.img`
    display: block;
    width: 3rem;
    height: 3rem;
    object-fit: cover;
    border-radius: 50%;
`

const Form = styled.form`
    position: relative;
    display: flex;
    //flex-direction: column;
    width: 100%;
    margin-top: 0.3rem;
    margin-left: 1rem;
`

const Border = styled.span`
    position: absolute;
    display: block;
    top: 2rem;
    left: 0;
    height: 2px;
    width: 83%;
    background: ${oc.indigo[6]};
    transform: scaleX(0);
    transform-origin: 0 0;
    transition: all .15s ease;
`
const SubmitButton = styled.button`
    margin-top: 1px;
    border: 2px solid ${oc.indigo[3]};
    background-color: ${oc.indigo[3]};
    font-size: 1rem;
    width: 4rem;
    height: 2rem;
    color: white;

    ${
        props => props.on?
            `border: 2px solid ${oc.indigo[7]};
            background-color: ${oc.indigo[7]};`:``
    }
`

const Input = styled.input`
    display: block;
    width: 83%;
    height: 2rem;
    border: 0;
    padding: 0;
    font-size: 1rem;
    border-bottom: 1px solid ${oc.indigo[2]};
    background: none;
    border-radius: 0;
    color: black;
    transition: all .15s ease;

    &:hover {
        background-color: rgba(170, 170, 170, 0.3);
    }

    &:focus{
        background: none;
        outline: none;  
    }

    &:focus ~ ${Border}{
        transform: scaleX(1);
    }
`

const Spacer = styled.div`
    flex: 1;
`

const ButtonWrapper = styled.div`
    width: 100%;
    display: flex;
`

@inject('userStore')
@observer
class CommentInput extends React.Component{
    
    state = {
        body: ''
    }

    onChange = (e) => {
        const { name, value } = e.target; 
        this.setState({
            [name]: value
        });
    }

    onSubmit = (e) => {
        e.preventDefault();

        if(this.state.body === ''){
            return;
        }
                          
        const body = this.state.body;

        this.props.appendComment({
            authorThumbnail: this.props.userStore.thumbnail,
            authorUsername: this.props.userStore.username,
            body: body
        });

        this.setState({
            body: ''
        });

        commentApi.write({ 
            token: this.props.userStore.token,
            body: body,
            postid: this.props.postid
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
        return(
            <Wrapper>
                <UserThumbnail src={this.props.userStore.thumbnail} />
                <Form onSubmit={this.onSubmit}>
                    <Input name="body" value={this.state.body} onChange={this.onChange} autoComplete="off"/>
                    <Spacer />
                    <SubmitButton on={this.state.body === '' ?0:1} >댓글</SubmitButton>
                    <Border />
                </Form>
            </Wrapper>
        )
    }
}

export default CommentInput;