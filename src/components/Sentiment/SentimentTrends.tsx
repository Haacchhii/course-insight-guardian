
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { mockRatingTrend } from "@/utils/mockData";
import { useUser } from "@/contexts/UserContext";

const SentimentTrends = () => {
  const { userRole, department } = useUser();
  
  return (
    <Card className="col-span-1">
      <CardHeader>
        <CardTitle>Sentiment Trends Over Time</CardTitle>
        <CardDescription>
          {userRole === 'admin' 
            ? 'Sentiment trends across all departments' 
            : `Sentiment trends for ${department} department`}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-80 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={mockRatingTrend}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis domain={[0, 5]} />
              <Tooltip formatter={(value) => [`${value}/5.0`, 'Average Rating']} />
              <Line
                type="monotone"
                dataKey="rating"
                stroke="#3b82f6"
                activeDot={{ r: 8 }}
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default SentimentTrends;
