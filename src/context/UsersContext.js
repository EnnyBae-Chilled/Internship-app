import { createContext, useState, useEffect } from "react";

export const UsersContext = createContext({
  users: [],
  currentUser: null,
  setCurrentUser: () => {},
  addUser: () => {},
  refreshUsers: () => {},
});

export function UsersProvider({ children }) {
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);

  const refreshUsers = () => {
    const savedUsers =
      JSON.parse(localStorage.getItem("internship-tracker-users")) || [];
    setUsers(savedUsers);
  };

  const addUser = (newUser) => {
    const updatedUsers = [...users, { ...newUser, id: Date.now() }];
    setUsers(updatedUsers);
    localStorage.setItem(
      "internship-tracker-users",
      JSON.stringify(updatedUsers)
    );
  };

  useEffect(() => {
    refreshUsers();
  }, []);

  return (
    <UsersContext.Provider
      value={{
        users,
        currentUser,
        setCurrentUser,
        addUser,
        refreshUsers,
      }}
    >
      {children}
    </UsersContext.Provider>
  );
}
