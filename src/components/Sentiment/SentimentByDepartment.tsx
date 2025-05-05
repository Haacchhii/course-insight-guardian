
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { mockDepartmentRatings, mockEvaluations } from "@/utils/mockData";
import { useMemo } from "react";

interface SentimentByDepartmentProps {
  semesterFilter: string;
}

const SentimentByDepartment = ({ semesterFilter }: SentimentByDepartmentProps) => {
  const departmentRatings = useMemo(() => {
    if (semesterFilter === "all") {
      return mockDepartmentRatings;
    }
    
    // Split semester and year
    const [semester, year] = semesterFilter.split(' ');
    
    // Filter evaluations by semester and year
    const filteredEvaluations = mockEvaluations.filter(
      evaluation => evaluation.semester === semester && evaluation.year === year
    );
    
    // Group by department and calculate average rating
    const departments = {} as Record<string, { total: number, count: number }>;
    
    filteredEvaluations.forEach(evaluation => {
      if (!departments[evaluation.department]) {
        departments[evaluation.department] = { total: 0, count: 0 };
      }
      departments[evaluation.department].total += evaluation.ratings.overall;
      departments[evaluation.department].count += 1;
    });
    
    // Convert to the format expected by the chart
    return Object.entries(departments).map(([department, { total, count }]) => ({
      department,
      rating: count > 0 ? Number((total / count).toFixed(1)) : 0
    }));
  }, [semesterFilter]);

  return (
    <Card className="col-span-1">
      <CardHeader>
        <CardTitle>Sentiment By Department</CardTitle>
        <CardDescription>
          Comparing average sentiment scores across academic departments
          {semesterFilter !== "all" && ` for ${semesterFilter}`}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-80 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={departmentRatings}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
              layout="vertical"
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" domain={[0, 5]} />
              <YAxis dataKey="department" type="category" width={120} />
              <Tooltip formatter={(value) => [`${value}/5.0`, 'Average Rating']} />
              <Bar dataKey="rating" fill="#3b82f6" barSize={20} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default SentimentByDepartment;
