import React from 'react'
import { Table } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const User = (props) => {
  if (props.user === undefined) {
    return null
  }
  const { user } = props
  return (
    <div>
      <h3>{user.name}</h3>
      {!user.blogs.length ?
        <h5>No blogs added</h5> :
        <>
          <h5>Added blogs</h5>
          <Table striped>
            <tbody>
              {user.blogs.map(blog =>
                <tr key={blog.id}>
                  <td>
                    <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
        </>
      }
    </div>
  )
}

export default User