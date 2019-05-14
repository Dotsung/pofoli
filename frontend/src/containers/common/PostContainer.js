// @flow
import React from 'react';
import styled from 'styled-components';
import Post from 'components/common/Post';
import oc from 'open-color';
import { Link } from 'react-router-dom';

const Wrapper = styled.div`
    ${ props => {
        return props.modal?`display:block`:`display: none;`
    }}
    z-index: 1; /* Sit on top */
    left: 0;
    top: 0;
`

class PostContainer extends React.Component {
    render(){
        const { modal } = this.props;
        return (
            <Wrapper modal={modal}>
                <Post />
            </Wrapper>
        )
    }
}

export default PostContainer;