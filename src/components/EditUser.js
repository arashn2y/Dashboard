import { useState, useEffect } from "react"
import { useNavigate, useMatch } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { Container, Form, Button, Row, Col } from "react-bootstrap"
import { editUser, getUserDetails } from "../actions/useractions"
import Loader from "./Loader"
import Message from "./Message"

const EditUser = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const match = useMatch("/edit/:id")
  const userDetails  = useSelector(state => state.userDetails)
  const { loading, error, user } = userDetails
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [username, setUsername] = useState("")
  const [phone, setPhone] = useState("")
  const [website, setWebsite] = useState("")
  const [city, setCity] = useState("")
  const [nameError, setNameError] = useState(false)
  const [emailError, setEmailError] = useState(false)
  const [usernameError, setUsernameError] = useState(false)
  const [phoneError, setPhoneError] = useState(false)
  const [websiteError, setWebsiteError] = useState(false)
  const [cityError, setCityError] = useState(false)

  const regexMail = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g
  const regexWebsite = /^[\w-.]+([\w-]+\.)+[\w-]{2,4}$/g

  useEffect(() => {
    if(!user.name || user.id !== Number(match.params.id)) {
      dispatch(getUserDetails(Number(match.params.id)))
    } else {
      setName(user.name)
      setEmail(user.email)
      setUsername(user.username)
      setPhone(user.phone)
      setWebsite(user.website)
      setCity(user.address.city)
    }
  }, [user, dispatch, match])

  const submitHandler = e => {
    e.preventDefault()
    name.trim().length < 3 && setNameError(true)
    username.trim().length < 3 && setUsernameError(true)
    phone.length < 10 && setPhoneError(true)
    city.length < 3 && setCityError(true)
    if (!regexMail.test(email)) {
      setEmailError(true)
      return
    } if(!regexWebsite.test(website)) {
      setWebsiteError(true)
      return
    }
    if (!nameError && !emailError && !usernameError && !phoneError && !websiteError && !cityError) {
      dispatch(editUser(user.id, name, email, username, phone, website, city))
      navigate("/")
    }
  }

  return (
    <Container fluid>
      <Row>
        <Col>Edit user</Col>
      </Row>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <Row className='my-5 position-relative'>
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
            </Form.Group>
            <Form.Group controlId='email'>
              <Form.Label>Username *</Form.Label>
              <Form.Control
                type='text'
                placeholder="Enter user's username"
                isInvalid={usernameError}
                value={username}
                onChange={e => {
                  setUsername(e.target.value)
                  usernameError && setUsernameError(false)
                }}
              />
              <Form.Control.Feedback type='invalid'>
                Please enter a valid username (at least 3 characters)
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId='email'>
              <Form.Label>Phone *</Form.Label>
              <Form.Control
                type='text'
                placeholder="Enter user's phone number"
                isInvalid={phoneError}
                value={phone}
                onChange={e => {
                  setPhone(e.target.value)
                  phoneError && setPhoneError(false)
                }}
              />
              <Form.Control.Feedback type='invalid'>
                Please enter a valid phone number (at least 10 number)
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId='email'>
              <Form.Label>website *</Form.Label>
              <Form.Control
                type='text'
                placeholder="Enter user's website"
                isInvalid={websiteError}
                value={website}
                onChange={e => {
                  setWebsite(e.target.value)
                  websiteError && setWebsiteError(false)
                }}
              />
              <Form.Control.Feedback type='invalid'>
                Please enter a valid website
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId='email'>
              <Form.Label>City *</Form.Label>
              <Form.Control
                type='text'
                placeholder="Enter user's city"
                isInvalid={cityError}
                value={city}
                onChange={e => {
                  setCity(e.target.value)
                  cityError && setCityError(false)
                }}
              />
              <Form.Control.Feedback type='invalid'>
                Please enter a valid City (at least 3 characters)
              </Form.Control.Feedback>
              <span className='my-3 d-inline-block'>*Required</span>
            </Form.Group>
            <Button
              type='submit'
              variant='warning mt-5 rounded'
              className='position-absolute'
              style={{ right: "12px" }}>
              Edit User
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
      )}
    </Container>
  )
}

export default EditUser
