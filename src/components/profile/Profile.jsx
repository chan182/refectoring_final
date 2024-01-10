import React from 'react';
import styled from 'styled-components';
import UserInfo from './UserInfo';
import UserWritelist from './UserWritelist';
const Profile = () => {
    return (
        <StBox>
            <UserInfo />
            <StHr />
            <UserWritelist />
        </StBox>
    );
};
export default Profile;
const StBox = styled.div`
    width: 100%;
    /* height: 200vh; */
    padding: 50px 0px 0px 0px;
    position: relative;
    display: flex;
    align-items: center;
    flex-direction: column;
    background-color: var(--background-color);
`;
const StHr = styled.hr`
    border: 1px solid var(--hr-border-color);
    border-width: 1px 0 0 0;
    margin: 84px;
    width: 50%;
`;
