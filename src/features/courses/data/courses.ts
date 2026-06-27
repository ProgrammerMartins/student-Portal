export interface Course {
  id: string
  code: string
  title: string
  units: number
  level: number
  semester: 'First' | 'Second'
  lecturer: string
  status: 'registered' | 'available' | 'completed'
}

export const courses: Course[] = [
  { id: '1', code: 'CSC 301', title: 'Data Structures & Algorithms', units: 3, level: 300, semester: 'First', lecturer: 'Dr. Adebayo', status: 'registered' },
  { id: '2', code: 'CSC 303', title: 'Operating Systems', units: 3, level: 300, semester: 'First', lecturer: 'Prof. Okonkwo', status: 'registered' },
  { id: '3', code: 'MTH 205', title: 'Linear Algebra', units: 3, level: 200, semester: 'First', lecturer: 'Dr. Ibrahim', status: 'registered' },
  { id: '4', code: 'PHY 201', title: 'Modern Physics', units: 2, level: 200, semester: 'First', lecturer: 'Dr. Musa', status: 'registered' },
  { id: '5', code: 'ENG 102', title: 'Technical Writing', units: 2, level: 100, semester: 'Second', lecturer: 'Mrs. Nwosu', status: 'completed' },
  { id: '6', code: 'CSC 305', title: 'Database Systems', units: 3, level: 300, semester: 'Second', lecturer: 'Dr. Adebayo', status: 'available' },
]
