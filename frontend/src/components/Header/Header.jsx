import {Navbar,Container,Nav,NavDropdown,Form} from 'react-bootstrap';

const Header = () => {
  return (
    <Navbar expand="lg" bg="primary" variant='dark' className="bg-body-tertiary">
    <Container>
      <Navbar.Brand href="/">Note Zipper</Navbar.Brand>
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
          <Nav.Link href="#action1">My Notes</Nav.Link>
          <NavDropdown title="Manoj Satwase" id="navbarScrollingDropdown">
            <NavDropdown.Item href="myprofile">My Profile</NavDropdown.Item>

            <NavDropdown.Divider />
            <NavDropdown.Item href="logout">
              Logout
            </NavDropdown.Item>
          </NavDropdown>
      </Navbar.Collapse>
    </Container>
  </Navbar>
  )
}

export default Header