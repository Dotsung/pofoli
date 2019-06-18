// @flow
import React from 'react';
import styled from 'styled-components';
import oc from 'open-color';
import { observer, inject } from 'mobx-react';


const Wrapper = styled.div`
    display: flex;
    margin: 5px 0;
    padding: 10px 0;
    border-top: 1px solid ${oc.gray[5]};
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
    flex-direction: column;
    width: 100%;
    margin-top: 0.3rem;
`

const Border = styled.span`
    position: absolute;
    display: block;
    top: 2rem;
    left: 0;
    height: 2px;
    width: 100%;
    background: ${oc.indigo[4]};
    transform: scaleX(0);
    transform-origin: 0 0;
    transition: all .15s ease;
`

const Input = styled.input`
    display: block;
    width: 100%;
    height: 2rem;
    border: 0;
    padding: 0;
    font-size: 1rem;
    border-bottom: 2px solid #C8CCD4;
    background: none;
    border-radius: 0;
    color: black;
    transition: all .15s ease;

    &:hover {
        background-color: rgba(77, 77, 77, 0.3);
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
    render(){
        return(
            <Wrapper>
                <UserThumbnail src={this.props.userStore.thumbnail} />
                <Form>
                    <Input/>
                    <Border />
                    <ButtonWrapper>
                        <Spacer />
                        <button>submit</button>            
                    </ButtonWrapper>
                </Form>
            </Wrapper>
        )
    }
}

export default CommentInput;