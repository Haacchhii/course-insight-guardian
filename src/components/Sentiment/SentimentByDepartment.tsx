
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { mockDepartmentRatings } from "@/utils/mockData";

const SentimentByDepartment = () => {
  return (
    <Card className="col-span-1">
      <CardHeader>
        <CardTitle>Sentiment By Department</CardTitle>
        <CardDescription>
          Comparing average sentiment scores across academic departments
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-80 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={mockDepartmentRatings}
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
