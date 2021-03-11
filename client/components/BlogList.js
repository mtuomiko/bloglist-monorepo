import React from 'react'
import Blog from './Blog'
import { connect } from 'react-redux'
import { Route, Link } from 'react-router-dom'
import { Table } from 'react-bootstrap'

const BlogList = (props) => {
  const { blogs } = props

  const blogById = (id) => blogs.find(b => b.id === id)

  return (
    <div className="mt-3">
      <Route exact path="/" render={() =>
        <>
          <h3>Blogs</h3>
          <Table data-cy="bloglist-table" striped>
            <tbody>
              {blogs.map(blog =>
                <tr key={blog.id}>
                  <td>
                    <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
        </>
      } />
      <Route path="/blogs/:id" render={({ match }) =>
        <Blog blog={blogById(match.params.id)} />
      } />
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    blogs: state.blogs,
  }
}

const ConnectedBlogList = connect(
  mapStateToProps,
  null,
)(BlogList)

export default ConnectedBlogList