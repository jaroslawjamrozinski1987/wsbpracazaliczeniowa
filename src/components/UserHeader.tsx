import React from "react";
import { useUser } from "../context/UserContext";

const UserHeader: React.FC = () => {
  const { user, loading } = useUser();

  if (loading) {
    return (
      <header style={{ padding: "1rem", background: "#f5f5f5" }}>
        <h2>Ładowanie danych użytkownika...</h2>
      </header>
    );
  }

  return (
    <header style={{ padding: "1rem", background: "#f5f5f5" }}>
      <h2>Witaj, {user?.userDetails ?? "Gościu"}!</h2>
    </header>
  );
};

export default UserHeader;