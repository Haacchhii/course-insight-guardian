
import React from 'react';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { UserProvider, useUser } from "./contexts/UserContext";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import SentimentAnalysis from "./pages/SentimentAnalysis";
import AnomalyDetectionPage from "./pages/AnomalyDetection";
import CoursesPage from "./pages/Courses";

import EvaluationsPage from "./pages/Evaluations";
import EvaluationQuestionsPage from "./pages/EvaluationQuestions";
import StudentEvaluationPage from "./pages/StudentEvaluation";
import NotFound from "./pages/NotFound";

// Create a client
const queryClient = new QueryClient();

// Protected Route Component
function ProtectedRoute({ children, allowedRoles = ["admin", "department_head"] }) {
  const { isAuthenticated, isLoading, userRole } = useUser();
  const location = useLocation();
  
  // Show loading state while checking authentication
  if (isLoading) {
    return <div className="flex items-center justify-center h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-university-700"></div>
    </div>;
  }
  
  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }
  
  // Check if user has permission to access the route
  if (!allowedRoles.includes(userRole)) {
    // Redirect students to their evaluation page
    if (userRole === 'student') {
      return <Navigate to="/student-evaluation" replace />;
    }
    // Redirect others to dashboard
    return <Navigate to="/dashboard" replace />;
  }
  
  // Show children if authenticated and authorized
  return <>{children}</>;
}

// Student Route component
function StudentRoute({ children }) {
  const { isAuthenticated, isLoading, userRole } = useUser();
  const location = useLocation();
  
  // Show loading state while checking authentication
  if (isLoading) {
    return <div className="flex items-center justify-center h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-university-700"></div>
    </div>;
  }
  
  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }
  
  // Redirect to dashboard if not a student
  if (userRole !== 'student') {
    return <Navigate to="/dashboard" replace />;
  }
  
  // Show children if authenticated and is a student
  return <>{children}</>;
}

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<Index />} />
    <Route path="/dashboard" element={
      <ProtectedRoute>
        <Dashboard />
      </ProtectedRoute>
    } />
    <Route path="/sentiment" element={
      <ProtectedRoute>
        <SentimentAnalysis />
      </ProtectedRoute>
    } />
    <Route path="/anomalies" element={
      <ProtectedRoute>
        <AnomalyDetectionPage />
      </ProtectedRoute>
    } />
    <Route path="/courses" element={
      <ProtectedRoute>
        <CoursesPage />
      </ProtectedRoute>
    } />
    <Route path="/evaluations" element={
      <ProtectedRoute>
        <EvaluationsPage />
      </ProtectedRoute>
    } />
    <Route path="/evaluation-questions" element={
      <ProtectedRoute>
        <EvaluationQuestionsPage />
      </ProtectedRoute>
    } />
    <Route path="/student-evaluation" element={
      <StudentRoute>
        <StudentEvaluationPage />
      </StudentRoute>
    } />
    {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
    <Route path="*" element={<NotFound />} />
  </Routes>
);

const App = () => (
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <UserProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <AppRoutes />
          </BrowserRouter>
        </UserProvider>
      </TooltipProvider>
    </QueryClientProvider>
  </React.StrictMode>
);

export default App;
