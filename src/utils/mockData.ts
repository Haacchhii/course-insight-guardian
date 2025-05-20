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

export interface Department {
  id: string;
  name: string;
  code: string;
  description: string;
  headName: string;
  totalCourses: number;
  totalInstructors: number;
  averageRating: number;
}

export interface Instructor {
  id: string;
  name: string;
  title: string;
  department: string;
  email: string;
  courses: string[];
  averageRating: number;
  topSkills: string[];
  improvementAreas: string[];
}

export interface Course {
  id: string;
  code: string;
  title: string;
  department: string;
  credits: number;
  description: string;
  instructors: string[];
  averageRating: number;
  totalEvaluations: number;
  status: "active" | "inactive" | "pending";
  semester: string; // Adding the missing semester property
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
  {
    id: "8",
    course: "MA101 - Calculus I",
    instructor: "Dr. Morales",
    department: "Mathematics",
    semester: "First",
    year: 2023,
    ratings: {
      content: 4.3,
      delivery: 4.1,
      assessment: 4.2,
      support: 4.0,
      overall: 4.2,
    },
    comments: "The professor makes calculus approachable and interesting. The practice problems are very helpful.",
    sentimentScore: 0.7,
    isAnomaly: false,
  },
  {
    id: "9",
    course: "MA202 - Linear Algebra",
    instructor: "Prof. Lim",
    department: "Mathematics",
    semester: "Second",
    year: 2023,
    ratings: {
      content: 4.5,
      delivery: 4.3,
      assessment: 4.4,
      support: 4.5,
      overall: 4.4,
    },
    comments: "Excellent teaching method. The concepts were explained clearly with practical examples.",
    sentimentScore: 0.8,
    isAnomaly: false,
  },
  {
    id: "10",
    course: "MA305 - Statistics",
    instructor: "Dr. Cruz",
    department: "Mathematics",
    semester: "First",
    year: 2023,
    ratings: {
      content: 1.8,
      delivery: 1.5,
      assessment: 1.9,
      support: 1.7,
      overall: 1.7,
    },
    comments: "The course was disorganized and the instructor was often late. Assignments didn't match what was taught in class.",
    sentimentScore: -0.7,
    isAnomaly: true,
  },
  {
    id: "11",
    course: "EN101 - Introduction to Engineering",
    instructor: "Prof. Villanueva",
    department: "Engineering",
    semester: "First",
    year: 2023,
    ratings: {
      content: 4.2,
      delivery: 4.0,
      assessment: 4.1,
      support: 4.3,
      overall: 4.1,
    },
    comments: "Great introduction to the field of engineering. The practical projects were engaging.",
    sentimentScore: 0.6,
    isAnomaly: false,
  },
  {
    id: "12",
    course: "BA101 - Principles of Management",
    instructor: "Dr. Aquino",
    department: "Business",
    semester: "First",
    year: 2023,
    ratings: {
      content: 3.9,
      delivery: 4.1,
      assessment: 3.8,
      support: 4.0,
      overall: 4.0,
    },
    comments: "The case studies were relevant and helped apply theoretical concepts to real-world scenarios.",
    sentimentScore: 0.5,
    isAnomaly: false,
  },
  {
    id: "13",
    course: "HU101 - Introduction to Philosophy",
    instructor: "Prof. Ramirez",
    department: "Humanities",
    semester: "First",
    year: 2023,
    ratings: {
      content: 4.6,
      delivery: 4.8,
      assessment: 4.3,
      support: 4.5,
      overall: 4.6,
    },
    comments: "Thought-provoking discussions that challenged our perspectives. One of the best courses in the program.",
    sentimentScore: 0.9,
    isAnomaly: false,
  },
  {
    id: "14",
    course: "HU202 - World Literature",
    instructor: "Dr. Santos",
    department: "Humanities",
    semester: "Second",
    year: 2023,
    ratings: {
      content: 1.1,
      delivery: 1.3,
      assessment: 1.0,
      support: 1.2,
      overall: 1.2,
    },
    comments: "The instructor seems completely uninterested in teaching. Readings were excessive and feedback on assignments was minimal or non-existent.",
    sentimentScore: -0.9,
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

export const mockDepartments: Department[] = [
  {
    id: "1",
    name: "Computer Science",
    code: "CS",
    description: "Department focused on computer science theory and applications",
    headName: "Dr. Eduardo Reyes",
    totalCourses: 15,
    totalInstructors: 8,
    averageRating: 4.2
  },
  {
    id: "2",
    name: "Mathematics",
    code: "MA",
    description: "Department covering pure and applied mathematics",
    headName: "Dr. Maria Lim",
    totalCourses: 12,
    totalInstructors: 7,
    averageRating: 3.9
  },
  {
    id: "3",
    name: "Engineering",
    code: "EN",
    description: "Department for various engineering disciplines",
    headName: "Dr. Jose Villanueva",
    totalCourses: 18,
    totalInstructors: 12,
    averageRating: 4.0
  },
  {
    id: "4",
    name: "Business",
    code: "BA",
    description: "Department focused on business administration and management",
    headName: "Dr. Sofia Aquino",
    totalCourses: 14,
    totalInstructors: 9,
    averageRating: 3.7
  },
  {
    id: "5",
    name: "Humanities",
    code: "HU",
    description: "Department covering philosophy, literature, and cultural studies",
    headName: "Dr. Antonio Ramirez",
    totalCourses: 16,
    totalInstructors: 10,
    averageRating: 4.1
  }
];

export const mockInstructors: Instructor[] = [
  {
    id: "1",
    name: "Dr. Santos",
    title: "Associate Professor",
    department: "Computer Science",
    email: "santos@lpub.edu.ph",
    courses: ["CS101 - Introduction to Programming", "HU202 - World Literature"],
    averageRating: 3.0,
    topSkills: ["Clear explanations", "Engaging lectures", "Practical examples"],
    improvementAreas: ["Timely feedback", "Consistency across courses"]
  },
  {
    id: "2",
    name: "Prof. Garcia",
    title: "Assistant Professor",
    department: "Computer Science",
    email: "garcia@lpub.edu.ph",
    courses: ["CS202 - Data Structures"],
    averageRating: 3.1,
    topSkills: ["Technical knowledge", "Fair grading"],
    improvementAreas: ["Clarity in explanations", "More examples"]
  },
  {
    id: "3",
    name: "Dr. Reyes",
    title: "Professor",
    department: "Computer Science",
    email: "reyes@lpub.edu.ph",
    courses: ["CS350 - Artificial Intelligence"],
    averageRating: 4.8,
    topSkills: ["Subject expertise", "Engaging teaching style", "Accessibility"],
    improvementAreas: []
  },
  {
    id: "4",
    name: "Dr. Luna",
    title: "Assistant Professor",
    department: "Computer Science",
    email: "luna@lpub.edu.ph",
    courses: ["CS415 - Machine Learning"],
    averageRating: 1.3,
    topSkills: [],
    improvementAreas: ["Responsiveness", "Updated materials", "Teaching methods"]
  },
  {
    id: "5",
    name: "Prof. Mendoza",
    title: "Associate Professor",
    department: "Computer Science",
    email: "mendoza@lpub.edu.ph",
    courses: ["CS301 - Database Systems"],
    averageRating: 4.0,
    topSkills: ["Practical assignments", "Office hours support"],
    improvementAreas: ["Lecture delivery"]
  },
  {
    id: "6",
    name: "Dr. Tan",
    title: "Professor",
    department: "Computer Science",
    email: "tan@lpub.edu.ph",
    courses: ["CS405 - Computer Networks"],
    averageRating: 3.8,
    topSkills: ["Comprehensive coverage", "Industry relevance"],
    improvementAreas: ["Pacing of lectures"]
  },
  {
    id: "7",
    name: "Prof. Bautista",
    title: "Assistant Professor",
    department: "Computer Science",
    email: "bautista@lpub.edu.ph",
    courses: ["CS490 - Software Engineering"],
    averageRating: 1.9,
    topSkills: [],
    improvementAreas: ["Fair grading", "Clear requirements", "Student support"]
  },
  {
    id: "8",
    name: "Dr. Morales",
    title: "Associate Professor",
    department: "Mathematics",
    email: "morales@lpub.edu.ph",
    courses: ["MA101 - Calculus I"],
    averageRating: 4.2,
    topSkills: ["Approachable teaching", "Helpful practice problems"],
    improvementAreas: []
  },
  {
    id: "9",
    name: "Prof. Lim",
    title: "Professor",
    department: "Mathematics",
    email: "lim@lpub.edu.ph",
    courses: ["MA202 - Linear Algebra"],
    averageRating: 4.4,
    topSkills: ["Clear explanations", "Practical examples"],
    improvementAreas: []
  },
  {
    id: "10",
    name: "Dr. Cruz",
    title: "Assistant Professor",
    department: "Mathematics",
    email: "cruz@lpub.edu.ph",
    courses: ["MA305 - Statistics"],
    averageRating: 1.7,
    topSkills: [],
    improvementAreas: ["Organization", "Punctuality", "Alignment of teaching and assessment"]
  }
];

export const mockCourses: Course[] = [
  {
    id: "1",
    code: "CS101",
    title: "Introduction to Programming",
    department: "Computer Science",
    credits: 3,
    description: "An introduction to programming concepts and problem-solving using a high-level language.",
    instructors: ["Dr. Santos"],
    averageRating: 4.7,
    totalEvaluations: 45,
    status: "active",
    semester: "1st-2024"
  },
  {
    id: "2",
    code: "CS202",
    title: "Data Structures",
    department: "Computer Science",
    credits: 3,
    description: "Study of data structures and algorithms for efficient problem-solving.",
    instructors: ["Prof. Garcia"],
    averageRating: 3.1,
    totalEvaluations: 38,
    status: "active",
    semester: "1st-2024"
  },
  {
    id: "3",
    code: "CS350",
    title: "Artificial Intelligence",
    department: "Computer Science",
    credits: 4,
    description: "Introduction to AI concepts, algorithms, and applications.",
    instructors: ["Dr. Reyes"],
    averageRating: 4.8,
    totalEvaluations: 32,
    status: "active",
    semester: "1st-2024"
  },
  {
    id: "4",
    code: "CS415",
    title: "Machine Learning",
    department: "Computer Science",
    credits: 4,
    description: "Study of algorithms that allow computers to learn from data.",
    instructors: ["Dr. Luna"],
    averageRating: 1.3,
    totalEvaluations: 28,
    status: "active",
    semester: "2nd-2024"
  },
  {
    id: "5",
    code: "CS301",
    title: "Database Systems",
    department: "Computer Science",
    credits: 3,
    description: "Concepts and applications of database management systems.",
    instructors: ["Prof. Mendoza"],
    averageRating: 4.0,
    totalEvaluations: 36,
    status: "active",
    semester: "2nd-2024"
  },
  {
    id: "6",
    code: "CS405",
    title: "Computer Networks",
    department: "Computer Science",
    credits: 3,
    description: "Principles and practice of computer networking and communication.",
    instructors: ["Dr. Tan"],
    averageRating: 3.8,
    totalEvaluations: 30,
    status: "active",
    semester: "2nd-2024"
  },
  {
    id: "7",
    code: "CS490",
    title: "Software Engineering",
    department: "Computer Science",
    credits: 4,
    description: "Methods and tools for professional software development.",
    instructors: ["Prof. Bautista"],
    averageRating: 1.9,
    totalEvaluations: 25,
    status: "active",
    semester: "summer-2024"
  },
  {
    id: "8",
    code: "MA101",
    title: "Calculus I",
    department: "Mathematics",
    credits: 4,
    description: "Introduction to differential and integral calculus.",
    instructors: ["Dr. Morales"],
    averageRating: 4.2,
    totalEvaluations: 40,
    status: "active",
    semester: "1st-2024"
  },
  {
    id: "9",
    code: "MA202",
    title: "Linear Algebra",
    department: "Mathematics",
    credits: 3,
    description: "Study of vectors, matrices, and linear transformations.",
    instructors: ["Prof. Lim"],
    averageRating: 4.4,
    totalEvaluations: 35,
    status: "active",
    semester: "2nd-2024"
  },
  {
    id: "10",
    code: "MA305",
    title: "Statistics",
    department: "Mathematics",
    credits: 3,
    description: "Introduction to statistical methods and data analysis.",
    instructors: ["Dr. Cruz"],
    averageRating: 1.7,
    totalEvaluations: 32,
    status: "active",
    semester: "summer-2024"
  },
  {
    id: "11",
    code: "EN101",
    title: "Introduction to Engineering",
    department: "Engineering",
    credits: 3,
    description: "Overview of engineering disciplines and problem-solving methods.",
    instructors: ["Prof. Villanueva"],
    averageRating: 4.1,
    totalEvaluations: 42,
    status: "active",
    semester: "1st-2024"
  },
  {
    id: "12",
    code: "BA101",
    title: "Principles of Management",
    department: "Business",
    credits: 3,
    description: "Introduction to management concepts and organizational behavior.",
    instructors: ["Dr. Aquino"],
    averageRating: 4.0,
    totalEvaluations: 38,
    status: "active",
    semester: "1st-2025"
  },
  {
    id: "13",
    code: "HU101",
    title: "Introduction to Philosophy",
    department: "Humanities",
    credits: 3,
    description: "Exploration of fundamental philosophical questions and major philosophical traditions.",
    instructors: ["Prof. Ramirez"],
    averageRating: 4.6,
    totalEvaluations: 36,
    status: "active",
    semester: "1st-2025"
  },
  {
    id: "14",
    code: "HU202",
    title: "World Literature",
    department: "Humanities",
    credits: 3,
    description: "Study of significant works of literature from various cultures and historical periods.",
    instructors: ["Dr. Santos"],
    averageRating: 1.2,
    totalEvaluations: 30,
    status: "active",
    semester: "1st-2025"
  }
];
