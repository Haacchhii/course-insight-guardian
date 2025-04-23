
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { mockSentimentData, mockStats } from "@/utils/mockData";
import { useUser } from "@/contexts/UserContext";

const SentimentOverview = () => {
  const { userRole } = useUser();
  
  // Calculate percentages for different sentiment categories
  const totalSentiment = mockSentimentData.reduce((total, item) => total + item.value, 0);
  const sentimentPercentage = (name: string) => {
    const item = mockSentimentData.find(item => item.name === name);
    return item ? Math.round((item.value / totalSentiment) * 100) : 0;
  };

  return (
    <div className="grid gap-4 grid-cols-1 lg:grid-cols-3">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            Sentiment Distribution
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex justify-between text-xs">
              <span className="flex items-center">
                <span className="h-2 w-2 rounded-full bg-green-500 mr-1"></span>
                Positive
              </span>
              <span className="font-medium">{mockStats.positivePercentage}%</span>
            </div>
            <Progress value={mockStats.positivePercentage} className="h-1 bg-gray-100" />
            
            <div className="flex justify-between text-xs">
              <span className="flex items-center">
                <span className="h-2 w-2 rounded-full bg-gray-400 mr-1"></span>
                Neutral
              </span>
              <span className="font-medium">{mockStats.neutralPercentage}%</span>
            </div>
            <Progress value={mockStats.neutralPercentage} className="h-1 bg-gray-100" />
            
            <div className="flex justify-between text-xs">
              <span className="flex items-center">
                <span className="h-2 w-2 rounded-full bg-red-500 mr-1"></span>
                Negative
              </span>
              <span className="font-medium">{mockStats.negativePercentage}%</span>
            </div>
            <Progress value={mockStats.negativePercentage} className="h-1 bg-gray-100" />
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            Detailed Sentiment Breakdown
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex justify-between text-xs">
              <span>Very Positive</span>
              <span className="font-medium">{sentimentPercentage('Very Positive')}%</span>
            </div>
            <Progress value={sentimentPercentage('Very Positive')} className="h-1 bg-gray-100 text-green-600" />
            
            <div className="flex justify-between text-xs">
              <span>Positive</span>
              <span className="font-medium">{sentimentPercentage('Positive')}%</span>
            </div>
            <Progress value={sentimentPercentage('Positive')} className="h-1 bg-gray-100 text-green-400" />
            
            <div className="flex justify-between text-xs">
              <span>Neutral</span>
              <span className="font-medium">{sentimentPercentage('Neutral')}%</span>
            </div>
            <Progress value={sentimentPercentage('Neutral')} className="h-1 bg-gray-100 text-gray-400" />
            
            <div className="flex justify-between text-xs">
              <span>Negative</span>
              <span className="font-medium">{sentimentPercentage('Negative')}%</span>
            </div>
            <Progress value={sentimentPercentage('Negative')} className="h-1 bg-gray-100 text-red-400" />
            
            <div className="flex justify-between text-xs">
              <span>Very Negative</span>
              <span className="font-medium">{sentimentPercentage('Very Negative')}%</span>
            </div>
            <Progress value={sentimentPercentage('Very Negative')} className="h-1 bg-gray-100 text-red-600" />
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            Sentiment Analysis Method
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <p className="text-sm">
              <span className="font-medium">Algorithm:</span> Support Vector Machine (SVM)
            </p>
            <p className="text-sm">
              <span className="font-medium">Features:</span> TF-IDF word vectors
            </p>
            <p className="text-sm">
              <span className="font-medium">Accuracy:</span> 86.5%
            </p>
            <p className="text-sm">
              <span className="font-medium">F1 Score:</span> 0.82
            </p>
            <p className="text-sm mt-3 text-muted-foreground">
              Sentiment analysis is performed using an SVM classifier trained on a corpus of student evaluations, 
              with additional fine-tuning for academic context.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SentimentOverview;
