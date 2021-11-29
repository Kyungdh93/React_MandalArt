import { GoogleAuthProvider, getAuth, signInWithRedirect, getRedirectResult, signOut } from "firebase/auth";
import { initializeApp } from 'firebase/app';
import { Button } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';

const Auth = () => {
  const firebaseConfig = {
    apiKey: "AIzaSyCJf8QP6hTXlYDWIiiN-gZkn16ybDUsBqM",
    authDomain: "mandalart-dcebc.firebaseapp.com",
    databaseURL: "https://mandalart-dcebc-default-rtdb.firebaseio.com",
    projectId: "mandalart-dcebc",
    storageBucket: "mandalart-dcebc.appspot.com",
    messagingSenderId: "480006732098",
    appId: "1:480006732098:web:9b2c4995952b97f3fd30db",
    measurementId: "G-69DSWCKLV5"
  };

  const app = initializeApp(firebaseConfig);
  const provider = new GoogleAuthProvider();
  const auth = getAuth();

  const signInClick = () => {
  signInWithRedirect(auth, provider);
  }

  const signOutClick = () => {
  signOut(auth).then(() => {
    // Sign-out successful.
  }).catch((error) => {
    // An error happened.
  });
  }

  getRedirectResult(auth)
  .then((result) => {
    // This gives you a Google Access Token. You can use it to access Google APIs.
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;

    // The signed-in user info.
    const user = result.user;
    alert(user.displayName)
  }).catch((error) => {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    // The email of the user's account used.
    const email = error.email;
    // The AuthCredential type that was used.
    const credential = GoogleAuthProvider.credentialFromError(error);
    // ...
  });

  return(
    <>
      <Button onClick={signInClick} variant="secondary">로그인</Button>
      <Button onClick={signOutClick} variant="secondary">로그아웃</Button>
    </>
  );
}

export default Auth;
