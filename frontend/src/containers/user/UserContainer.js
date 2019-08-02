// @flow
import React from 'react';
import styled from 'styled-components';
import { Route, Switch } from "react-router-dom";

import UserInfo from 'components/user/UserInfo';
import UserNav from 'components/user/UserNav';
import PostCardList from 'containers/common/PostCardList';
import FollowingList from 'containers/user/FollowingList';
import FollowerList from 'containers/user/FollowerList';

const WhiteBox = styled.div`
    background: white;
`

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
`

const UserContainer = ({username}) => {
    return (
        <>
        <WhiteBox>
            <Wrapper>
                <UserInfo username={username}/>
                <UserNav username={username}/>
            </Wrapper>
        </WhiteBox>

        <Switch>
            <Route path={'/user/:username/following'} component={FollowingList}/>
            <Route path={'/user/:username/follower'} component={FollowerList}/>
            <Route path={'/user/:username/:category'} component={PostCardList}/>
        </Switch>
        </>
    )
}

export default UserContainer;