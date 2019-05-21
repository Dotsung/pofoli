// @flow
import React from 'react';
import HeaderContainer from 'containers/base/HeaderContainer' 
import WritePostContainer from 'containers/WritePostContainer'
import styled from 'styled-components';

const Content = styled.div`
    margin-top: 55px;
`

class WritePost extends React.Component{
    render(){
        return(
            <>
                <HeaderContainer/>
                <Content>
                    <WritePostContainer />
                </Content>
            </>
        )
    }
}

export default WritePost;