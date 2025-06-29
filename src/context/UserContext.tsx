import React, { createContext, useContext, useEffect, useState } from "react";
import type { ReactNode } from "react";
import type { ClientPrincipal } from "../types/ClientPrincipal";

type UserContextType = {
  user: ClientPrincipal | null;
  loading: boolean;
};

const UserContext = createContext<UserContextType>({
  user: null,
  loading: true,
});

export const useUser = () => useContext(UserContext);

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<ClientPrincipal | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch("/.auth/me");
        const data = await res.json();
        if(data){
            if (Array.isArray(data) && data.length > 0 && data[0].clientPrincipal) {
                setUser(data[0].clientPrincipal as ClientPrincipal);
            }
            else if(data.clientPrincipal) {
                setUser(data.clientPrincipal as ClientPrincipal);
            }
        }
      } catch (error) {
        console.error("Failed to fetch user info:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  return (
    <UserContext.Provider value={{ user, loading }}>
      {children}
    </UserContext.Provider>
  );
};