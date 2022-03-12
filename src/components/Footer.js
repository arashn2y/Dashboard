import { Container, Row, Col } from "react-bootstrap"

const Footer = props => {
  return (
    <Container>
      <Row>
        <Col className='text-center py-3'>
          copyright &copy; <a href='https://github.com/arashn2y' style={{textDecoration: 'none'}}>Arash Nouri</a>
        </Col>
      </Row>
    </Container>
  )
}

export default Footer
