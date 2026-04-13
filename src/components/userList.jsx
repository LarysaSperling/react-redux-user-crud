import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addUser, editUser } from '../redux/userSlice';
import UserItem from './userItem';

function UserList() {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users.users);

  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [email, setEmail] = useState('');
  const [editId, setEditId] = useState(null);
  const [error, setError] = useState('');

  const resetForm = () => {
    setName('');
    setAge('');
    setEmail('');
    setEditId(null);
    setError('');
  };

  const validateEmail = (value) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name.trim() || !age.trim() || !email.trim()) {
      setError('All fields are required');
      return;
    }

    if (!validateEmail(email)) {
      setError('Invalid email format');
      return;
    }

    const userData = {
      id: editId ?? Date.now(),
      name: name.trim(),
      age: Number(age),
      email: email.trim(),
    };

    if (editId) {
      dispatch(editUser(userData));
    } else {
      dispatch(addUser(userData));
    }

    resetForm();
  };

  const handleEdit = (user) => {
    setName(user.name);
    setAge(String(user.age));
    setEmail(user.email);
    setEditId(user.id);
    setError('');
  };

  return (
    <div className="user-list-container">
      <h1>User List</h1>

      <div className="users-block">
        {users.map((user) => (
          <UserItem key={user.id} user={user} onEdit={handleEdit} />
        ))}
      </div>

      <h2>{editId ? 'Edit User' : 'Add User'}</h2>

<form onSubmit={handleSubmit} className="user-form">
  <div className="form-group">
    <label htmlFor="name">Name</label>
    <input
      id="name"
      name="name"
      type="text"
      autoComplete="name"
      value={name}
      onChange={(e) => setName(e.target.value)}
    />
  </div>

  <div className="form-group">
    <label htmlFor="age">Age</label>
    <input
      id="age"
      name="age"
      type="number"
      autoComplete="off"
      value={age}
      onChange={(e) => setAge(e.target.value)}
    />
  </div>

  <div className="form-group">
    <label htmlFor="email">Email</label>
    <input
      id="email"
      name="email"
      type="email"
      autoComplete="email"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
    />
  </div>

  <div className="form-buttons">
    <button type="submit">
      {editId ? 'Save' : 'Add'}
    </button>

    {editId && (
      <button type="button" onClick={resetForm}>
        Cancel
      </button>
    )}
  </div>
</form>

      {error && <p className="error">{error}</p>}
    </div>
  );
}

export default UserList;