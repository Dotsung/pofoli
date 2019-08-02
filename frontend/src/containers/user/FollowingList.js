import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import * as profileApi from 'lib/api/profile';

import UserCard from 'components/user/UserCard';

const Wrapper = styled.div`
    display: flex;
    flex-wrap: wrap;
    padding: 10px;
    box-sizing: border-box;
`

const FollowingList = ({match}) => {
    const [followingList, setFollowingList] = useState([]);

    useEffect(() => {
        profileApi.getFollowing({username: match.params.username})
        .then((result) => {
            console.log(result);
            setFollowingList(result.data);
        })
        .catch((result) => {
            console.log(result);
        });
    },[])
    
    return (
        <Wrapper>
            <UserCard />
            <UserCard />
            <UserCard />
            <UserCard />
            <UserCard />
        </Wrapper>
    );
};

export default FollowingList;