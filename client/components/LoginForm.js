import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { login } from '../reducers/loginReducer'
import { useField } from '../hooks'
import { Form, Button, Row, Col } from 'react-bootstrap'

const LoginForm = (props) => {
  const { login, user } = props
  const username = useField('text')
  const password = useField('password')

  const handleLogin = async (event) => {
    event.preventDefault()
    login(username.value, password.value)
    username.reset()
    password.reset()
  }

  if (user) {
    return null
  }

  return (
    <Row className="mt-3">
      <Col>
        <h3>Blog app login</h3>
        <Form onSubmit={handleLogin}>
          <Form.Group>
            <Form.Label>Username</Form.Label>
            <Form.Control data-cy="login-username" {...username.inputVars} name="Username" />
            <Form.Label>Password</Form.Label>
            <Form.Control data-cy="login-password" {...password.inputVars} name="Password" />
            <Button data-cy="login-button" className="mt-2" variant="primary" type="submit">Login</Button>
          </Form.Group>
        </Form>
      </Col>
    </Row>
  )
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
  }
}

const mapDispatchToProps = {
  login,
}

LoginForm.propTypes = {
  login: PropTypes.func.isRequired,
}

const ConnectedLoginForm = connect(
  mapStateToProps,
  mapDispatchToProps,
)(LoginForm)

export default ConnectedLoginForm