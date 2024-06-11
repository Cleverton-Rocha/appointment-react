import axios from 'axios'

import {
  Appointment,
  AppointmentDto,
  AppointmentList,
  CancelAppointmentDto,
} from '../utils/types'

const api = axios.create({
  baseURL: 'https://appointment-ts.vercel.app',
})

export async function findAppointmentByDate(date: string | undefined) {
  const { data } = await api.get<AppointmentList>(`/appointments/${date}`)

  return data
}

export async function createAppointment(appointment: AppointmentDto) {
  const { data } = await api.post<Appointment>('/appointments', appointment)

  return data
}

export async function cancelAppointment(
  cancelAppointment: CancelAppointmentDto,
) {
  await api.delete(`/appointments/${cancelAppointment.cancelToken}`)
}
