import { Navbar, Container, Nav } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import Auth from '../components/auth'

const Navigation = () => {
    return(
        <Navbar bg="dark" variant="dark">
        <Container>
        <Navbar.Brand href="#home">Mandal-Art</Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link href="#home">Home</Nav.Link>
          <Nav.Link href="#features">Features</Nav.Link>
          <Nav.Link href="#pricing">Pricing</Nav.Link>
          {/* <Button variant="secondary">로그인</Button> */}
          <Auth></Auth>
        </Nav>
        </Container>
      </Navbar>
    )
};

export default Navigation;