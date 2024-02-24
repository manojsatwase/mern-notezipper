import {Navbar,Container,Nav,NavDropdown,Form} from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <Navbar expand="lg" bg="primary" variant='dark' className="bg-body-tertiary">
    <Container>
      <Navbar.Brand>
        <Link to="/">Note Zipper</Link>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="navbarScroll" />
      <Navbar.Collapse id="navbarScroll">
        <Nav
          className="m-auto my-2 my-lg-0"
          style={{ maxHeight: '100px' }}
          navbarScroll
        >
         <Form className="d-flex">
          <Form.Control
            type="search"
            placeholder="Search"
            className="me-2"
            aria-label="Search"
          />
        </Form>
        </Nav>
          <Link to="mynotes">My Notes</Link>
          <NavDropdown title="Manoj Satwase" id="navbarScrollingDropdown">
            <NavDropdown.Item>
              <Link to="myprofile">My Profile</Link>
            </NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item>
              <Link to="/">Logout</Link>
            </NavDropdown.Item>
          </NavDropdown>
      </Navbar.Collapse>
    </Container>
  </Navbar>
  )
}

export default Header