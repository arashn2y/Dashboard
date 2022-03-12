import { Container } from "react-bootstrap"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import "./bootstrap.min.css"
import "./index.css"
import Header from "./components/Header"
import UserList from "./components/UserList"
import Footer from "./components/Footer"
import AddUser from "./components/AddUser"
import EditUser from "./components/EditUser"

const App = () => {
  return (
    <Router>
      <Header />
      <main>
        <Container fluid>
          <Routes>
            <Route path='/' element={<UserList />} />
            <Route path='/add-User' element={<AddUser />} />
            <Route path='edit/:id' element={<EditUser />} />
          </Routes>
        </Container>
      </main>
      <Footer />
    </Router>
  )
}

export default App
