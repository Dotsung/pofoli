import React, { Component } from 'react';
import { observable, action } from 'mobx'
import { observer, inject } from 'mobx-react'
import oc from 'open-color';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

@inject('userStore')
@observer
class WritePostContainer extends Component {
    render() {
        const { token, thumbnail } = this.props.userStore;

        return (
            <>a</>
        );
    }
}

export default WritePostContainer;