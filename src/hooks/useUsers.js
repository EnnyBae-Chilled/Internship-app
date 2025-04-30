import { useState, useEffect } from "react";

export function useUsers() {
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);

  // Load users from localStorage on init
  useEffect(() => {
    const savedUsers =
      JSON.parse(localStorage.getItem("internship-tracker-users")) || [];
    setUsers(savedUsers);
  }, []);

  const addUser = (newUser) => {
    const updatedUsers = [...users, { ...newUser, id: Date.now() }];
    setUsers(updatedUsers);
    localStorage.setItem(
      "internship-tracker-users",
      JSON.stringify(updatedUsers)
    );
  };

  return { users, currentUser, setCurrentUser, addUser };
}
