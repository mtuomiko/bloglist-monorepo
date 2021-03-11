import React from 'react'
import PropTypes from 'prop-types'
import { createBlog } from '../reducers/blogReducer'
import { connect } from 'react-redux'
import { useField } from '../hooks'
import { Form, Button, Row, Col } from 'react-bootstrap'

const BlogForm = (props) => {
  const { createBlog } = props
  const title = useField('text')
  const author = useField('text')
  const url = useField('text')

  const addBlog = (event) => {
    event.preventDefault()

    const newBlog = {
      title: title.value,
      author: author.value,
      url: url.value,
    }

    createBlog(newBlog)

    title.reset()
    author.reset()
    url.reset()
  }

  return (
    <Form onSubmit={addBlog}>
      <Form.Group as={Row}>
        <Form.Label column md={2}>Title</Form.Label>
        <Col md={10}>
          <Form.Control data-cy="blogform-title" {...title.inputVars} className="mr-auto" name="Title" />
        </Col>
      </Form.Group>
      <Form.Group as={Row}>
        <Form.Label column md={2}>Author</Form.Label>
        <Col md={10}>
          <Form.Control data-cy="blogform-author" {...author.inputVars} name="Author" />
        </Col>
      </Form.Group>
      <Form.Group as={Row}>
        <Form.Label column md={2}>Url</Form.Label>
        <Col md={10}>
          <Form.Control data-cy="blogform-url" {...url.inputVars} name="Url" />
        </Col>
      </Form.Group>

      <Button data-cy="blogform-save" variant="primary" type="submit">Save</Button>
    </Form>
  )
}

const mapDispatchToProps = {
  createBlog,
}

BlogForm.propTypes = {
  createBlog: PropTypes.func.isRequired,
}

const ConnectedBlogForm = connect(
  null,
  mapDispatchToProps,
)(BlogForm)

export default ConnectedBlogForm