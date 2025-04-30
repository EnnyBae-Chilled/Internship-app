export default function LinksPage({ links, users }) {
  // Sort links by newest first
  const sortedLinks = [...links].sort(
    (a, b) => new Date(b.timestamp) - new Date(a.timestamp)
  );

  return (
    <div className="links-page">
      <h1>Shared Links</h1>
      {links.length === 0 ? (
        <p>No links have been shared yet</p>
      ) : (
        <div className="links-list">
          {sortedLinks.map((link) => {
            const sharedBy = users.find((u) => u.id === link.sharedBy);
            return (
              <div key={link.id} className="link-card">
                <h3>{link.title}</h3>
                <a href={link.url} target="_blank" rel="noopener noreferrer">
                  {link.url}
                </a>
                <p className="meta">
                  Shared by: {sharedBy?.name || "System"} •{" "}
                  {new Date(link.timestamp).toLocaleString()}
                </p>
                {link.description && <p>{link.description}</p>}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
