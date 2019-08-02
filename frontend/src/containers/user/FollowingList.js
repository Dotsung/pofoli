import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import * as profileApi from 'lib/api/profile';

const Wrapper = styled.div`
    display: flex;
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
        <>
        following
        </>
    );
};

export default FollowingList;