import { skipToken, useMutation, useQuery } from '@tanstack/react-query'

import { createAppointment, findAppointmentByDate } from '../services/api'
import { AppointmentDto } from '../utils/types'

export function useFindAppointmentsByDate(date: string | undefined) {
  return useQuery({
    queryKey: ['appointments', date],
    queryFn: date ? () => findAppointmentByDate(date) : skipToken,
  })
}

export function useCreateAppointment() {
  return useMutation({
    mutationFn: (appointment: AppointmentDto) => {
      return createAppointment(appointment)
    },
  })
}
