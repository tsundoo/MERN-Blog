import { Button } from "flowbite-react";
import { AiFillGoogleCircle } from "react-icons/ai";
import { GoogleAuthProvider, signInWithPopup, getAuth } from 'firebase/auth';
import { app } from '../firebase';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { signInSuccess } from '../redux/user/userSlice';
import { useNavigate } from 'react-router-dom';

export default function OAuth() {

    const auth = getAuth(app);  // Initialize Firebase Authentication
    const dispatch = useDispatch(); // Redux dispatch hook
    const navigate = useNavigate(); // Navigation hook
    const handleGoogleClick = async () => {
        // Initialize Google Authentication Provider
        const provider = new GoogleAuthProvider();
        // Set custom parameters for the provider
        provider.setCustomParameters({ prompt: "select_account" });
        try {
            // Sign in with Google using Firebase
            const result = await signInWithPopup (auth, provider)
            // Send user data to backend for authentication
            const res = await axios.post('/api/auth/google', {
                name: result.user.displayName,
                email: result.user.email,
                avatar: result.user.photoURL
            })
            // If authentication is successful, dispatch the sign-in success action and navigate to the home page
            if (res.ok) {
                dispatch(signInSuccess(res.data));
                navigate('/');
            }
        } catch (error) {
            console.log(error);
        }
    }

  return (
    <Button type="button" gradientDuoTone="pinkToOrange" outline onClick={handleGoogleClick}>
        <AiFillGoogleCircle className="w-6 h-6 mr-2" />
        Continue with Google
    </Button>
  )
}
