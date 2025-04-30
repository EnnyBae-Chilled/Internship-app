import { useState } from "react";

export default function LinkSharePopup({
  users,
  currentUser,
  onClose,
  onShare,
}) {
  const [linkData, setLinkData] = useState({
    url: "",
    title: "",
    description: "",
  });
  const [selectedUsers, setSelectedUsers] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onShare(linkData, selectedUsers);
    onClose();
  };

  return (
    <div
      className="popup-overlay"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0,0,0,0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1000,
      }}
    >
      <div
        className="popup-content"
        style={{
          backgroundColor: "white",
          padding: "20px",
          borderRadius: "8px",
          width: "80%",
          maxWidth: "500px",
        }}
      >
        <h3>Share Link with Team</h3>
        <button
          className="close-btn"
          onClick={onClose}
          style={{
            position: "absolute",
            top: "10px",
            right: "10px",
            background: "none",
            border: "none",
            fontSize: "20px",
            cursor: "pointer",
          }}
        >
          ×
        </button>

        <form onSubmit={handleSubmit}>
          <div className="form-group" style={{ marginBottom: "15px" }}>
            <label>Link Title</label>
            <input
              type="text"
              value={linkData.title}
              onChange={(e) =>
                setLinkData({ ...linkData, title: e.target.value })
              }
              required
              style={{ width: "100%", padding: "8px" }}
            />
          </div>

          <div className="form-group" style={{ marginBottom: "15px" }}>
            <label>URL</label>
            <input
              type="url"
              value={linkData.url}
              onChange={(e) =>
                setLinkData({ ...linkData, url: e.target.value })
              }
              required
              placeholder="https://example.com"
              style={{ width: "100%", padding: "8px" }}
            />
          </div>

          <div className="form-group" style={{ marginBottom: "15px" }}>
            <label>Description</label>
            <textarea
              value={linkData.description}
              onChange={(e) =>
                setLinkData({ ...linkData, description: e.target.value })
              }
              rows="3"
              style={{ width: "100%", padding: "8px" }}
            />
          </div>

          <div className="form-group" style={{ marginBottom: "15px" }}>
            <label>Select Team Members to Notify</label>
            {users
              .filter((u) => u.id !== currentUser?.id)
              .map((user) => (
                <div
                  key={user.id}
                  className="checkbox-item"
                  style={{ margin: "5px 0" }}
                >
                  <input
                    type="checkbox"
                    id={`user-${user.id}`}
                    checked={selectedUsers.includes(user.id)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedUsers([...selectedUsers, user.id]);
                      } else {
                        setSelectedUsers(
                          selectedUsers.filter((id) => id !== user.id)
                        );
                      }
                    }}
                  />
                  <label
                    htmlFor={`user-${user.id}`}
                    style={{ marginLeft: "5px" }}
                  >
                    {user.name} ({user.phone})
                  </label>
                </div>
              ))}
          </div>

          <button
            type="submit"
            className="share-btn"
            style={{
              backgroundColor: "#4CAF50",
              color: "white",
              padding: "10px 15px",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            Share & Notify
          </button>
        </form>
      </div>
    </div>
  );
}
