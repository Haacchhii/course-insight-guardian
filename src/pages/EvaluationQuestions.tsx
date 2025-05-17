
import { useEffect } from "react";
import Navbar from "@/components/Layout/Navbar";
import Sidebar from "@/components/Layout/Sidebar";
import EvaluationQuestionsOverview from "@/components/EvaluationQuestions/EvaluationQuestionsOverview";
import EvaluationQuestionsList from "@/components/EvaluationQuestions/EvaluationQuestionsList";
import { useUser } from "@/contexts/UserContext";

const EvaluationQuestionsPage = () => {
  const { userRole, department } = useUser();

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
            <div>
              <h1 className="text-2xl font-bold">Evaluation Questions</h1>
              <p className="text-muted-foreground">
                {userRole === 'admin' 
                  ? 'View and manage evaluation questions across all departments' 
                  : `Create and manage evaluation questions for ${department} department`}
              </p>
            </div>
            
            <EvaluationQuestionsOverview />
            <EvaluationQuestionsList />
          </div>
        </main>
      </div>
    </div>
  );
};

export default EvaluationQuestionsPage;
