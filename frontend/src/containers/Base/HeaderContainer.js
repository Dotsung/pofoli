import React, { Component } from 'react';
import { observable, action } from 'mobx'
import { observer, inject } from 'mobx-react'
import oc from 'open-color';
import Header from 'components/base/Header';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const StyledButton = styled.button`
    border: 0px;
    color: white;
    background-image: linear-gradient(to right, ${oc.blue[4]} 0%, ${oc.violet[4]} 51%, ${oc.blue[4]} 100%);
    background-size: 200% auto;
    transition: 0.5s;

    width: 5rem;
    height: 2rem;
    font-size: 1rem;
    cursor: pointer;

    border-radius: 3px;

    &:hover{
        background-position: right center;
    }
`

const Href = styled(Link)`
`

class HeaderContainer extends Component {
    render() {
        return (
            <Header>
                <Href to="/auth/signin"><StyledButton>Login</StyledButton></Href>
            </Header>
        );
    }
}

export default HeaderContainer;