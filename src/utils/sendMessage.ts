import { AppointmentDto } from './types'

export const sendCreateAppointmentMessage = (appointment: AppointmentDto) => {
  const wppURL = import.meta.env.VITE_REACT_APP_API_URL
  const message = `
📅 MEU AGENDAMENTO%0D
👩 CLIENTE: *${appointment.name}*%0D
📱 TELEFONE: *${appointment.phone}*%0D
=-=-=-=-=-=-=-=-=-=-=-=-=-==-=%0D
📌 DIA: *${appointment.appointmentDate}*%0D
🕛 HORÁRIO:  *${appointment.appointmentTime}*%0D
✨ SERVIÇO: *${appointment.service}*%0D
💵 PREÇO: *${appointment.price}*%0D
=-=-=-=-=-=-=-=-=-=-=-=-=-==-=%0D
👀 OBSERVAÇÕES%0D
*${appointment.observations === '' ? 'Sem observações' : appointment.observations}*%0D
=-=-=-=-=-=-=-=-=-=-=-=-=-==-=%0D
Obrigado pela preferencia!%0D
Espero que sua experiência seja incrível.%0D
=-=-=-=-=-=-=-=-=-=-=-=-=-==-=%0D
*CANCELAR AGENDAMENTO*%0D
Token de cancelamento 👇%0D 
*${appointment.cancelToken}*%0D
❌ https://adriastefannydesign.vercel.app/cancelar-agendamento ❌%0D
=-=-=-=-=-=-=-=-=-=-=-=-=-==-=%0D
COMPROVANTE DE AGENDAMENTO`
  window.location.href = `${wppURL}${message}`
}

export const sendCancelAppointmentMessage = () => {
  const wppURL = import.meta.env.VITE_REACT_APP_API_URL
  const message = `
❌ CANCELAR AGENDAMENTO ❌%0D
Olá, passando para avisar que decidi cancelar meu agendamento.%0D
`
  window.location.href = `${wppURL}${message}`
}
