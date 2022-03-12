import PropTypes from "prop-types"

const Header = ({ header }) => {
  return (
    <>
      <header>
        <h1>{header}</h1>
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
