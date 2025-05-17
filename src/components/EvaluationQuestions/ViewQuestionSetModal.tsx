
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useUser } from "@/contexts/UserContext";
import { 
  BarChart,
  PieChart,
  Pie,
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  Cell, 
  ResponsiveContainer
} from 'recharts';

// Mock data for question responses
const generateMockResponses = () => {
  // Likert scale questions (1-5)
  const likertResponses = [
    { value: 1, count: Math.floor(Math.random() * 30) },
    { value: 2, count: Math.floor(Math.random() * 40) },
    { value: 3, count: Math.floor(Math.random() * 50) },
    { value: 4, count: Math.floor(Math.random() * 60) },
    { value: 5, count: Math.floor(Math.random() * 40) }
  ];
  
  // Multiple choice responses
  const multipleChoiceResponses = [
    { option: "Strongly Agree", count: Math.floor(Math.random() * 50) },
    { option: "Agree", count: Math.floor(Math.random() * 70) },
    { option: "Neutral", count: Math.floor(Math.random() * 40) },
    { option: "Disagree", count: Math.floor(Math.random() * 25) },
    { option: "Strongly Disagree", count: Math.floor(Math.random() * 15) }
  ];

  return {
    likertResponses,
    multipleChoiceResponses
  };
};

// Mock questions for a question set
const mockQuestions = [
  {
    id: 1,
    text: "How would you rate the overall quality of instruction?",
    type: "likert",
    responses: generateMockResponses().likertResponses,
    averageRating: 4.2
  },
  {
    id: 2,
    text: "The course materials were helpful for learning the subject.",
    type: "likert",
    responses: generateMockResponses().likertResponses,
    averageRating: 3.8
  },
  {
    id: 3,
    text: "How satisfied are you with the feedback provided on assignments?",
    type: "likert",
    responses: generateMockResponses().likertResponses,
    averageRating: 3.5
  },
  {
    id: 4,
    text: "Which teaching method was most effective for your learning?",
    type: "multiple-choice",
    options: ["Lectures", "Problem-solving sessions", "Labs", "Group discussions", "Self-study materials"],
    responses: [
      { option: "Lectures", count: 45 },
      { option: "Problem-solving sessions", count: 62 },
      { option: "Labs", count: 28 },
      { option: "Group discussions", count: 18 },
      { option: "Self-study materials", count: 7 }
    ]
  },
  {
    id: 5,
    text: "The instructor was accessible and responsive to student questions.",
    type: "likert",
    responses: generateMockResponses().likertResponses,
    averageRating: 4.5
  }
];

const COLORS = ['#8884d8', '#83a6ed', '#8dd1e1', '#82ca9d', '#a4de6c'];

const ViewQuestionSetModal = ({
  isOpen,
  onClose,
  questionSet
}: {
  isOpen: boolean;
  onClose: () => void;
  questionSet: any;
}) => {
  const { userRole } = useUser();
  
  // Combine the question set data with the mock questions
  const questions = mockQuestions;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-start justify-between">
            <div>
              <DialogTitle className="text-xl">{questionSet.title}</DialogTitle>
              <DialogDescription className="mt-1.5">
                <span className="block text-sm">
                  {questionSet.department} Department | {questionSet.semester}
                </span>
                <span className="block text-sm mt-1">
                  Created: {questionSet.createdAt}
                </span>
              </DialogDescription>
            </div>
            <Badge variant={questionSet.status === 'active' ? 'default' : 'secondary'}>
              {questionSet.status === 'active' ? 'Active' : 'Archived'}
            </Badge>
          </div>
        </DialogHeader>

        <Separator />

        <Tabs defaultValue="questions" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="questions">Questions</TabsTrigger>
            <TabsTrigger value="responses">Response Statistics</TabsTrigger>
          </TabsList>
          
          <TabsContent value="questions" className="space-y-4 py-4">
            <div className="space-y-6">
              {questions.map((question, index) => (
                <div key={question.id} className="space-y-2">
                  <h3 className="font-medium">
                    Question {index + 1}: {question.text}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Type: {question.type === 'likert' ? 'Likert Scale (1-5)' : 'Multiple Choice'}
                  </p>
                  
                  {question.type === 'multiple-choice' && question.options && (
                    <div className="pl-4 space-y-1 mt-1">
                      <p className="text-sm font-medium">Options:</p>
                      {question.options.map((option, optionIndex) => (
                        <p key={optionIndex} className="text-sm">
                          {optionIndex + 1}. {option}
                        </p>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="responses" className="space-y-6 py-4">
            <div className="rounded-lg border p-4">
              <h3 className="font-medium mb-4">Response Summary</h3>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <p className="text-3xl font-bold">{questionSet.responseCount}</p>
                  <p className="text-sm text-muted-foreground">Total Responses</p>
                </div>
                <div>
                  <p className="text-3xl font-bold">
                    {(questions.filter(q => q.type === 'likert').reduce((sum, q) => sum + q.averageRating, 0) / 
                    questions.filter(q => q.type === 'likert').length).toFixed(1)}
                  </p>
                  <p className="text-sm text-muted-foreground">Average Rating</p>
                </div>
                <div>
                  <p className="text-3xl font-bold">{questionSet.questionCount}</p>
                  <p className="text-sm text-muted-foreground">Questions</p>
                </div>
              </div>
            </div>

            {questions.map((question, index) => (
              <div key={question.id} className="space-y-4 rounded-lg border p-4">
                <div>
                  <h3 className="font-medium">
                    Question {index + 1}: {question.text}
                  </h3>
                  {question.type === 'likert' && (
                    <p className="text-sm mt-1">
                      Average Rating: <span className="font-semibold">{question.averageRating.toFixed(1)}/5.0</span>
                    </p>
                  )}
                </div>

                <div className="h-72">
                  <ResponsiveContainer width="100%" height="100%">
                    {question.type === 'likert' ? (
                      <BarChart
                        data={question.responses}
                        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="value" label={{ value: 'Rating', position: 'insideBottom', offset: -5 }} />
                        <YAxis label={{ value: 'Responses', angle: -90, position: 'insideLeft' }} />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="count" name="Responses" fill="#8884d8" />
                      </BarChart>
                    ) : (
                      <PieChart>
                        <Pie
                          data={question.responses}
                          cx="50%"
                          cy="50%"
                          labelLine={true}
                          outerRadius={100}
                          fill="#8884d8"
                          dataKey="count"
                          label={({ option, count, percent }) => `${option}: ${count} (${(percent * 100).toFixed(0)}%)`}
                          nameKey="option"
                        >
                          {question.responses.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Legend />
                        <Tooltip />
                      </PieChart>
                    )}
                  </ResponsiveContainer>
                </div>
                
                <div className="mt-4">
                  <h4 className="text-sm font-medium">Response Breakdown:</h4>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2 mt-2">
                    {question.responses.map((res, idx) => (
                      <div key={idx} className="text-sm border rounded p-2 text-center">
                        <div className="font-medium">
                          {question.type === 'likert' ? `Rating ${res.value}` : res.option}
                        </div>
                        <div className="text-lg font-bold">{res.count}</div>
                        <div className="text-xs text-muted-foreground">
                          {((res.count / question.responses.reduce((sum, r) => sum + r.count, 0)) * 100).toFixed(1)}%
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </TabsContent>
        </Tabs>

        <DialogFooter>
          {userRole === 'department_head' && questionSet.status === 'active' && (
            <Button variant="outline" className="mr-auto">
              Edit Question Set
            </Button>
          )}
          <Button onClick={onClose}>Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ViewQuestionSetModal;
