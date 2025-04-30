import { useState } from "react";
import AddUserForm from "./AddUserForm";

export default function UserFilter({
  users,
  currentUser,
  onUserChange,
  onAddUser,
}) {
  const [showAddUser, setShowAddUser] = useState(false);

  return (
    <div className="user-filter">
      <div className="filter-controls">
        <select
          value={currentUser?.id || ""}
          onChange={(e) => {
            const user = users.find((u) => u.id.toString() === e.target.value);
            onUserChange(user || null);
          }}
        >
          <option value="">All Users</option>
          {users.map((user) => (
            <option key={user.id} value={user.id}>
              {user.name}
            </option>
          ))}
        </select>
        <button
          className="add-user-btn"
          onClick={() => setShowAddUser(!showAddUser)}
        >
          {showAddUser ? "Cancel" : "+ Add User"}
        </button>
      </div>

      {showAddUser && <AddUserForm onAddUser={onAddUser} />}
    </div>
  );
}
