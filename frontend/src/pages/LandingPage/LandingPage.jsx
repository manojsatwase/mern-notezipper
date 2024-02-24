import { Button, Container, Row } from "react-bootstrap";

import "./LandingPage.css";
import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <div className="main">
        <Container>
            <Row>
                <div className="intro__text">
                    <div>
                        <h1 className="title">Welcome to Note Zipper</h1>
                        <p className="subtitle">One Safe place for all your Notes.</p>
                    </div>
                    <div className="button__container">
                        <Link to="/login">
                        <Button size="lg" className="landing__button">Login</Button>
                        </Link>
                           
                        <Link to="/register">
                            <Button size="lg" className="landing__button" variant="outline-primary">register</Button>
                        </Link>
                    </div>
                </div>
            </Row>
        </Container>
    </div>
  )
}

export default LandingPage