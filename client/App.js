import React, { useEffect } from 'react'
import {
  HashRouter as Router,
  Route,
  Redirect,
} from 'react-router-dom'
import BlogList from './components/BlogList'
import UserList from './components/UserList'
import Navigation from './components/Navigation'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import { connect } from 'react-redux'
import { initializeBlogs } from './reducers/blogReducer'
import { initializeUsers } from './reducers/userReducer'
import { logout, checkLogin } from './reducers/loginReducer'
import { Container, Row, Col } from 'react-bootstrap'

const App = (props) => {
  const {
    initializeBlogs,
    initializeUsers,
    checkLogin,
    user,
  } = props

  useEffect(() => {
    initializeBlogs()
  }, [initializeBlogs])

  useEffect(() => {
    initializeUsers()
  }, [initializeUsers])

  useEffect(() => {
    checkLogin()
  }, [checkLogin])

  return (
    <Container>
      <Router>
        <Navigation />
        <Notification />
        <LoginForm />

        {user !== null &&
          <Row className="mt-3">
            <Col>
              <h2>Blog app</h2>
              <Route exact path="/" render={() =>
                <Togglable buttonLabel="Add blog">
                  <h4>Add new blog</h4>
                  <BlogForm />
                </Togglable>
              } />
              <BlogList />
              <Route exact path="/blogs" render={() =>
                <Redirect to="/" />
              } />
              <Route path="/users" render={() =>
                <UserList />
              } />
            </Col>
          </Row>
        }
      </Router>
    </Container>
  )
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
  }
}

const mapDispatchToProps = {
  initializeBlogs,
  initializeUsers,
  logout,
  checkLogin,
}

const ConnectedApp = connect(
  mapStateToProps,
  mapDispatchToProps,
)(App)

export default ConnectedApp