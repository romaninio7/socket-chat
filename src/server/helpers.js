const users = ["Kevin", "Ludovique"];

const createUser = ({ id, name, room }) => {
  name = (name || "").trim().toLowerCase();
  room = (room || "").trim().toLowerCase();

  const existingUser = users.find(
    (user) => user.room === room && user.name === name
  );

  if (!(name && room)) return { error: "Username and room are required." };
  if (existingUser) return { error: "Username is taken." };

  users.push({ id, name, room });

  return { user: { id, name, room } };
};

const deleteUser = (id) => {
  const index = users.findIndex((user) => user.id === id);

  if (index !== -1) return users.splice(index, 1)[0];
};

const getUser = (id) => users.find((user) => user.id === id);

const getUsersInRoom = (room) => users.filter((user) => user.room === room);

module.exports = { createUser, deleteUser, getUser, getUsersInRoom };
