import { Button, Container, Row } from "react-bootstrap";

import "./LandingPage.css";

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
                        <a href="/login">
                            <Button size="lg" className="landing__button">Login</Button>
                        </a>
                        <a href="/register">
                            <Button size="lg" className="landing__button" variant="outline-primary">register</Button>
                        </a>
                    </div>
                </div>
            </Row>
        </Container>
    </div>
  )
}

export default LandingPage