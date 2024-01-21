import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import google from '../../assets/login/Google.png';
import { auth, db } from '../../firebase/firebase.config';
import { addDoc, collection } from 'firebase/firestore';

const GoogleLogin = () => {
    const nav = useNavigate();

    const googleLoginButton = () => {
        const provider = new GoogleAuthProvider();
        signInWithPopup(auth, provider)
            .then((result) => {
                const credential = GoogleAuthProvider.credentialFromResult(result);
                const token = credential.accessToken;
                const user = result.user;
                nav('/profile');
                try {
                    const userDocRef = addDoc(collection(db, 'users'), {
                        uid: user.uid,
                        email: user.email
                    });
                } catch (error) {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    console.log('err', errorCode, errorMessage);
                }
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                const email = error.customData.email;
                const credential = GoogleAuthProvider.credentialFromError(error);
            });
    };

    return (
        <>
            <StGoogleLogin onClick={googleLoginButton}>
                <StGoogleImg src={google} alt="" />
            </StGoogleLogin>
        </>
    );
};

export default GoogleLogin;

const StGoogleLogin = styled.button`
    width: 42px;
    height: 42px;
    border-radius: 50%;
    border: 0px;
    cursor: pointer;
`;

const StGoogleImg = styled.img`
    width: 30px;
    height: 30px;
`;
