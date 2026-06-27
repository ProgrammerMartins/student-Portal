export const studentStats = [
  { label: 'Current GPA', value: '3.72', change: '+0.14', trend: 'up' as const },
  { label: 'Credits Earned', value: '92', change: '+15', trend: 'up' as const },
  { label: 'Attendance', value: '94%', change: '-1%', trend: 'down' as const },
  { label: 'Outstanding Fees', value: '₦45,000', change: 'Due in 7 days', trend: 'neutral' as const },
]

export const gpaHistory = [
  { semester: '2022/1', gpa: 3.45, cgpa: 3.45 },
  { semester: '2022/2', gpa: 3.62, cgpa: 3.53 },
  { semester: '2023/1', gpa: 3.58, cgpa: 3.55 },
  { semester: '2023/2', gpa: 3.81, cgpa: 3.61 },
  { semester: '2024/1', gpa: 3.72, cgpa: 3.64 },
]

export const upcomingAssessments = [
  { id: '1', title: 'CSC 301 Midterm', date: '2024-10-14', type: 'Exam', location: 'Hall A' },
  { id: '2', title: 'MTH 205 Assignment', date: '2024-10-16', type: 'Assignment', location: 'Online' },
  { id: '3', title: 'PHY 201 Lab Test', date: '2024-10-18', type: 'Lab', location: 'Physics Lab' },
  { id: '4', title: 'ENG 102 Quiz', date: '2024-10-21', type: 'Quiz', location: 'Room 204' },
]

export const timetablePreview = [
  { id: '1', course: 'CSC 301', time: '08:00 - 09:30', venue: 'Lab 3', color: 'bg-primary' },
  { id: '2', course: 'MTH 205', time: '10:00 - 11:30', venue: 'Lecture Hall 2', color: 'bg-info' },
  { id: '3', course: 'PHY 201', time: '12:00 - 13:30', venue: 'Science Block', color: 'bg-success' },
  { id: '4', course: 'ENG 102', time: '14:00 - 15:30', venue: 'Room 204', color: 'bg-warning' },
]

export const announcements = [
  { id: '1', title: 'Course Registration Deadline Extended', date: '2024-10-10', category: 'General' },
  { id: '2', title: 'Hostel Maintenance Notice', date: '2024-10-09', category: 'Facilities' },
  { id: '3', title: 'Scholarship Application Now Open', date: '2024-10-08', category: 'Financial' },
]

export const activityTimeline = [
  { id: '1', title: 'Paid school fees', timestamp: '2024-10-12T10:30:00', status: 'completed' as const },
  { id: '2', title: 'Registered for CSC 301', timestamp: '2024-10-11T14:20:00', status: 'completed' as const },
  { id: '3', title: 'Submitted MTH 205 assignment', timestamp: '2024-10-10T09:15:00', status: 'completed' as const },
  { id: '4', title: 'Fee balance reminder', timestamp: '2024-10-09T16:45:00', status: 'pending' as const },
]

export const registrationProgress = {
  total: 6,
  completed: 4,
  steps: ['Profile Update', 'Fee Payment', 'Course Registration', 'Advisor Approval', 'ID Card Validation', 'Confirmation'],
}

export const adminKpis = [
  { label: 'Total Students', value: '12,480', change: '+3.2%', trend: 'up' as const },
  { label: 'New Registrations', value: '1,240', change: '+12%', trend: 'up' as const },
  { label: 'Revenue (Monthly)', value: '₦42.5M', change: '+8.4%', trend: 'up' as const },
  { label: 'Pending Approvals', value: '38', change: '-5', trend: 'down' as const },
]

export const registrationMetrics = [
  { department: 'Computer Science', students: 420 },
  { department: 'Electrical Engineering', students: 380 },
  { department: 'Mechanical Engineering', students: 310 },
  { department: 'Business Admin', students: 290 },
  { department: 'Medicine', students: 250 },
]

export const revenueOverview = [
  { month: 'Jan', revenue: 3.2 },
  { month: 'Feb', revenue: 3.8 },
  { month: 'Mar', revenue: 4.1 },
  { month: 'Apr', revenue: 3.9 },
  { month: 'May', revenue: 4.5 },
  { month: 'Jun', revenue: 4.8 },
]
