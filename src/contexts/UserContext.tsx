
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

type UserRole = 'admin' | 'department_head' | 'student';

interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  department: string | null;
  program?: string; // Added for student role
  courses?: string[]; // Added for student role
  permissions?: string[]; // Added for role-based permissions
}

interface UserContextType {
  user: User | null;
  userRole: UserRole;
  department: string | null;
  setUserRole: (role: UserRole) => void;
  setDepartment: (department: string | null) => void;
  isAdmin: () => boolean;
  isDepartmentHead: () => boolean;
  isStudent: () => boolean;
  hasPermission: (permission: string) => boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
  isLoading: boolean;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

// Define role-based permissions
const rolePermissions = {
  admin: [
    'view_all_departments',
    'manage_departments',
    'view_all_courses',
    'manage_courses',
    'view_all_evaluations',
    'export_data',
    'import_data',
    'manage_users',
    'view_analytics',
    'system_settings',
    'approve_question_sets',
    'create_global_questions',
    'manage_question_banks',
  ],
  department_head: [
    'view_department_courses',
    'manage_department_courses',
    'view_department_evaluations',
    'create_question_sets',
    'manage_own_question_sets',
    'view_department_analytics',
    'manage_department_instructors',
  ],
  student: [
    'view_enrolled_courses',
    'submit_evaluations',
    'view_own_submissions',
  ],
};

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
  const isStudent = () => userRole === 'student';

  // Check if user has a specific permission
  const hasPermission = (permission: string) => {
    if (!userRole) return false;
    return rolePermissions[userRole].includes(permission);
  };

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
      
      // Check if email indicates student role
      let role = userRole;
      let userDepartment = department;
      let program = undefined;
      let courses = undefined;
      let permissions = undefined;

      if (email.includes('student')) {
        role = 'student';
        userDepartment = 'Computer Science';
        program = 'Bachelor of Science in Computer Science';
        courses = ['CS101', 'CS201', 'MATH101', 'ENG101'];
        permissions = rolePermissions.student;
      } else if (email.includes('head')) {
        role = 'department_head';
        userDepartment = userDepartment || 'Computer Science';
        permissions = rolePermissions.department_head;
      } else {
        role = 'admin';
        permissions = rolePermissions.admin;
      }
      
      // Mock successful login after validation
      const newUser: User = {
        id: crypto.randomUUID(),
        email,
        name: email.split('@')[0], // Extract name from email
        role,
        department: userDepartment,
        permissions,
      };
      
      if (role === 'student') {
        newUser.program = program;
        newUser.courses = courses;
      }
      
      // Store user in local storage for session persistence
      localStorage.setItem('lpub_user', JSON.stringify(newUser));
      setUser(newUser);
      setUserRole(role);
      setDepartment(userDepartment);
      
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
      isStudent,
      hasPermission,
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
