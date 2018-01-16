import axios from 'axios';

const GOT_USERS = 'GOT_USERS';

const gotUsers = (users) => {
  return {
    type: GOT_USERS,
    users
  }
}

export function updateUser(userId, body) {
  return (dispatch) => {
    axios.put(`/api/users/${userId}`, body)
    .then(() => dispatch(fetchUsers()))
    .catch(console.error);
  }
}

export function deleteUser(userId) {
  return (dispatch) => {
    axios.delete(`/api/users/${userId}`)
    .then(() => dispatch(fetchUsers()))
    .catch(console.error);
  }
}

export function fetchUsers() {
  return (dispatch) => {
    axios.get('/api/users')
    .then(users => dispatch(gotUsers(users.data)))
    .catch(console.error);
  }
}

export default (users = [], action) => {
  switch (action.type) {
    case GOT_USERS:
      return action.users;
    default:
      return users;
  }
}
