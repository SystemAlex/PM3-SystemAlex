import { createContext, useState, useContext, useEffect } from "react";

export const UserContext = createContext({
  user: {},
  userAppointments: [],
  setUser: () => {},
  setUserAppointments: () => {},
});

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const [userAppointments, setUserAppointments] = useState([]);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        userAppointments,
        setUserAppointments,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser debe ser usado dentro de un UserProvider");
  }
  return context;
};
