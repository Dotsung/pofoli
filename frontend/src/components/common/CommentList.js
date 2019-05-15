// @flow
import React from 'react';
import styled from 'styled-components';
import oc from 'open-color';

import Comment from './Comment';

const Slicer = styled.div`
    width: 100%;
    margin: 0;
    height: 0.2rem;
    background-color: ${oc.indigo[1]};
`

const Wrapper = styled.div`
    ${ props => {
        return props.watchComment?`display: block`:`display: none`
    }}
`

class CommentList extends React.Component{
    render(){
        const { img, watchComment } = this.props;
        return(
            <Wrapper watchComment={watchComment}>
                <Comment img={img}/>
                <Comment img={img}/>
                <Comment img={img}/>
            </Wrapper>
        )
    }
}

export default CommentList;