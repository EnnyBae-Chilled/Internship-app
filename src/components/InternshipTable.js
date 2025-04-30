export default function InternshipTable({ internships, onEdit, onDelete }) {
  return (
    <>
      <h2>Your Internships</h2>
      <table className="internship-table">
        <thead>
          <tr>
            <th>Company</th>
            <th>Position</th>
            <th>Status</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {internships.map((internship) => (
            <tr key={internship.id}>
              <td>{internship.company}</td>
              <td>{internship.position}</td>
              <td>{internship.status}</td>
              <td>{internship.date}</td>
              <td>
                <button
                  className="edit-btn"
                  onClick={() => onEdit(internship.id)}
                >
                  Edit
                </button>
                <button
                  className="delete-btn"
                  onClick={() => onDelete(internship.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
