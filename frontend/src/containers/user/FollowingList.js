import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import * as profileApi from 'lib/api/profile';

import UserCard from 'components/user/UserCard';

const Wrapper = styled.div`
    display: flex;
    flex-wrap: wrap;
    padding: 10px;
    box-sizing: border-box;

    @media (max-width:700px) {
        padding:0;
    }
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
            { followingList.map((user, idx) => 
                <UserCard
                    thumbnail={user.thumbnail}
                    username={user.username}
                    intro={user.introduction}
                    key={idx}
                />    
            )}
        </Wrapper>
    );
};

export default FollowingList;