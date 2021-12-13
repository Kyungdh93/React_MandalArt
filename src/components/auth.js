import { GoogleAuthProvider, getAuth, signInWithRedirect, getRedirectResult, signOut } from "firebase/auth";
import { initializeApp } from 'firebase/app';
import { getFirestore } from "firebase/firestore";
import { Button } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import store from "../store";
import {useSelector} from 'react-redux';
import firebaseInfo from '../json/firebase.json'; 
const firebaseConfig = firebaseInfo;
const app = initializeApp(firebaseConfig);

const Auth = () => {  
  const provider = new GoogleAuthProvider();
  const auth = getAuth();
  const getUserInfo = useSelector((state) => state);

  const signInClick = () => {
  signInWithRedirect(auth, provider);
  }

  const signOutClick = () => {
  signOut(auth).then(() => {
    document.location.reload();
    // Sign-out successful.
  }).catch((error) => {
    // An error happened.
  });
  }

  getRedirectResult(auth)
  .then((result) => {
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;

    const user = result.user;
    // console.log(user.uid);
    // console.log(user.email);
    // console.log(user.displayName);

    store.dispatch({type:'USERAUTH', value:user.displayName, value1:true, value2:user.uid});
  }).catch((error) => {
  });

  return(
    <>
      <Button onClick={signInClick} variant="success" hidden={getUserInfo.userLogon}>로그인</Button>
      <Button onClick={signOutClick} variant="success" hidden={!getUserInfo.userLogon}>로그아웃</Button>
    </>
  );
}

export const database = getFirestore(app);
export default Auth;