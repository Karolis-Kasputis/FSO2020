import React from 'react'
import { useSelector } from 'react-redux'
import { Link, Switch, Route } from 'react-router-dom'
import User from '../components/User'
import {
  TableContainer,
  Table,
  TableBody,
  TableRow,
  TableCell,
  TableHead,
  Paper,
  Button,
} from '@material-ui/core'
const UserList = () => {
  const userList = useSelector((store) => store.userlist)

  return (
    <div>
      <h2>Users</h2>
      <Switch>
        <Route path='/users/:id'>
          <User />
        </Route>

        <Route path='/users'>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Blogs created</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {userList.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell button component={Link} to={`/users/${user.id}`}>
                      {user.name}
                    </TableCell>
                    <TableCell>{user.notes.length}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Route>
      </Switch>
    </div>
  )
}

export default UserList
