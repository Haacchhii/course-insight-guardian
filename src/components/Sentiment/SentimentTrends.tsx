
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { mockEvaluations } from "@/utils/mockData";
import { useUser } from "@/contexts/UserContext";
import { useMemo } from "react";

const EvaluationCriteria = () => {
  const { userRole, department } = useUser();
  
  const criteriaData = useMemo(() => {
    // Filter evaluations based on user role
    const filteredEvaluations = userRole === 'admin'
      ? mockEvaluations
      : mockEvaluations.filter(eval_ => eval_.department === department);
    
    // Calculate average ratings for each criteria
    const totalEvals = filteredEvaluations.length || 1; // Avoid division by zero
    const content = filteredEvaluations.reduce((sum, eval_) => sum + eval_.ratings.content, 0) / totalEvals;
    const delivery = filteredEvaluations.reduce((sum, eval_) => sum + eval_.ratings.delivery, 0) / totalEvals;
    const assessment = filteredEvaluations.reduce((sum, eval_) => sum + eval_.ratings.assessment, 0) / totalEvals;
    const support = filteredEvaluations.reduce((sum, eval_) => sum + eval_.ratings.support, 0) / totalEvals;
    
    return [
      { name: 'Content Quality', value: parseFloat(content.toFixed(2)) },
      { name: 'Delivery Method', value: parseFloat(delivery.toFixed(2)) },
      { name: 'Assessment Fairness', value: parseFloat(assessment.toFixed(2)) },
      { name: 'Support Provided', value: parseFloat(support.toFixed(2)) },
    ];
  }, [userRole, department]);

  return (
    <Card className="col-span-1">
      <CardHeader>
        <CardTitle>Evaluation Criteria Ratings</CardTitle>
        <CardDescription>
          {userRole === 'admin' 
            ? 'Average criteria ratings across all departments' 
            : `Average criteria ratings for ${department} department`}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-80 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={criteriaData}
              layout="vertical"
              margin={{
                top: 5,
                right: 30,
                left: 80,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" domain={[0, 5]} />
              <YAxis dataKey="name" type="category" width={100} />
              <Tooltip formatter={(value) => [`${value}/5.0`, 'Rating']} />
              <Bar
                dataKey="value"
                fill="#3b82f6"
                radius={[0, 4, 4, 0]}
                barSize={20}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default EvaluationCriteria;
