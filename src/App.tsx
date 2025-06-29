import { useEffect, useState } from "react";
import type { ClientPrincipal } from './types/ClientPrincipal';

function App() {
  const [user, setUser] = useState<ClientPrincipal | null>(null);

  useEffect(() => {
    fetch("/.auth/me")
      .then(res => res.json())
      .then(data => {
        if (data.length > 0) {
          setUser(data[0].clientPrincipal);
        }
      });
  }, []);

  return (
    <div style={{ padding: "2em" }}>

      {user ? (
        <>
          <p>You are logged in as <strong>{user.userDetails}</strong> via {user.identityProvider}</p>
          <a href="/.auth/logout">Logout</a>
        </>
      ) : (
        <>
          <p>You are not logged in.</p>
          <a href="/.auth/login/github">Login with GitHub</a>
        </>
      )}
    </div>
  );
}

export default App;