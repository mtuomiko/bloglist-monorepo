import React from 'react'
import { connect } from 'react-redux'
import CommentForm from './CommentForm'
import { likeBlog, removeBlog } from '../reducers/blogReducer'
import { withRouter } from 'react-router-dom'
import { Button, Table, Card } from 'react-bootstrap'

const Blog = (props) => {
  if (props.blog === undefined) {
    return null
  }
  const { blog, user, likeBlog, removeBlog, history } = props

  const like = () => {
    likeBlog(blog)
  }

  const remove = () => {
    const confirm = window.confirm(`Remove blog ${blog.title} by author ${blog.author}?`)
    if (confirm) {
      removeBlog(blog)
      history.push('/')
    }
  }

  // User comparison by username, not id. Probably not problematic, username should be unique in db
  return (
    <div>
      <Card data-cy="blog-details">
        <Card.Header as="h5">{blog.title}</Card.Header>
        <div className="p-2">
          <Card.Title>Author: {blog.author}</Card.Title>
          <Card.Subtitle>Blog added by {blog.user.name}</Card.Subtitle>
          <Card.Text>
            <a href={blog.url}>{blog.url}</a>
          </Card.Text>
          <div>
            {blog.likes} likes
            <Button data-cy="blog-like-button" className="btn-sm ml-1" onClick={like}>Like</Button>
          </div>
          {user.username === blog.user.username &&
            <div>
              <Button className="btn-sm mt-2" onClick={remove}>Remove blog</Button>
            </div>
          }
        </div>
      </Card>

      <div className="mt-3">
        <h3>Comments</h3>
        <CommentForm blog={blog} />

        {!blog.comments.length ?
          <p>No comments yet</p> :
          <Table data-cy="blog-commentlist-table" striped className="mt-2">
            <tbody>
              {blog.comments.map((comment, index) =>
                <tr key={index}>
                  <td>{comment}</td>
                </tr>
              )}
            </tbody>
          </Table>
        }
      </div>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
  }
}

const mapDispatchToProps = {
  likeBlog,
  removeBlog,
}

export const ConnectedBlog = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Blog)

export default withRouter(ConnectedBlog)