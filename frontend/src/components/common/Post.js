// @flow
import React from 'react';
import styled from 'styled-components';
import oc from 'open-color';
import { shadow, media } from 'lib/styleUtils';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart as sheart } from '@fortawesome/free-solid-svg-icons'
import { faHeart as rheart, faComment, faStar, faEye } from '@fortawesome/free-regular-svg-icons'

const ContentArea = styled.div`

`

class Post extends React.Component{
    render(){
        const { title, date, author, img, hearts, views, comments, stars } = this.props;
        return(
            <ContentArea>
                aaaaaa
            </ContentArea>
        )
    }
}

export default Post;