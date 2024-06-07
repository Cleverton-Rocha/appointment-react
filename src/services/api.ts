import axios from 'axios'

import { Appointment, AppointmentDto, AppointmentList } from '../utils/types'

const api = axios.create({
  baseURL: 'https://appointment-java.onrender.com',
})

export async function findAppointmentByDate(date: string | undefined) {
  const { data } = await api.get<AppointmentList>(`/appointments/${date}`)

  return data
}

export async function createAppointment(appointment: AppointmentDto) {
  const { data } = await api.post<Appointment>('/appointments', appointment)

  return data
}
