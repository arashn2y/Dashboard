import PropTypes from "prop-types"
import { Link } from "react-router-dom"

const Header = ({ header }) => {
  return (
    <>
      <header>
        <Link to='/' style={{textDecoration: 'none'}}><h1>{header}</h1></Link>
      </header>
      <hr />
    </>
  )
}

Header.defaultProps = {
  header: "Dashboard"
}

Header.propTypes = {
  header: PropTypes.string
}

export default Header
