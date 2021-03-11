import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Alert, Row, Col } from 'react-bootstrap'

const Notification = (props) => {
  if (!props.notification) {
    return null
  }

  const { notification, type } = props

  if (notification === null) {
    return null
  }

  let notificationType = ''

  if (!type) {
    notificationType = 'success'
  }

  if (type === 'error') {
    notificationType = 'danger'
  } else {
    notificationType = 'success'
  }

  return (
    <Row>
      <Col>
        <Alert variant={notificationType}>
          {notification}
        </Alert>
      </Col>
    </Row>
  )
}

const mapStateToProps = (state) => {
  return {
    notification: state.notification.text,
    type: state.notification.noteType,
  }
}

Notification.propTypes = {
  notification: PropTypes.string.isRequired,
  type: PropTypes.string,
}

const ConnectedNotification = connect(mapStateToProps)(Notification)

export default ConnectedNotification