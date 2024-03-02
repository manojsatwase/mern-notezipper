import React, { useState, useEffect } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import MainScreen from "../../components/MainScreen/MainScreen";
import ErrorMessage from "../../components/ErrorMessage";
import Loading from "../../components/Loading";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useCallAPI } from "../../customHooks/useCallAPI";

const ProfilePage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    pic: "",
    password: "",
    confirmPassword: "",
    picMessage: "",
  });

  const userInfo = useSelector((state) => state.createUser?.userInfo);
  const { loading, error, success, updateProfilePostAPI } = useCallAPI();
  const navigate = useNavigate();

  useEffect(() => {
    if (!userInfo) {
      navigate("/");
    } else {
      setFormData({
        name: userInfo.name,
        email: userInfo.email,
        pic: userInfo.pic,
        password: "",
        confirmPassword: "",
        picMessage: "",
      });
    }
  }, [navigate, userInfo]);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const postDetails = async (pics) => {
    if (!pics) {
      setFormData({ ...formData, picMessage: "Please Select an Image" });
      return;
    }
    if (pics.type === "image/jpeg" || pics.type === "image/png") {
      const data = new FormData();
      data.append("file", pics);
      data.append("upload_preset", "notezipper");
      data.append("cloud_name", "manoj-mern");
      try {
        const response = await fetch(
          "https://api.cloudinary.com/v1_1/manoj-mern/image/upload",
          {
            method: "POST",
            body: data,
          }
        );
        const imageData = await response.json();
        setFormData({ ...formData, pic: imageData.url });
      } catch (error) {
        console.error("Error uploading image:", error);
        setFormData({
          ...formData,
          picMessage: "An error occurred while uploading image",
        });
      }
    } else {
      setFormData({
        ...formData,
        picMessage: "Please Select an Image (JPEG or PNG)",
      });
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (formData.password === formData.confirmPassword) {
      updateProfilePostAPI(
        formData.name,
        formData.email,
        formData.password,
        formData.pic
      );
    }
  };

  return (
    <MainScreen title="EDIT PROFILE">
      <div>
        <Row className="profileContainer">
          <Col md={6}>
            <Form onSubmit={submitHandler}>
              {loading && <Loading />}
              {success && (
                <ErrorMessage variant="success">
                  Updated Successfully
                </ErrorMessage>
              )}
              {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
              <Form.Group className="mb-3" controlId="name">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  placeholder="Enter Name"
                  value={formData.name}
                  onChange={handleInputChange}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="email">
                <Form.Label>Email Address</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  placeholder="Enter Email"
                  value={formData.email}
                  onChange={handleInputChange}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="password">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  name="password"
                  placeholder="Enter Password"
                  value={formData.password}
                  onChange={handleInputChange}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="confirmPassword">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                />
              </Form.Group>
              {formData.picMessage && (
                <ErrorMessage variant="danger">
                  {formData.picMessage}
                </ErrorMessage>
              )}
              <Form.Group className="mb-3" controlId="pic">
                <Form.Label>Change Profile Picture</Form.Label>
                <Form.Control
                  type="file"
                  onChange={(e) => postDetails(e.target.files[0])}
                  accept="image/png, image/jpeg"
                />
              </Form.Group>
              <Button type="submit" variant="primary">
                Update
              </Button>
            </Form>
          </Col>
          <Col
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <img
              src={formData.pic}
              alt={formData.name}
              className="profilePic"
              style={{width:"480px"}}
            />
          </Col>
        </Row>
      </div>
    </MainScreen>
  );
};

export default ProfilePage;
