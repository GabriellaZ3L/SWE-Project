// SAMPLE DATA
// This is fake data so the UI works before the database is connected.

export const student = {
  name: "Alex",
  points: 340,
  streak: 4, // assignments in a row turned in on time
};

// Creature growth stages. "minPoints" = points needed to reach that stage.
export const creatureStages = [
  { name: "Sprout", minPoints: 0 },
  { name: "Buddy", minPoints: 300 },
  { name: "Champion", minPoints: 600 },
];

// dueInDays: 0 = due today, 1 = tomorrow, negative = overdue.
// Note: In the real app you would calculate this from a due date.
export const assignments = [
  { id: 1, title: "Essay draft: Climate policy", course: "ENC 1101", dueInDays: 0, points: 50, done: false },
  { id: 2, title: "Problem set 6", course: "MAC 2311", dueInDays: 1, points: 40, done: false },
  { id: 3, title: "Lab report: Titration", course: "CHM 2045", dueInDays: 3, points: 60, done: false },
  { id: 4, title: "Reading quiz, Ch. 8", course: "PSY 2012", dueInDays: 5, points: 20, done: false },
  { id: 5, title: "Discussion post #4", course: "ENC 1101", dueInDays: -1, points: 15, done: true },
];

export const announcements = [
  {
    id: 1,
    course: "MAC 2311",
    author: "Prof. Rivera",
    title: "Exam 2 moved to Thursday",
    body: "Exam 2 is now on Thursday in the usual room. It covers sections 3.1 through 4.4. Office hours on Wednesday are extended to 5 pm.",
    postedAgo: "2h ago",
    pinned: true,
    read: false,
  },
  {
    id: 2,
    course: "ENC 1101",
    author: "Dr. Okafor",
    title: "Reminder: Essay draft due tonight",
    body: "Submit your draft before 11:59 pm. Drafts turned in on time get feedback within a week.",
    postedAgo: "5h ago",
    pinned: false,
    read: false,
  },
  {
    id: 3,
    course: "CHM 2045",
    author: "TA Jordan",
    title: "Lab report template posted",
    body: "A template for the titration lab report is now in the Files section. Using it is optional but recommended.",
    postedAgo: "Yesterday",
    pinned: false,
    read: true,
  },
  {
    id: 4,
    course: "PSY 2012",
    author: "Prof. Lin",
    title: "No class on Monday",
    body: "Class is cancelled on Monday. Please use the time to finish the Chapter 8 reading before the quiz.",
    postedAgo: "2 days ago",
    pinned: false,
    read: true,
  },
];

// Sample Profile Page Data

export const profile = {
  fullName: "Alex Morgan",
  email: "alex.morgan@university.edu",
  major: "Computer Science",
  year: "Sophomore",
  memberSince: "August 2026",
  bestStreak: 7,       // longest on-time streak ever
  onTimeRate: 92,      // percent of assignments turned in on time
  completed: 24,       // assignments finished so far
};

export const classes = [
  { id: 1, course: "ENC 1101", name: "Writing & Rhetoric", instructor: "Dr. Okafor", onTime: 7, total: 8 },
  { id: 2, course: "MAC 2311", name: "Calculus I", instructor: "Prof. Rivera", onTime: 6, total: 6 },
  { id: 3, course: "CHM 2045", name: "General Chemistry", instructor: "TA Jordan", onTime: 5, total: 6 },
  { id: 4, course: "PSY 2012", name: "General Psychology", instructor: "Prof. Lin", onTime: 4, total: 4 },
];

// earned: true = unlocked, false = still locked (shown faded)
export const badges = [
  { id: 1, icon: "✓", name: "First Finish", description: "Turn in your first assignment on time", earned: true },
  { id: 2, icon: "★", name: "On a Roll", description: "Reach a 5-assignment on-time streak", earned: true },
  { id: 3, icon: "◷", name: "Early Bird", description: "Submit an assignment 2+ days early", earned: true },
  { id: 4, icon: "◆", name: "Perfect Week", description: "Finish every assignment in a week on time", earned: false },
  { id: 5, icon: "♛", name: "Champion", description: "Grow your creature to the final stage", earned: false },
  { id: 6, icon: "∞", name: "Unstoppable", description: "Reach a 15-assignment on-time streak", earned: false },
];
