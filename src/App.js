import { useState, useEffect } from "react";
import InternshipForm from "./components/InternshipForm";
import InternshipTable from "./components/InternshipTable";
import UserFilter from "./components/UserFilter";
import ExportControls from "./components/ExportControls";
import LinkSharePopup from "./components/LinkSharePopup";
import "./styles.css";

function App() {
  const [internships, setInternships] = useState([]);
  const [users, setUsers] = useState([]);
  const [currentInternship, setCurrentInternship] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [filteredInternships, setFilteredInternships] = useState([]);
  const [showLinkPopup, setShowLinkPopup] = useState(false);
  const [links, setLinks] = useState([]);

  // Load mock data initially
  useEffect(() => {
    const mockUsers = [
      { id: 1, name: "Joseph Oduyebo", phone: "+12818049489" },
      { id: 2, name: "Eniola Farinde", phone: "+18102919704" },
      { id: 3, name: "Eniola Irinoye", phone: "+18326512706" },
    ];

    const mockInternships = [
      {
        id: 1,
        company: "Tech Corp",
        position: "Developer",
        status: "Applied",
        date: "2025-04-20",
        notes: "Waiting for response",
        submittedBy: 1,
        submittedByName: "John Doe",
      },
    ];

    setUsers(mockUsers);
    setInternships(mockInternships);
  }, []);

  // Filter internships when user changes or internships update
  useEffect(() => {
    if (currentUser) {
      setFilteredInternships(
        internships.filter((item) => item.submittedBy === currentUser.id)
      );
    } else {
      setFilteredInternships(internships);
    }
  }, [internships, currentUser]);

  const handleSubmit = (internshipData) => {
    if (currentInternship) {
      // Update existing internship
      setInternships((prevInternships) =>
        prevInternships.map((item) =>
          item.id === currentInternship.id
            ? {
                ...internshipData,
                id: currentInternship.id,
                submittedBy: currentUser?.id || null,
                submittedByName: currentUser?.name || "Unknown",
              }
            : item
        )
      );
    } else {
      // Add new internship
      const newId = Math.max(...internships.map((i) => i.id), 0) + 1;
      setInternships((prevInternships) => [
        ...prevInternships,
        {
          ...internshipData,
          id: newId,
          submittedBy: currentUser?.id || null,
          submittedByName: currentUser?.name || "Unknown",
        },
      ]);
    }
    setCurrentInternship(null);
  };

  const handleEdit = (id) => {
    const internshipToEdit = internships.find((item) => item.id === id);
    setCurrentInternship(internshipToEdit);
    // Set the user who submitted this internship
    setCurrentUser(
      users.find((user) => user.id === internshipToEdit.submittedBy) || null
    );
  };

  const handleDelete = (id) => {
    setInternships((prevInternships) =>
      prevInternships.filter((item) => item.id !== id)
    );
  };

  const addUser = (user) => {
    const newUser = { ...user, id: Date.now() };
    setUsers((prevUsers) => [...prevUsers, newUser]);
  };

  const sendNotification = (user, title, url) => {
    const message = `Hi ${user.name}, a new link was shared with you:\n${title}\n${url}`;
    const encodedMsg = encodeURIComponent(message);
    const phone = user.phone.replace("+", "");
    const whatsappUrl = `https://wa.me/${phone}?text=${encodedMsg}`;

    window.open(whatsappUrl, "_blank");
  };

  const handleShareLink = (linkData, selectedUsers) => {
    const newLink = {
      ...linkData,
      id: Date.now(),
      timestamp: new Date().toISOString(),
      sharedBy: currentUser?.id || null,
      sharedByName: currentUser?.name || "System",
    };

    setLinks((prevLinks) => [...prevLinks, newLink]);

    // Send WhatsApp notifications
    selectedUsers.forEach((userId, index) => {
      const user = users.find((u) => u.id === userId);
      if (user) {
        setTimeout(() => {
          sendNotification(user, linkData.title, linkData.url);
        }, index * 500); // Delay to prevent browser blocking popups
      }
    });
  };

  return (
    <div className="app">
      <h1>My Internship Tracker</h1>

      <div className="controls-container">
        <UserFilter
          users={users}
          currentUser={currentUser}
          onUserChange={setCurrentUser}
          onAddUser={addUser}
        />
        <div className="right-controls">
          <ExportControls internships={filteredInternships} users={users} />
          <button
            className="share-button"
            onClick={() => setShowLinkPopup(true)}
          >
            Share Link
          </button>
        </div>
      </div>

      <div className="form-container">
        <InternshipForm
          onSubmit={handleSubmit}
          initialData={currentInternship}
          users={users}
          currentUser={currentUser}
          onUserChange={setCurrentUser}
        />
      </div>

      <div className="data-container">
        <InternshipTable
          internships={filteredInternships}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </div>

      {showLinkPopup && (
        <LinkSharePopup
          users={users}
          currentUser={currentUser}
          onClose={() => setShowLinkPopup(false)}
          onShare={handleShareLink}
        />
      )}
    </div>
  );
}

export default App;
