
import type { Document } from "../types/Document";
interface DocumentGridProps {
  documents: Document[];
}
const DocumentGrid: React.FC<DocumentGridProps> = ({ documents }) => {
  return (
    <div style={{ overflowX: "auto" }}>
      <table style={{ borderCollapse: "collapse", width: "100%" }}>
        <thead>
          <tr>
            <th style={thStyle}>ID</th>
            <th style={thStyle}>Typ</th>
            <th style={thStyle}>Osoba</th>
            <th style={thStyle}>Treść</th>
            <th style={thStyle}>Utworzono</th>
          </tr>
        </thead>
        <tbody>
          {documents.map((doc) => (
            <tr key={doc.id}>
              <td style={tdStyle}>{doc.id}</td>
              <td style={tdStyle}>{doc.typeId}</td>
              <td style={tdStyle}>{doc.person}</td>
              <td style={tdStyle}>{doc.message}</td>
              <td style={tdStyle}>{new Date(doc.createdAt).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

// Prosty styl tabeli
const thStyle: React.CSSProperties = {
  border: "1px solid #ddd",
  padding: "8px",
  backgroundColor: "#f2f2f2",
  textAlign: "left",
};

const tdStyle: React.CSSProperties = {
  border: "1px solid #ddd",
  padding: "8px",
};

export default DocumentGrid;
