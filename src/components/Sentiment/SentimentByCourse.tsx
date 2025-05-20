
import { useState, useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';
import { mockEvaluations } from "@/utils/mockData";
import { useUser } from "@/contexts/UserContext";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface SentimentByCourseProps {
  semesterFilter: string;
}

const SentimentByCourse = ({ semesterFilter }: SentimentByCourseProps) => {
  const { department } = useUser();
  const [selectedView, setSelectedView] = useState<'sentiment' | 'rating'>('sentiment');
  const [chartType, setChartType] = useState<'bar' | 'radar'>('bar');
  
  // Get courses for this department
  const departmentCourses = useMemo(() => {
    let filteredEvaluations = mockEvaluations.filter(eval_ => eval_.department === department);
    
    // Apply semester filter if not "all"
    if (semesterFilter !== "all") {
      const [semester, year] = semesterFilter.split(' ');
      const numYear = parseInt(year);
      filteredEvaluations = filteredEvaluations.filter(
        evaluation => evaluation.semester === semester && evaluation.year === numYear
      );
    }
    
    // Get unique courses
    return Array.from(new Set(filteredEvaluations.map(eval_ => eval_.course)));
  }, [department, semesterFilter]);
  
  // Prepare data for the charts
  const chartData = useMemo(() => {
    let filteredEvaluations = mockEvaluations.filter(eval_ => eval_.department === department);
    
    // Apply semester filter if not "all"
    if (semesterFilter !== "all") {
      const [semester, year] = semesterFilter.split(' ');
      const numYear = parseInt(year);
      filteredEvaluations = filteredEvaluations.filter(
        evaluation => evaluation.semester === semester && evaluation.year === numYear
      );
    }
    
    // Create data structure for the chart based on selected view
    if (selectedView === 'sentiment') {
      return departmentCourses.map(course => {
        const courseEvals = filteredEvaluations.filter(eval_ => eval_.course === course);
        
        // Count sentiments for this course
        const veryPositive = courseEvals.filter(e => e.sentimentScore > 0.6).length;
        const positive = courseEvals.filter(e => e.sentimentScore > 0.3 && e.sentimentScore <= 0.6).length;
        const neutral = courseEvals.filter(e => e.sentimentScore >= -0.3 && e.sentimentScore <= 0.3).length;
        const negative = courseEvals.filter(e => e.sentimentScore < -0.3 && e.sentimentScore >= -0.6).length;
        const veryNegative = courseEvals.filter(e => e.sentimentScore < -0.6).length;
        
        return {
          course: course,
          'Very Positive': veryPositive,
          'Positive': positive,
          'Neutral': neutral,
          'Negative': negative,
          'Very Negative': veryNegative,
          fullName: `${course}`,
        };
      });
    } else {
      // For ratings view
      return departmentCourses.map(course => {
        const courseEvals = filteredEvaluations.filter(eval_ => eval_.course === course);
        
        // Calculate average ratings for this course
        const contentSum = courseEvals.reduce((sum, eval_) => sum + eval_.ratings.content, 0);
        const deliverySum = courseEvals.reduce((sum, eval_) => sum + eval_.ratings.delivery, 0);
        const assessmentSum = courseEvals.reduce((sum, eval_) => sum + eval_.ratings.assessment, 0);
        const supportSum = courseEvals.reduce((sum, eval_) => sum + eval_.ratings.support, 0);
        
        const count = courseEvals.length || 1; // Avoid division by zero
        
        return {
          course: course,
          'Content': parseFloat((contentSum / count).toFixed(1)),
          'Delivery': parseFloat((deliverySum / count).toFixed(1)),
          'Assessment': parseFloat((assessmentSum / count).toFixed(1)),
          'Support': parseFloat((supportSum / count).toFixed(1)),
          fullName: `${course}`,
        };
      });
    }
  }, [department, semesterFilter, selectedView, departmentCourses]);
  
  // Colors for different types of data
  const sentimentColors = {
    'Very Positive': '#2ecc71',
    'Positive': '#3498db',
    'Neutral': '#95a5a6',
    'Negative': '#e74c3c',
    'Very Negative': '#c0392b'
  };
  
  const ratingColors = {
    'Content': '#4CAF50',
    'Delivery': '#2196F3',
    'Assessment': '#FF9800',
    'Support': '#9C27B0'
  };
  
  // Get the appropriate keys and colors based on the selected view
  const dataKeys = useMemo(() => {
    if (selectedView === 'sentiment') {
      return ['Very Positive', 'Positive', 'Neutral', 'Negative', 'Very Negative'];
    } else {
      return ['Content', 'Delivery', 'Assessment', 'Support'];
    }
  }, [selectedView]);
  
  const colors = useMemo(() => {
    if (selectedView === 'sentiment') {
      return sentimentColors;
    } else {
      return ratingColors;
    }
  }, [selectedView]);

  // Prepare radar chart data
  const radarData = useMemo(() => {
    if (selectedView === 'rating') {
      return chartData;
    } else {
      // For sentiment view, transform the data to be suitable for radar
      return departmentCourses.map(course => {
        const courseData = chartData.find(item => item.course === course) || { course };
        return {
          subject: course,
          'Very Positive': courseData['Very Positive'] || 0,
          'Positive': courseData['Positive'] || 0, 
          'Neutral': courseData['Neutral'] || 0,
          'Negative': courseData['Negative'] || 0,
          'Very Negative': courseData['Very Negative'] || 0,
        };
      });
    }
  }, [chartData, departmentCourses, selectedView]);

  return (
    <Card className="col-span-1">
      <CardHeader>
        <CardTitle>Course Analysis</CardTitle>
        <CardDescription>
          {selectedView === 'sentiment' 
            ? 'Sentiment distribution by course' 
            : 'Rating breakdown by course'}
          {semesterFilter !== "all" && ` for ${semesterFilter}`}
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
            <div className="h-96 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={chartData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 80 }}
                  layout="vertical"
                  barGap={0}
                  barCategoryGap="20%"
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" />
                  <YAxis 
                    dataKey="course" 
                    type="category" 
                    width={150}
                    tick={{ fontSize: 12 }}
                  />
                  <Tooltip formatter={(value) => [`${value}`, '']} labelFormatter={(label) => `Course: ${label}`} />
                  <Legend wrapperStyle={{ bottom: -10 }} />
                  {dataKeys.map((key) => (
                    <Bar 
                      key={key} 
                      dataKey={key} 
                      stackId="a" 
                      fill={colors[key as keyof typeof colors]} 
                      name={key} 
                    />
                  ))}
                </BarChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>
          
          <TabsContent value="radar" className="mt-0">
            <div className="h-96 w-full">
              <ResponsiveContainer width="100%" height="100%">
                {selectedView === 'rating' ? (
                  <RadarChart outerRadius={90} width={730} height={350} data={chartData}>
                    <PolarGrid />
                    <PolarAngleAxis dataKey="course" />
                    <PolarRadiusAxis angle={30} domain={[0, 5]} />
                    {dataKeys.map((key) => (
                      <Radar
                        key={key}
                        name={key}
                        dataKey={key}
                        stroke={colors[key as keyof typeof colors]}
                        fill={colors[key as keyof typeof colors]}
                        fillOpacity={0.6}
                      />
                    ))}
                    <Legend />
                    <Tooltip />
                  </RadarChart>
                ) : (
                  <RadarChart outerRadius={90} width={730} height={350} data={departmentCourses.map(course => {
                    const data = chartData.find(item => item.course === course);
                    return {
                      subject: course,
                      'Very Positive': data?.['Very Positive'] || 0,
                      'Positive': data?.['Positive'] || 0,
                      'Neutral': data?.['Neutral'] || 0,
                      'Negative': data?.['Negative'] || 0,
                      'Very Negative': data?.['Very Negative'] || 0
                    };
                  })}>
                    <PolarGrid />
                    <PolarAngleAxis dataKey="subject" />
                    <PolarRadiusAxis />
                    {dataKeys.map((key) => (
                      <Radar
                        key={key}
                        name={key}
                        dataKey={key}
                        stroke={colors[key as keyof typeof colors]}
                        fill={colors[key as keyof typeof colors]}
                        fillOpacity={0.6}
                      />
                    ))}
                    <Legend />
                    <Tooltip />
                  </RadarChart>
                )}
              </ResponsiveContainer>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter className="flex justify-center space-x-2">
        <Button
          variant={selectedView === 'sentiment' ? 'default' : 'outline'}
          onClick={() => setSelectedView('sentiment')}
        >
          Sentiment View
        </Button>
        <Button
          variant={selectedView === 'rating' ? 'default' : 'outline'}
          onClick={() => setSelectedView('rating')}
        >
          Rating View
        </Button>
      </CardFooter>
    </Card>
  );
};

export default SentimentByCourse;
