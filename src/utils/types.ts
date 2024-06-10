export type AppointmentList = Appointment[]

export type Appointment = {
  name: string
  phone: string
  appointmentTime: string
  appointmentDate: string
  service: string
  price: string
  observations: string
  cancelToken: string
}
export type AppointmentDto = {
  name: string
  phone: string
  appointmentTime: string
  appointmentDate: string
  service: string
  price: string
  observations: string
  cancelToken: string
}

export type CancelAppointmentDto = {
  date: string
  time: string
  cancelToken: string
}
