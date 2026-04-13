import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  users: [
    { id: 1, name: 'User1', age: 32, email: 'user1@email.com' },
    { id: 2, name: 'User2', age: 29, email: 'user2@email.com' },
  ],
};

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    addUser: (state, action) => {
      state.users.push(action.payload);
    },

    editUser: (state, action) => {
      const { id, name, age, email } = action.payload;
      const userIndex = state.users.findIndex((user) => user.id === id);

      if (userIndex !== -1) {
        state.users[userIndex] = { id, name, age, email };
      }
    },

    deleteUser: (state, action) => {
      state.users = state.users.filter((user) => user.id !== action.payload);
    },
  },
});

export const { addUser, editUser, deleteUser } = userSlice.actions;
export default userSlice.reducer;