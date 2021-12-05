import { Navbar, Container, Nav } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import Auth from '../components/auth'
import {useState} from "react";
import {useSelector} from 'react-redux';

const Navigation = () => {
  // state = {userName:store.getState().userName}
  // console.log(store.getState().userName)
  const getUserInfo = useSelector((state) => state);
  const [users, setUsers] = useState("");

    return(
        <Navbar bg="success" variant="dark">
          <Container>
            <Navbar.Brand href="#home">{getUserInfo.userName} 님의 만다라트</Navbar.Brand>
              <Auth setUsers={setUsers}></Auth>
          </Container>
        </Navbar>
    )
};

export default Navigation;