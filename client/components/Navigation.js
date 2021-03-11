import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { logout } from '../reducers/loginReducer'
import { Navbar, Nav, Button } from 'react-bootstrap'

const Navigation = (props) => {
  const { user, logout } = props

  const handleLogout = () => {
    logout()
  }

  if (!user) {
    return null
  }

  return (
    <div>
      <Navbar className="shadow" collapseOnSelect expand="md" bg="light">
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="#" as="span">
              <Link to="/">Blogs</Link>
            </Nav.Link>
            <Nav.Link href="#" as="span">
              <Link to="/users">Users</Link>
            </Nav.Link>
          </Nav>
          <Nav>
            <Navbar.Text>
              <Link to={`/users/${user.id}`}>{user.name}</Link> logged in
              <Button className="btn-sm ml-1" variant="primary" onClick={handleLogout}>Logout</Button>
            </Navbar.Text>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  )
}


const mapStateToProps = (state) => {
  return {
    user: state.user,
  }
}

const mapDispatchToProps = {
  logout,
}

const ConnectedNavigation = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Navigation)

export default ConnectedNavigation