import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Button } from 'react-bootstrap'

const Togglable = (props) => {
  const { buttonLabel, hideLabel, children } = props
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const hideTextLabel = (hideLabel) ? hideLabel : 'Cancel'

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  return (
    <div>
      <div style={hideWhenVisible}>
        <Button onClick={toggleVisibility}>{buttonLabel}</Button>
      </div>
      <div style={showWhenVisible}>
        {children}
        <Button className="mt-1" onClick={toggleVisibility}>{hideTextLabel}</Button>
      </div>
    </div>
  )
}

Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
  hideLabel: PropTypes.string,
  children: PropTypes.node.isRequired,
}

export default Togglable