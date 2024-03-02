import React, {useEffect, useState } from 'react'
import MainScreen from '../../components/MainScreen/MainScreen';
import { Col, Form, Row } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';

import { useCallAPI } from '../../customHooks/useCallAPI';
import Loading from '../../components/Loading';
import ErrorMessage from '../../components/ErrorMessage';

import { useDispatch } from 'react-redux';
import { createUser } from '../../redux/slices/createUserSlice';

import "./LoginPage.css";

function LoginPage() {
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  
  const {error,loading,userInfo,callLoginPostAPI} = useCallAPI();


  const onChangeEmail = ({target:{value}}) => setEmail(value);
  const onChangePassword = ({target:{value}})=> setPassword(value);

const submitHandler = e => {
  e.preventDefault();
  callLoginPostAPI(email,password);
}

const navigate = useNavigate();
const dispatch = useDispatch();

useEffect(()=>{
  if(userInfo){
    navigate("/mynotes");
    dispatch(createUser(userInfo));
  }
},[userInfo,navigate,dispatch])

if(loading) return <Loading/>
  return (
   <>
    <MainScreen title="LOGIN">
    <div className='loginContainer'>
      {error && (
        <ErrorMessage variant='danger'>
          {error}
        </ErrorMessage>
      )}
    <Form onSubmit={submitHandler}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control 
         type="email"
         placeholder="Enter email"
         value={email}
         onChange={onChangeEmail}
         />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control 
        type="password" 
        placeholder="Password" 
        value={password}
        onChange={onChangePassword}
        />
      </Form.Group>
      {/* {error && (
        <Form.Text className="text-danger pb-2">
        {error}
      </Form.Text>
      )} */}
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
    <Row className="py-3">
      <Col>
         New Customer ? <Link to="/register">Register</Link>
      </Col>
    </Row>
    </div>
    </MainScreen>
    </>
  )
}

export default LoginPage;