
import React, { createContext, useContext, useState, ReactNode } from 'react';

type UserRole = 'admin' | 'department_head';

interface UserContextType {
  userRole: UserRole;
  department: string | null;
  setUserRole: (role: UserRole) => void;
  setDepartment: (department: string | null) => void;
  isAdmin: () => boolean;
  isDepartmentHead: () => boolean;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
  const [userRole, setUserRole] = useState<UserRole>('admin');
  const [department, setDepartment] = useState<string | null>(null);

  const isAdmin = () => userRole === 'admin';
  const isDepartmentHead = () => userRole === 'department_head';

  return (
    <UserContext.Provider value={{ 
      userRole, 
      department, 
      setUserRole, 
      setDepartment,
      isAdmin,
      isDepartmentHead
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
