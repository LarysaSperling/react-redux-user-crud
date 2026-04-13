import { useDispatch } from 'react-redux';
import { deleteUser } from '../redux/userSlice';

function UserItem({ user, onEdit }) {
  const dispatch = useDispatch();

  return (
    <div className="user-item">
      <span>
        {user.name}, {user.age}, {user.email}
      </span>

      <div className="user-actions">
        <button onClick={() => onEdit(user)}>Edit</button>
        <button onClick={() => dispatch(deleteUser(user.id))}>Delete</button>
      </div>
    </div>
  );
}

export default UserItem;