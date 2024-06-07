import { AppointmentDto } from './types'

export const formatMessage = (appointment: AppointmentDto) => {
  return `
  📅 MEU AGENDAMENTO%0D
  👩 CLIENTE: *${appointment.name}*%0D
  📱 TELEFONE: *${appointment.phone}*%0D
  =-=-=-=-=-=-=-=-=-=-=-=-=-==-=-=%0D
  📌 DIA: *${appointment.appointmentDate}*%0D
  🕛 HORÁRIO:  *${appointment.appointmentTime}*%0D
  ✨ SERVIÇO: *${appointment.service}*%0D
  💵 PREÇO: *${appointment.price}*%0D
  =-=-=-=-=-=-=-=-=-=-=-=-=-==-=-=%0D
  👀 OBSERVAÇÕES%0D
  *${appointment.observations ?? 'Sem observações'}*%0D
  =-=-=-=-=-=-=-=-=-=-=-=-=-==-=-=%0D
  Obrigado pela preferencia!%0D
  Espero que sua experiência seja incrível.%0D
  =-=-=-=-=-=-=-=-=-=-=-=-=-==-=-=%0D 
  COMPROVANTE DE AGENDAMENTO`
}
