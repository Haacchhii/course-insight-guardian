
import { useState, useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { mockSentimentData, mockEvaluations } from "@/utils/mockData";
import { useUser } from "@/contexts/UserContext";

const COLORS = ['#2ecc71', '#3498db', '#95a5a6', '#e74c3c', '#c0392b'];

const SentimentChart = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const { userRole, department } = useUser();
  
  // Filter data based on user role
  const filteredSentimentData = useMemo(() => {
    if (userRole === 'admin') {
      return mockSentimentData; // Show all data for admin
    } else if (userRole === 'department_head' && department) {
      // Filter evaluations by department
      const departmentEvals = mockEvaluations.filter(eval_ => eval_.department === department);
      
      // Count sentiments for this department
      const veryPositive = departmentEvals.filter(e => e.sentimentScore > 0.6).length;
      const positive = departmentEvals.filter(e => e.sentimentScore > 0.3 && e.sentimentScore <= 0.6).length;
      const neutral = departmentEvals.filter(e => e.sentimentScore >= -0.3 && e.sentimentScore <= 0.3).length;
      const negative = departmentEvals.filter(e => e.sentimentScore < -0.3 && e.sentimentScore >= -0.6).length;
      const veryNegative = departmentEvals.filter(e => e.sentimentScore < -0.6).length;
      
      // Return department-specific sentiment data
      return [
        { name: 'Very Positive', value: veryPositive },
        { name: 'Positive', value: positive },
        { name: 'Neutral', value: neutral },
        { name: 'Negative', value: negative },
        { name: 'Very Negative', value: veryNegative }
      ];
    }
    
    // Default fallback
    return mockSentimentData;
  }, [userRole, department]);
  
  const onPieEnter = (_: any, index: number) => {
    setActiveIndex(index);
  };
  
  const onPieLeave = () => {
    setActiveIndex(null);
  };

  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }: any) => {
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);
    
    return percent > 0.05 ? (
      <text 
        x={x} 
        y={y} 
        fill="white" 
        textAnchor="middle" 
        dominantBaseline="central"
        className="text-xs"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    ) : null;
  };

  return (
    <Card className="md:col-span-2">
      <CardHeader>
        <CardTitle>Sentiment Analysis</CardTitle>
        <CardDescription>
          {userRole === 'admin' 
            ? 'Breakdown of feedback sentiment across all departments'
            : `Breakdown of feedback sentiment for ${department} department`}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-80 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={filteredSentimentData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={renderCustomizedLabel}
                outerRadius={120}
                fill="#8884d8"
                dataKey="value"
                onMouseEnter={onPieEnter}
                onMouseLeave={onPieLeave}
              >
                {filteredSentimentData.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={COLORS[index % COLORS.length]} 
                    stroke={activeIndex === index ? '#fff' : 'none'}
                    strokeWidth={activeIndex === index ? 2 : 0}
                  />
                ))}
              </Pie>
              <Tooltip 
                formatter={(value: number) => [`${value} evaluations`, 'Count']}
                labelFormatter={(name) => `${name} Sentiment`}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-2 flex flex-wrap justify-center gap-4">
          {filteredSentimentData.map((entry, index) => (
            <div key={index} className="flex items-center gap-2">
              <div 
                className="h-3 w-3 rounded-full" 
                style={{ backgroundColor: COLORS[index % COLORS.length] }} 
              />
              <span className="text-sm">{entry.name}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default SentimentChart;
