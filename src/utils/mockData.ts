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
    id: "comp1",
    code: "COMP 1",
    title: "Introduction to Computing",
    department: "Computer Science",
    credits: 3,
    description: "An introduction to the fundamentals of computing and computer systems.",
    instructors: [],
    averageRating: 4.5,
    totalEvaluations: 42,
    status: "active",
    semester: "1st-2024"
  },
  {
    id: "comp2",
    code: "COMP 2",
    title: "Computer Programming 1 (Fundamentals of Programming)",
    department: "Computer Science",
    credits: 3,
    description: "Introduces programming concepts and problem-solving using a high-level language.",
    instructors: [],
    averageRating: 4.2,
    totalEvaluations: 38,
    status: "active",
    semester: "1st-2024"
  },
  {
    id: "cs1",
    code: "CS 1",
    title: "Digital Design",
    department: "Computer Science",
    credits: 3,
    description: "Introduction to digital logic design and computer organization.",
    instructors: [],
    averageRating: 4.0,
    totalEvaluations: 35,
    status: "active",
    semester: "1st-2024"
  },
  {
    id: "gec-uts",
    code: "GEC-UTS",
    title: "Understanding the Self",
    department: "General Education",
    credits: 3,
    description: "Explores the nature of identity, the self, and the human experience.",
    instructors: [],
    averageRating: 3.9,
    totalEvaluations: 56,
    status: "active",
    semester: "1st-2024"
  },
  {
    id: "gec-math",
    code: "GEC-MATH",
    title: "Mathematics in the Modern World",
    department: "General Education",
    credits: 3,
    description: "Explores mathematical concepts and their applications in modern life.",
    instructors: [],
    averageRating: 3.7,
    totalEvaluations: 62,
    status: "active",
    semester: "1st-2024"
  },
  {
    id: "math1",
    code: "MATH 1",
    title: "College Algebra",
    department: "Mathematics",
    credits: 3,
    description: "Study of algebraic expressions, equations, inequalities, and functions.",
    instructors: [],
    averageRating: 3.8,
    totalEvaluations: 75,
    status: "active",
    semester: "1st-2024"
  },
  {
    id: "bsc1",
    code: "BSC 1",
    title: "Being Skills Course 1",
    department: "General Education",
    credits: 1.5,
    description: "Development of essential personal and professional skills.",
    instructors: [],
    averageRating: 4.1,
    totalEvaluations: 43,
    status: "active",
    semester: "1st-2024"
  },
  {
    id: "pe1",
    code: "PE 1",
    title: "Physical Fitness & Gymnastic",
    department: "Physical Education",
    credits: 2,
    description: "Development of physical fitness through gymnastics exercises.",
    instructors: [],
    averageRating: 4.3,
    totalEvaluations: 50,
    status: "active",
    semester: "1st-2024"
  },
  {
    id: "nstp1",
    code: "NSTP 1",
    title: "National Service Training Program 1",
    department: "NSTP",
    credits: 3,
    description: "Civic consciousness and service training for students.",
    instructors: [],
    averageRating: 4.0,
    totalEvaluations: 80,
    status: "active",
    semester: "1st-2024"
  },
  {
    id: "cs2",
    code: "CS 2",
    title: "Computer Organization and Architecture",
    department: "Computer Science",
    credits: 3,
    description: "Study of computer architecture components and operation.",
    instructors: [],
    averageRating: 3.9,
    totalEvaluations: 32,
    status: "active",
    semester: "2nd-2024"
  },
  {
    id: "cs3",
    code: "CS 3",
    title: "Operating Systems",
    department: "Computer Science",
    credits: 3,
    description: "Concepts and design of operating systems.",
    instructors: [],
    averageRating: 4.1,
    totalEvaluations: 30,
    status: "active",
    semester: "2nd-2024"
  },
  {
    id: "cs5",
    code: "CS 5",
    title: "Multimedia Technologies",
    department: "Computer Science",
    credits: 3,
    description: "Study of multimedia technologies and applications.",
    instructors: [],
    averageRating: 4.5,
    totalEvaluations: 28,
    status: "active",
    semester: "2nd-2024"
  },
  {
    id: "comp3",
    code: "COMP 3",
    title: "Computer Programming 2 (Intermediate Programming)",
    department: "Computer Science",
    credits: 3,
    description: "Advanced programming techniques and data structures.",
    instructors: [],
    averageRating: 3.8,
    totalEvaluations: 35,
    status: "active",
    semester: "2nd-2024"
  },
  {
    id: "math2",
    code: "MATH 2",
    title: "Plane and Spherical Trigonometry",
    department: "Mathematics",
    credits: 3,
    description: "Study of trigonometric functions and their applications.",
    instructors: [],
    averageRating: 3.6,
    totalEvaluations: 42,
    status: "active",
    semester: "2nd-2024"
  },
  {
    id: "math3",
    code: "MATH 3",
    title: "Analytic Geometry",
    department: "Mathematics",
    credits: 3,
    description: "Study of geometric figures using coordinate systems.",
    instructors: [],
    averageRating: 3.7,
    totalEvaluations: 38,
    status: "active",
    semester: "2nd-2024"
  },
  {
    id: "cs6",
    code: "CS 6",
    title: "Networking 1",
    department: "Computer Science",
    credits: 3,
    description: "Introduction to computer networks and protocols.",
    instructors: [],
    averageRating: 4.2,
    totalEvaluations: 25,
    status: "active",
    semester: "summer-2024"
  },
  {
    id: "cs11",
    code: "CS 11",
    title: "Elective 1 - Big Data",
    department: "Computer Science",
    credits: 3,
    description: "Introduction to big data concepts and technologies.",
    instructors: [],
    averageRating: 4.3,
    totalEvaluations: 20,
    status: "active",
    semester: "summer-2024"
  },
  {
    id: "comp4",
    code: "COMP 4",
    title: "Data Structures & Algorithms",
    department: "Computer Science",
    credits: 3,
    description: "Study of data structures and algorithms for efficient problem-solving.",
    instructors: [],
    averageRating: 3.9,
    totalEvaluations: 22,
    status: "active",
    semester: "summer-2024"
  },
  {
    id: "cs4",
    code: "CS 4",
    title: "Systems Analysis and Design",
    department: "Computer Science",
    credits: 3,
    description: "Methods for analyzing and designing information systems.",
    instructors: [],
    averageRating: 4.0,
    totalEvaluations: 30,
    status: "active",
    semester: "1st-2025"
  },
  {
    id: "cs8",
    code: "CS 8",
    title: "Object-Oriented Programming",
    department: "Computer Science",
    credits: 3,
    description: "Principles and practices of object-oriented programming.",
    instructors: [],
    averageRating: 4.2,
    totalEvaluations: 28,
    status: "active",
    semester: "1st-2025"
  },
  {
    id: "cs16",
    code: "CS 16",
    title: "Elective 2 - Data Visualization",
    department: "Computer Science",
    credits: 3,
    description: "Techniques and tools for effective data visualization.",
    instructors: [],
    averageRating: 4.5,
    totalEvaluations: 25,
    status: "active",
    semester: "1st-2025"
  },
  {
    id: "math4",
    code: "MATH 4",
    title: "Differential Calculus",
    department: "Mathematics",
    credits: 3,
    description: "Study of limits, continuity, and differentiation of functions.",
    instructors: [],
    averageRating: 3.5,
    totalEvaluations: 40,
    status: "active",
    semester: "1st-2025"
  },
  {
    id: "cs7",
    code: "CS 7",
    title: "Project Management",
    department: "Computer Science",
    credits: 3,
    description: "Principles and practices of managing software projects.",
    instructors: [],
    averageRating: 4.0,
    totalEvaluations: 25,
    status: "active",
    semester: "2nd-2025"
  },
  {
    id: "cs11a",
    code: "CS 11A",
    title: "Computational Statistics",
    department: "Computer Science",
    credits: 3,
    description: "Statistical methods for computational problems.",
    instructors: [],
    averageRating: 3.8,
    totalEvaluations: 22,
    status: "active",
    semester: "2nd-2025"
  },
  {
    id: "cs14",
    code: "CS 14",
    title: "Networking 3",
    department: "Computer Science",
    credits: 3,
    description: "Advanced topics in computer networking.",
    instructors: [],
    averageRating: 4.1,
    totalEvaluations: 20,
    status: "active",
    semester: "2nd-2025"
  },
  {
    id: "cs15",
    code: "CS 15",
    title: "Software Engineering",
    department: "Computer Science",
    credits: 3,
    description: "Methods and tools for professional software development.",
    instructors: [],
    averageRating: 4.3,
    totalEvaluations: 24,
    status: "active",
    semester: "2nd-2025"
  },
  {
    id: "cs18",
    code: "CS 18",
    title: "Elective 3 - Data Mining",
    department: "Computer Science",
    credits: 3,
    description: "Techniques for discovering patterns in large data sets.",
    instructors: [],
    averageRating: 4.2,
    totalEvaluations: 18,
    status: "active",
    semester: "2nd-2025"
  },
  {
    id: "cs18a",
    code: "CS 18A",
    title: "Artificial Intelligence and Machine Learning",
    department: "Computer Science",
    credits: 3,
    description: "Introduction to AI concepts, algorithms, and machine learning.",
    instructors: [],
    averageRating: 4.7,
    totalEvaluations: 26,
    status: "active",
    semester: "2nd-2025"
  },
  {
    id: "comp5",
    code: "COMP 5",
    title: "Information Management",
    department: "Computer Science",
    credits: 3,
    description: "Concepts and applications of database management systems.",
    instructors: [],
    averageRating: 4.0,
    totalEvaluations: 30,
    status: "active",
    semester: "2nd-2025"
  },
  {
    id: "math5",
    code: "MATH 5",
    title: "Integral Calculus",
    department: "Mathematics",
    credits: 3,
    description: "Study of integration and its applications.",
    instructors: [],
    averageRating: 3.6,
    totalEvaluations: 36,
    status: "active",
    semester: "2nd-2025"
  },
  {
    id: "gec-tcw",
    code: "GEC-TCW",
    title: "The Contemporary World",
    department: "General Education",
    credits: 3,
    description: "Understanding contemporary global issues and challenges.",
    instructors: [],
    averageRating: 4.1,
    totalEvaluations: 60,
    status: "active",
    semester: "2nd-2025"
  },
  {
    id: "cs12",
    code: "CS 12",
    title: "Discrete Structures",
    department: "Computer Science",
    credits: 3,
    description: "Mathematical structures for computer science.",
    instructors: [],
    averageRating: 3.7,
    totalEvaluations: 28,
    status: "active",
    semester: "summer-2025"
  },
  {
    id: "cs19",
    code: "CS 19",
    title: "Elective 4 - Data Analytics",
    department: "Computer Science",
    credits: 3,
    description: "Methods and tools for analyzing and interpreting data.",
    instructors: [],
    averageRating: 4.4,
    totalEvaluations: 22,
    status: "active",
    semester: "1st-2026"
  }
];
