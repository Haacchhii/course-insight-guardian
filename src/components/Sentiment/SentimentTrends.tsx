
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Legend } from 'recharts';
import { mockEvaluations } from "@/utils/mockData";
import { useUser } from "@/contexts/UserContext";
import { useMemo, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const EvaluationCriteria = () => {
  const { userRole, department } = useUser();
  const [chartType, setChartType] = useState<'bar' | 'radar'>('bar');
  
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

  // Process data for radar chart
  const radarData = useMemo(() => {
    return [{
      subject: 'Evaluation Criteria',
      'Content Quality': criteriaData[0].value,
      'Delivery Method': criteriaData[1].value,
      'Assessment Fairness': criteriaData[2].value,
      'Support Provided': criteriaData[3].value,
    }];
  }, [criteriaData]);

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
        <Tabs defaultValue="bar" value={chartType} onValueChange={(value) => setChartType(value as 'bar' | 'radar')}>
          <div className="flex justify-between items-center mb-4">
            <TabsList>
              <TabsTrigger value="bar">Bar Chart</TabsTrigger>
              <TabsTrigger value="radar">Radar Chart</TabsTrigger>
            </TabsList>
          </div>
          
          <TabsContent value="bar" className="mt-0">
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
          </TabsContent>
          
          <TabsContent value="radar" className="mt-0">
            <div className="h-80 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart outerRadius={90} width={730} height={250} data={radarData}>
                  <PolarGrid />
                  <PolarAngleAxis dataKey="subject" tick={false} />
                  <PolarRadiusAxis angle={90} domain={[0, 5]} />
                  <Radar 
                    name="Content Quality" 
                    dataKey="Content Quality" 
                    stroke="#4CAF50" 
                    fill="#4CAF50" 
                    fillOpacity={0.6} 
                  />
                  <Radar 
                    name="Delivery Method" 
                    dataKey="Delivery Method" 
                    stroke="#2196F3" 
                    fill="#2196F3" 
                    fillOpacity={0.6} 
                  />
                  <Radar 
                    name="Assessment Fairness" 
                    dataKey="Assessment Fairness" 
                    stroke="#FF9800" 
                    fill="#FF9800" 
                    fillOpacity={0.6} 
                  />
                  <Radar 
                    name="Support Provided" 
                    dataKey="Support Provided" 
                    stroke="#9C27B0" 
                    fill="#9C27B0" 
                    fillOpacity={0.6} 
                  />
                  <Legend />
                  <Tooltip formatter={(value) => [`${value}/5.0`, '']} />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default EvaluationCriteria;
