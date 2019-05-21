import React, { Component } from 'react';
import { observable, action } from 'mobx'
import { observer, inject } from 'mobx-react'
import oc from 'open-color';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import WritePost from 'components/WritePost'

const Wrapper = styled.div`
    margin: auto;
    background: white;
    width: 1000px;
    height: 1000px;
`

@inject('userStore')
@observer
class WritePostContainer extends Component {
    render() {
        const { token, thumbnail } = this.props.userStore;

        return (
            <Wrapper>
                <WritePost />
            </Wrapper>
        );
    }
}

export default WritePostContainer;