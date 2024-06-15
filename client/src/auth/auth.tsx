import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { useNavigate, useLocation } from "react-router-dom";

interface AuthContextProps {
  isAuthenticated: boolean;
  userRole: string | null;
  login: (token: string, role: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [userRole, setUserRole] = useState<string | null>(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    const savedPathname = localStorage.getItem("pathname");

    if (token && role) {
      setIsAuthenticated(true);
      setUserRole(role);

      if (savedPathname) {
        navigate(savedPathname);
      } else {
        navigate(role === "admin" ? "/admin/dashboard" : "/user");
      }
    } else {
      navigate("/login");
    }
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      localStorage.setItem("pathname", location.pathname);
    }
  }, [isAuthenticated, location]);

  const login = (token: string, role: string) => {
    localStorage.setItem("token", token);
    localStorage.setItem("role", role);

    setIsAuthenticated(true);
    setUserRole(role);
    navigate(role === "admin" ? "/admin/dashboard" : "/user");
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("pathname");
    setIsAuthenticated(false);
    setUserRole(null);
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, userRole, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextProps => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
