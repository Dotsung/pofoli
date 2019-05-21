import React, { Component } from 'react';
import { observable, action } from 'mobx'
import { observer, inject } from 'mobx-react'
import oc from 'open-color';
import Header from 'components/base/Header';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const StyledButton = styled.button`
    border: 0px;
    color: black;
    // background-image: linear-gradient(to right, ${oc.blue[4]} 0%, ${oc.violet[4]} 51%, ${oc.blue[4]} 100%);
    // background-size: 200% auto;
    // transition: 0.5s;

    background-color: white;

    width: 4.5rem;
    height: 1.8rem;
    font-size: 1rem;
    cursor: pointer;

    border: 1px solid black;
    border-radius: 3px;

    &:hover{
        //background-position: right center;
        background-color:  ${oc.gray[9]};
        color: white;
    }
`

const Href = styled(Link)`
`
@inject('userStore')
@observer
class HeaderContainer extends Component {
    render() {
        const { token } = this.props.userStore;

        return (
            <Header>
                <Href to="/auth/signin"><StyledButton>Login</StyledButton></Href>
            </Header>
        );
    }
}

export default HeaderContainer;