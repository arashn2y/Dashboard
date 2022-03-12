import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Table, Button, Row, Col, Modal } from "react-bootstrap"
import { LinkContainer } from "react-router-bootstrap"
import { Link } from "react-router-dom"
import { listUsers, removeUser } from "../actions/useractions"
import Message from "./Message"
import Loader from "./Loader"

const UserList = () => {
  const dispatch = useDispatch()

  const userList = useSelector(state => state.userList)
  const { loading, error, data, ready } = userList

  const [show, setShow] = useState(false)
  const [id, setId] = useState(0)
  const [sort, setSort] = useState(false)

  const [list, setList] = useState(data)

  useEffect(() => {
    if(!ready) {
      dispatch(listUsers())
    } else {
      setList(data)
    }
  }, [dispatch, ready])

  const showModal = id => {
    setShow(true)
    setId(id)
  }

  const deleteUser = () => {
    dispatch(removeUser(id))
    setShow(false)
  }

  const listSort = () => {
    if(sort) {
      data.sort((firstUser, SecondUser) => (firstUser.username.toLowerCase() > SecondUser.username.toLowerCase()) ? -1 : 1)
      setSort(false)
    } else {
      data.sort((firstUser, SecondUser) => (firstUser.username.toLowerCase() > SecondUser.username.toLowerCase()) ? 1 : -1)
      setSort(true)
    }
    setList(data)
  }

  return (
    <>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <>
          <Row>
            <Col>User List</Col>
            <Col style={{ textAlign: "right", paddingRight: "20px" }}>
              <Link to={"/add-user"}>
                <Button variant='info rounded'>Add new</Button>
              </Link>
            </Col>
          </Row>
          <hr />
          <Row style={{ margin: "10px" }}>
            <Col>
            {list.length 
            ? 
            <Table striped hover responsive className='table-sm'>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th className="d-flex align-items-center">{sort 
                    ?
                     <i className="fa-solid fa-arrow-down-z-a" style={{cursor:'pointer', display:'inline-block', marginRight: '5px'}} onClick={listSort}></i>
                    :
                    <i className="fa-solid fa-arrow-up-a-z" style={{cursor:'pointer', marginRight: '5px'}} onClick={listSort}></i>
                     } Username</th>
                    <th>City</th>
                    <th>Email</th>
                    <th>Edit</th>
                    <th>Remove</th>
                  </tr>
                </thead>
                <tbody>
                  {list.map(user => (
                    <tr key={user.id}>
                      <td>{user.id}</td>
                      <td>{user.name}</td>
                      <td>{user.username ? user.username : "-"}</td>
                      <td>{user.address ? user.address.city : "-"}</td>
                      <td>{user.email}</td>
                      <td>
                        <LinkContainer to={`/edit/${user.id}`}>
                          <Button variant='warning rounded' className='btn-sm'>
                            <i className='fas fa-edit'></i>
                          </Button>
                        </LinkContainer>
                      </td>
                      <td>
                        <Button
                          onClick={() => showModal(user.id)}
                          variant='danger rounded'
                          className='btn-sm'>
                          <i className='fas fa-remove'></i>
                        </Button>
                      </td>
                    </tr>
                  ))
                  }
                </tbody>
              </Table>
            :
            <Message variant='info' >No users can be found</Message>}
            </Col>
          </Row>

          <Modal show={show} onHide={() => setShow(false)}>
            <Modal.Header closeButton>
              <Modal.Title>Delete User</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              Are you sure? The data will be deleted from the data base completely.
            </Modal.Body>
            <Modal.Footer>
              <Button variant='dark rounded' onClick={() => setShow(false)}>
                NO
              </Button>
              <Button variant='danger rounded' onClick={deleteUser}>
                Delete
              </Button>
            </Modal.Footer>
          </Modal>
        </>
      )}
    </>
  )
}

export default UserList
