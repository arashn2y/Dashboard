import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"
import { Container, Form, Button, Row, Col } from "react-bootstrap"
import { addUser } from "../actions/useractions"

const AddUser = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [nameError, setNameError] = useState(false)
  const [emailError, setEmailError] = useState(false)

  const regexMail = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g

  const submitHandler = e => {
    e.preventDefault()
    name.trim().length < 3 && setNameError(true)
    if (!regexMail.test(email)) {
      setEmailError(true)
      return
    }
    if (!nameError && !emailError) {
      dispatch(addUser(name, email))
      navigate("/")
    }
  }
  return (
    <Container fluid>
      <Row>
        <Col>Add new user</Col>
      </Row>
      <Row className="my-5 position-relative">
        <Form onSubmit={submitHandler} className='position-relative'>
          <Form.Group controlId='text'>
            <Form.Label>Name *</Form.Label>
            <Form.Control
              className='border-0'
              type='text'
              placeholder="Enter user's name"
              isInvalid={nameError}
              value={name}
              onChange={e => {
                setName(e.target.value)
                nameError && setNameError(false)
              }}
            />
            <Form.Control.Feedback type='invalid'>
              Please enter the user's full name (at least 3 characters)
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group controlId='email'>
            <Form.Label>Email *</Form.Label>
            <Form.Control
              type='text'
              placeholder="Enter user's email"
              isInvalid={emailError}
              value={email}
              onChange={e => {
                setEmail(e.target.value)
                emailError && setEmailError(false)
              }}
            />
            <Form.Control.Feedback type='invalid'>
              Please enter a valid E-Mail
            </Form.Control.Feedback>
            <span className='my-3 d-inline-block'>*Required</span>
          </Form.Group>
          <Button
            type='submit'
            variant='info mt-5 rounded'
            className='position-absolute'
            style={{ right: "12px" }}>
            Add User
          </Button>
          <Button
            onClick={() => navigate("/")}
            variant='primary mt-5 rounded'
            className='position-absolute'
            style={{ right: "150px" }}>
            Cancel
          </Button>
        </Form>
      </Row>
    </Container>
  )
}

export default AddUser
