import {Navbar,Container,Nav,NavDropdown,Form} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { createUser } from '../../redux/slices/createUserSlice';
import {capitalize} from '../../constant';
import { useEffect, useState } from 'react';
import { searchTask } from '../../redux/slices/searchTaskSlice';

const Header = () => {
  const [searchText,setSearchText] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userInfo = useSelector(state=>state.createUser.userInfo);
  const Logout = () => {
    localStorage.removeItem('userInfo');
    navigate("/");
    dispatch(createUser(null));
  }

  const onChangeHandler = ({target:{value}}) => {
    setSearchText(value)
  }
  useEffect(()=>{
      const timer = setTimeout(() => {
        dispatch(searchTask(searchText));
      }, 500);
  
      return () => {
        clearTimeout(timer);
      };
    }, [searchText ]);
  

  return (
    <Navbar expand="lg" bg="primary" variant='dark' className="bg-body-tertiary">
    <Container>
      <Navbar.Brand>
        <Link to="/">Task Manager</Link>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="navbarScroll" />
     { userInfo ? (
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
           value={searchText}
           onChange={onChangeHandler}
         />
       </Form>
       </Nav>
         <Link to="mynotes" className='px-2'>My Tasks</Link>
         <Link to="/mynotes/createnote">CreateTask</Link>
         <NavDropdown title={capitalize(userInfo?.name)} id="navbarScrollingDropdown">
           {/* <NavDropdown.Item  to='/myprofile'> */}
             <Link className='p-4' to="myprofile">My Profile</Link>
           {/* </NavDropdown.Item> */}
           <NavDropdown.Divider />
           <NavDropdown.Item onClick={Logout}>
             Logout
           </NavDropdown.Item>
         </NavDropdown>
     </Navbar.Collapse>
     ) : (
      <Link className='ml-auto' to="/login">Login</Link>
     )}
    </Container>
  </Navbar>
  )
}

export default Header