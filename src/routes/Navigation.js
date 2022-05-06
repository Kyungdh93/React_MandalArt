import { Navbar, Container } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import Auth from '../components/Auth'
import {useSelector} from 'react-redux';

const Navigation = () => {
  const getUserInfo = useSelector((state) => state);

    return(
        <Navbar bg="success" variant="dark">
          <Container>
            <Navbar.Brand href="#home">{getUserInfo.userName} 님의 만다라트</Navbar.Brand>
              <Auth></Auth>
          </Container>
        </Navbar>
    )
};

export default Navigation;