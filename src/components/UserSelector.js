export default function UserSelector({ users, currentUser, setCurrentUser }) {
  return (
    <div className="user-selector">
      <label>Who is filling this form?</label>
      <select
        value={currentUser?.id || ""}
        onChange={(e) => {
          const selected = users.find(
            (u) => u.id.toString() === e.target.value
          );
          setCurrentUser(selected);
        }}
        required
      >
        <option value="">Select a team member</option>
        {users.map((user) => (
          <option key={user.id} value={user.id}>
            {user.name} ({user.phone})
          </option>
        ))}
      </select>

      {currentUser && (
        <div className="current-user">
          Currently selected: <strong>{currentUser.name}</strong>
        </div>
      )}
    </div>
  );
}
