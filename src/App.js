import Navigation from "./pages/Navigation";
import Logon from "./pages/Logon";
import Home from "./pages/Home";
import { Route, BrowserRouter, Routes } from 'react-router-dom';

import {useState, useEffect} from "react";
import {database} from './components/firebase';
import {collection, getDocs} from 'firebase/firestore';

const App = () => {
  const [users, setUsers] = useState([]);
  const usersCollectionRef = collection(database, "users");

  useEffect(() => {
    const getUsers = async () => {
      const data = await getDocs(usersCollectionRef);
      console.log(data);
    };
    getUsers();
  }, []);
  
  return (
    <BrowserRouter>
      <Navigation/>
      <Routes>
        <Route path="/" exact={true} element={<Home/>} />
        <Route path="/logon" element={<Logon/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
