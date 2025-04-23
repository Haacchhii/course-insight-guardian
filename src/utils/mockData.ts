
export interface CourseEvaluation {
  id: string;
  course: string;
  instructor: string;
  department: string;
  semester: string;
  year: number;
  ratings: {
    content: number;
    delivery: number;
    assessment: number;
    support: number;
    overall: number;
  };
  comments: string;
  sentimentScore: number;
  isAnomaly: boolean;
}

export interface OverviewStats {
  totalEvaluations: number;
  averageRating: number;
  positivePercentage: number;
  neutralPercentage: number;
  negativePercentage: number;
  anomalyCount: number;
}

export const mockEvaluations: CourseEvaluation[] = [
  {
    id: "1",
    course: "CS101 - Introduction to Programming",
    instructor: "Dr. Santos",
    department: "Computer Science",
    semester: "First",
    year: 2023,
    ratings: {
      content: 4.5,
      delivery: 4.8,
      assessment: 4.6,
      support: 4.7,
      overall: 4.7,
    },
    comments: "Excellent professor who explains concepts clearly and provides great examples.",
    sentimentScore: 0.8,
    isAnomaly: false,
  },
  {
    id: "2",
    course: "CS202 - Data Structures",
    instructor: "Prof. Garcia",
    department: "Computer Science",
    semester: "Second",
    year: 2023,
    ratings: {
      content: 3.2,
      delivery: 2.9,
      assessment: 3.5,
      support: 2.8,
      overall: 3.1,
    },
    comments: "The course material was difficult to follow. More examples would help.",
    sentimentScore: -0.2,
    isAnomaly: false,
  },
  {
    id: "3",
    course: "CS350 - Artificial Intelligence",
    instructor: "Dr. Reyes",
    department: "Computer Science",
    semester: "First",
    year: 2023,
    ratings: {
      content: 4.9,
      delivery: 4.7,
      assessment: 4.8,
      support: 4.9,
      overall: 4.8,
    },
    comments: "One of the best courses I've taken. The professor is knowledgeable and passionate.",
    sentimentScore: 0.9,
    isAnomaly: false,
  },
  {
    id: "4",
    course: "CS415 - Machine Learning",
    instructor: "Dr. Luna",
    department: "Computer Science",
    semester: "Second",
    year: 2023,
    ratings: {
      content: 1.2,
      delivery: 1.5,
      assessment: 1.3,
      support: 1.1,
      overall: 1.3,
    },
    comments: "The instructor never responds to emails and the course materials are outdated. Very disappointed!",
    sentimentScore: -0.9,
    isAnomaly: true,
  },
  {
    id: "5",
    course: "CS301 - Database Systems",
    instructor: "Prof. Mendoza",
    department: "Computer Science",
    semester: "First",
    year: 2023,
    ratings: {
      content: 4.1,
      delivery: 3.9,
      assessment: 4.0,
      support: 4.2,
      overall: 4.0,
    },
    comments: "Good course with practical assignments. The professor is helpful during office hours.",
    sentimentScore: 0.6,
    isAnomaly: false,
  },
  {
    id: "6",
    course: "CS405 - Computer Networks",
    instructor: "Dr. Tan",
    department: "Computer Science",
    semester: "Second",
    year: 2023,
    ratings: {
      content: 3.7,
      delivery: 3.8,
      assessment: 3.9,
      support: 3.6,
      overall: 3.8,
    },
    comments: "The course covers important topics, but the pace is sometimes too fast.",
    sentimentScore: 0.2,
    isAnomaly: false,
  },
  {
    id: "7",
    course: "CS490 - Software Engineering",
    instructor: "Prof. Bautista",
    department: "Computer Science",
    semester: "First",
    year: 2023,
    ratings: {
      content: 0.9,
      delivery: 1.0,
      assessment: 4.5,
      support: 1.2,
      overall: 1.9,
    },
    comments: "The grading is extremely unfair and inconsistent! The professor doesn't explain requirements clearly and penalizes students harshly.",
    sentimentScore: -0.8,
    isAnomaly: true,
  },
];

export const mockStats: OverviewStats = {
  totalEvaluations: 152,
  averageRating: 3.8,
  positivePercentage: 68,
  neutralPercentage: 22,
  negativePercentage: 10,
  anomalyCount: 7,
};

export const mockSentimentData = [
  { name: 'Very Positive', value: 42 },
  { name: 'Positive', value: 26 },
  { name: 'Neutral', value: 22 },
  { name: 'Negative', value: 8 },
  { name: 'Very Negative', value: 2 },
];

export const mockRatingTrend = [
  { month: 'Jan', rating: 3.6 },
  { month: 'Feb', rating: 3.7 },
  { month: 'Mar', rating: 3.8 },
  { month: 'Apr', rating: 3.9 },
  { month: 'May', rating: 4.1 },
  { month: 'Jun', rating: 4.0 },
];

export const mockDepartmentRatings = [
  { department: 'Computer Science', rating: 4.2 },
  { department: 'Mathematics', rating: 3.9 },
  { department: 'Engineering', rating: 4.0 },
  { department: 'Business', rating: 3.7 },
  { department: 'Humanities', rating: 4.1 },
];
