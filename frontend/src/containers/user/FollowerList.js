import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import UserCard from 'components/user/UserCard';

import * as profileApi from 'lib/api/profile';

const Wrapper = styled.div`
    display: flex;
    flex-wrap: wrap;
    padding: 10px;
    box-sizing: border-box;

    @media (max-width:700px) {
        padding:0;
    }
`

const FollowerList = ({match}) => {
    const [followerList, setFollowerList] = useState([]);

    useEffect(() => {
        profileApi.getFollower({username: match.params.username})
        .then((result) => {
            console.log(result);
            setFollowerList(result.data);
        })
        .catch((result) => {
            console.log(result);
        });
    },[])
    
    return (
        <Wrapper>
            { followerList.map((user, idx) => 
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

export default FollowerList;