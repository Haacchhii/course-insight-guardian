
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

type UserRole = 'admin' | 'department_head';

interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  department: string | null;
}

interface UserContextType {
  user: User | null;
  userRole: UserRole;
  department: string | null;
  setUserRole: (role: UserRole) => void;
  setDepartment: (department: string | null) => void;
  isAdmin: () => boolean;
  isDepartmentHead: () => boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
  isLoading: boolean;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [userRole, setUserRole] = useState<UserRole>('admin');
  const [department, setDepartment] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  
  // Check if user is already logged in when app loads
  useEffect(() => {
    const storedUser = localStorage.getItem('lpub_user');
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
        setUserRole(parsedUser.role);
        setDepartment(parsedUser.department);
      } catch (error) {
        console.error('Failed to parse stored user data:', error);
        localStorage.removeItem('lpub_user');
      }
    }
    setIsLoading(false);
  }, []);

  const isAdmin = () => userRole === 'admin';
  const isDepartmentHead = () => userRole === 'department_head';

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    
    // Mock authentication - in a real app, this would call an API
    try {
      // For demonstration purposes - verify credentials
      if (!email || !password) {
        throw new Error('Email and password are required');
      }
      
      if (password.length < 6) {
        throw new Error('Password must be at least 6 characters');
      }
      
      // Mock successful login after validation
      // In a real app, you would verify credentials against a backend
      const newUser: User = {
        id: crypto.randomUUID(),
        email,
        name: email.split('@')[0], // Extract name from email
        role: userRole,
        department,
      };
      
      // Store user in local storage for session persistence
      localStorage.setItem('lpub_user', JSON.stringify(newUser));
      setUser(newUser);
      
      setIsLoading(false);
      return true;
    } catch (error) {
      console.error('Login failed:', error);
      setIsLoading(false);
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem('lpub_user');
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ 
      user,
      userRole, 
      department, 
      setUserRole, 
      setDepartment,
      isAdmin,
      isDepartmentHead,
      login,
      logout,
      isAuthenticated: !!user,
      isLoading
    }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}
