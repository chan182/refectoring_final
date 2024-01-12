import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../../firebase/firebase.config';

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
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                const email = error.customData.email;
                const credential = GoogleAuthProvider.credentialFromError(error);
            });
    };

    return <button onClick={googleLoginButton}>GoogleLogin</button>;
};

export default GoogleLogin;
