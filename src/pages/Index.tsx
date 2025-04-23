
import { useEffect } from "react";
import LoginForm from "@/components/Auth/LoginForm";

const Index = () => {
  useEffect(() => {
    document.title = "Course Insight Guardian | LPUB";
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <div className="w-full max-w-4xl px-4">
        <div className="flex flex-col md:flex-row gap-8 items-center">
          <div className="md:w-1/2 text-center md:text-left">
            <div className="mb-6">
              <h1 className="text-4xl font-bold mb-2 text-university-800">Course Insight Guardian</h1>
              <p className="text-lg text-gray-600">
                Enhanced Sentiment Analysis and Anomaly Detection for Student Course Evaluations
              </p>
            </div>
            <div className="space-y-4">
              <div className="p-4 bg-white rounded-lg shadow-sm border border-gray-200">
                <h2 className="text-university-700 font-semibold mb-1">SVM Sentiment Analysis</h2>
                <p className="text-sm text-gray-600">
                  Accurately classify sentiments from structured Likert-scale responses for comprehensive insights.
                </p>
              </div>
              <div className="p-4 bg-white rounded-lg shadow-sm border border-gray-200">
                <h2 className="text-university-700 font-semibold mb-1">DBSCAN Anomaly Detection</h2>
                <p className="text-sm text-gray-600">
                  Automatically identify unusual feedback patterns requiring attention from faculty and administrators.
                </p>
              </div>
            </div>
          </div>
          <div className="md:w-1/2">
            <LoginForm />
          </div>
        </div>
        <div className="text-center mt-8">
          <p className="text-sm text-gray-500">
            Lyceum of the Philippines University-Batangas<br />
            College of Computing, Arts, and Sciences
          </p>
        </div>
      </div>
    </div>
  );
};

export default Index;
