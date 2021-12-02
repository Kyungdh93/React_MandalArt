import { Navbar, Container, Nav } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import Auth from '../components/auth'

const Navigation = () => {
  console.log("Navi")
    return(
        <Navbar bg="primary" variant="dark">
        <Container>
        <Navbar.Brand href="#home">Mandal-Art</Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link href="#home">Home</Nav.Link>
          <Auth></Auth>
        </Nav>
        </Container>
      </Navbar>
    )
};

export default Navigation;