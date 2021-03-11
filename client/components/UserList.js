import React from 'react'
import { connect } from 'react-redux'
import User from './User'
import { Route, Link } from 'react-router-dom'
import { Table } from 'react-bootstrap'

const UserList = (props) => {
  if (props.users === undefined) {
    return null
  }
  const { users } = props

  const userById = (id) => users.find(u => u.id === id)

  return (
    <>
      <Route exact path="/users" render={() =>
        <>
          <h3>Users</h3>
          <Table data-cy="userlist-table" striped>
            <thead>
              <tr>
                <th></th>
                <th>Blogs created</th>
              </tr>
            </thead>
            <tbody>
              {users.map(user =>
                <tr key={user.id}>
                  <td>
                    <Link to={`/users/${user.id}`}>{user.name}</Link>
                  </td>
                  <td>{user.blogs.length}</td>
                </tr>
              )}
            </tbody>
          </Table>
        </>
      } />
      <Route path="/users/:id" render={({ match }) =>
        <User user={userById(match.params.id)} />
      } />
    </>
  )
}

const mapStateToProps = (state) => {
  return {
    users: state.users,
  }
}

const ConnectedUserList = connect(
  mapStateToProps,
  null,
)(UserList)

export default ConnectedUserList