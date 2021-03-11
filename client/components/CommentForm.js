import React from 'react'
import { useField } from '../hooks'
import { addComment } from '../reducers/blogReducer'
import { connect } from 'react-redux'
import { Button, Form, Row, Col } from 'react-bootstrap'

const CommentForm = (props) => {
  const { blog, addComment } = props

  const comment = useField('text')

  const handleAddComment = (event) => {
    event.preventDefault()
    addComment(blog, comment.value)
    comment.reset()
  }

  return (
    <Form onSubmit={handleAddComment}>
      <Row>
        <Col sm={8} md={6}>
          <Form.Control data-cy="commentform-comment" {...comment.inputVars} name="Comment" />
        </Col>
        <Col>
          <Button data-cy="commentform-button" className="mt-2 mt-sm-0" type="submit">Add comment</Button>
        </Col>
      </Row>
    </Form>
  )
}

const mapDispatchToProps = {
  addComment,
}

const ConnectedCommentForm = connect(
  null,
  mapDispatchToProps,
)(CommentForm)

export default ConnectedCommentForm