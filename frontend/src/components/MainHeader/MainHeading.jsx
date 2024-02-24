import { Container, Row } from "react-bootstrap";
import "./MainHeading.css";

const MainHeading = ({title,children}) => {
  return (
    <div className="main__heding">
       <Container>
        <Row>
            <div className="page">
              {
                title && (
                  <>
                    <h1 className="heading">{title}</h1>
                    <hr/>
                  </>
                  )}
            {children}
            </div>
        </Row>
       </Container>
    </div>
  )
}

export default MainHeading;