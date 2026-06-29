import { apiClient } from '@/shared/services/api-client'

export async function fetchTimetable() {
  const { data } = await apiClient.get('/timetable')
  return data
}

export async function fetchTimetableByDay(day: string) {
  const { data } = await apiClient.get(`/timetable/${day}`)
  return data
}
