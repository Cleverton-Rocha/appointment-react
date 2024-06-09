import { skipToken, useMutation, useQuery } from '@tanstack/react-query'

import { createAppointment, findAppointmentByDate } from '../services/api'
import { AppointmentDto } from '../utils/types'

import { formatMessage } from '@/utils/formatMessage'

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
    onSuccess: (appointmentDto: AppointmentDto) => {
      const wppURL = import.meta.env.VITE_REACT_APP_API_URL
      const message = formatMessage(appointmentDto)
      window.location.href = `${wppURL}${message}`
    },
  })
}
