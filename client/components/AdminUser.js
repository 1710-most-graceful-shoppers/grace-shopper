import React from 'react';
import {connect} from 'react-redux';
import {updateUser, deleteUser} from '../store';

const AdminUser = (props) => {
  return (
    <div>
      <ul>
        {props.users.map(user => (
          <li key={user.id}>
            {user.email}
            {(user.isAdmin === false) ?
            (<button onClick={() => props.changeAdmin(user.id, {isAdmin: true})}>Add To Admin</button>) :
            (<button onClick={() => props.changeAdmin(user.id, {isAdmin: false})}>Remove From Admin</button>)
            }
            <button onClick={() => props.deleteUser(user.id)}>Delete User</button>
          </li>
        ))}
      </ul>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    users: state.users
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    changeAdmin: (userId, body) => dispatch(updateUser(userId, body)),
    deleteUser: (userId) => dispatch(deleteUser(userId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminUser);
