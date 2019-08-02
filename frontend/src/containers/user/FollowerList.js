import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import * as profileApi from 'lib/api/profile';

const Wrapper = styled.div`
    display: flex;
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
        <>
        follower
        </>
    );
};

export default FollowerList;