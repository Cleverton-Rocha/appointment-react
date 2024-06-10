import { skipToken, useMutation, useQuery } from '@tanstack/react-query'

import {
  cancelAppointment,
  createAppointment,
  findAppointmentByDate,
} from '../services/api'
import { AppointmentDto, CancelAppointmentDto } from '../utils/types'

export function useFindAppointmentsByDate(date: string | undefined) {
  return useQuery({
    queryKey: ['appointments', date],
    queryFn: date ? () => findAppointmentByDate(date) : skipToken,
  })
}

export function useCreateAppointment() {
  return useMutation({
    mutationFn: (appointmentDto: AppointmentDto) => {
      return createAppointment(appointmentDto)
    },
  })
}

export function useCancelAppointment() {
  return useMutation({
    mutationFn: (cancelAppointmentdto: CancelAppointmentDto) => {
      return cancelAppointment(cancelAppointmentdto)
    },
  })
}
