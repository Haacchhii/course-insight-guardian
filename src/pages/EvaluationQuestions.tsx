
import { useEffect, useState } from "react";
import Navbar from "@/components/Layout/Navbar";
import Sidebar from "@/components/Layout/Sidebar";
import EvaluationQuestionsOverview from "@/components/EvaluationQuestions/EvaluationQuestionsOverview";
import EvaluationQuestionsList from "@/components/EvaluationQuestions/EvaluationQuestionsList";
import CreateQuestionSetModal from "@/components/EvaluationQuestions/CreateQuestionSetModal";
import { useUser } from "@/contexts/UserContext";
import { Button } from "@/components/ui/button";
import { FileText, Plus } from "lucide-react";

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
            
            <EvaluationQuestionsOverview />
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
