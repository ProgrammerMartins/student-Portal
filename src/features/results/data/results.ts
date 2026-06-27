export interface Result {
  id: string
  courseCode: string
  courseTitle: string
  units: number
  semester: string
  grade: 'A' | 'B' | 'C' | 'D' | 'E' | 'F'
  score: number
}

const gradePoints: Record<Result['grade'], number> = {
  A: 5,
  B: 4,
  C: 3,
  D: 2,
  E: 1,
  F: 0,
}

export const results: Result[] = [
  { id: '1', courseCode: 'CSC 301', courseTitle: 'Data Structures & Algorithms', units: 3, semester: '2024/1', grade: 'A', score: 82 },
  { id: '2', courseCode: 'CSC 303', courseTitle: 'Operating Systems', units: 3, semester: '2024/1', grade: 'B', score: 74 },
  { id: '3', courseCode: 'MTH 205', courseTitle: 'Linear Algebra', units: 3, semester: '2024/1', grade: 'A', score: 86 },
  { id: '4', courseCode: 'PHY 201', courseTitle: 'Modern Physics', units: 2, semester: '2024/1', grade: 'B', score: 70 },
  { id: '5', courseCode: 'ENG 102', courseTitle: 'Technical Writing', units: 2, semester: '2023/2', grade: 'A', score: 88 },
]

export function calculateGPA(items: Result[]) {
  const totalUnits = items.reduce((sum, r) => sum + r.units, 0)
  const totalPoints = items.reduce((sum, r) => sum + r.units * gradePoints[r.grade], 0)
  return totalUnits === 0 ? 0 : Number((totalPoints / totalUnits).toFixed(2))
}
