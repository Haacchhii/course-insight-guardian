
import { useEffect, useState } from "react";
import Navbar from "@/components/Layout/Navbar";
import Sidebar from "@/components/Layout/Sidebar";
import EvaluationQuestionsOverview from "@/components/EvaluationQuestions/EvaluationQuestionsOverview";
import EvaluationQuestionsList from "@/components/EvaluationQuestions/EvaluationQuestionsList";
import CreateQuestionSetModal from "@/components/EvaluationQuestions/CreateQuestionSetModal";
import { useUser } from "@/contexts/UserContext";
import { Button } from "@/components/ui/button";
import { Plus, Download, Upload, Settings } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const EvaluationQuestionsPage = () => {
  const { userRole, department } = useUser();
  const [createModalOpen, setCreateModalOpen] = useState(false);

  useEffect(() => {
    document.title = "Evaluation Questions | Course Insight Guardian";
  }, []);

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Navbar />
        <main className="flex-1 p-4 md:p-6 overflow-auto">
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h1 className="text-2xl font-bold">Evaluation Questions</h1>
                <p className="text-muted-foreground">
                  {userRole === 'admin' 
                    ? 'View and manage evaluation questions across all departments' 
                    : `Create and manage evaluation questions for ${department} department`}
                </p>
              </div>
              
              <div className="flex gap-2">
                {/* Admin has import/export functionality */}
                {userRole === 'admin' && (
                  <>
                    <Button variant="outline" className="flex items-center gap-2">
                      <Download className="h-4 w-4" />
                      Export Questions
                    </Button>
                    <Button variant="outline" className="flex items-center gap-2">
                      <Upload className="h-4 w-4" />
                      Import Questions
                    </Button>
                    <Button variant="outline" className="flex items-center gap-2">
                      <Settings className="h-4 w-4" />
                      Question Settings
                    </Button>
                  </>
                )}
                
                {/* Department head can create question sets */}
                {userRole === 'department_head' && (
                  <Button 
                    className="flex items-center gap-2"
                    onClick={() => setCreateModalOpen(true)}
                  >
                    <Plus className="h-4 w-4" />
                    Create Question Set
                  </Button>
                )}
              </div>
            </div>
            
            <EvaluationQuestionsOverview />
            
            {/* Role-specific cards */}
            {userRole === 'admin' && (
              <Card className="mb-6">
                <CardContent className="p-4 flex flex-col gap-2">
                  <h3 className="text-lg font-medium">Administrator Options</h3>
                  <p className="text-sm text-muted-foreground">
                    As an administrator, you can manage evaluation questions across all departments,
                    approve question sets created by department heads, and configure global evaluation settings.
                  </p>
                  <div className="flex flex-wrap gap-2 mt-2">
                    <Button variant="secondary" size="sm" className="flex items-center gap-1">
                      <Settings className="h-3 w-3" />
                      Global Question Templates
                    </Button>
                    <Button variant="secondary" size="sm">Approval Queue</Button>
                    <Button variant="secondary" size="sm">Evaluation Analytics</Button>
                  </div>
                </CardContent>
              </Card>
            )}
            
            {userRole === 'department_head' && (
              <Card className="mb-6">
                <CardContent className="p-4 flex flex-col gap-2">
                  <h3 className="text-lg font-medium">Department Head Tools</h3>
                  <p className="text-sm text-muted-foreground">
                    As a department head for {department}, you can create custom evaluation questions
                    for courses in your department, view responses, and manage question sets.
                  </p>
                  <div className="flex flex-wrap gap-2 mt-2">
                    <Button variant="secondary" size="sm">My Templates</Button>
                    <Button variant="secondary" size="sm">Department Analytics</Button>
                    <Button onClick={() => setCreateModalOpen(true)} variant="secondary" size="sm" className="flex items-center gap-1">
                      <Plus className="h-3 w-3" />
                      New Question Set
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
            
            <EvaluationQuestionsList />
          </div>
        </main>
      </div>

      {userRole === 'department_head' && (
        <CreateQuestionSetModal 
          isOpen={createModalOpen} 
          onClose={() => setCreateModalOpen(false)} 
        />
      )}
    </div>
  );
};

export default EvaluationQuestionsPage;
