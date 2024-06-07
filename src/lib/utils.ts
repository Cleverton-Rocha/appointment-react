import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const formatPhoneNumber = (phone: string) => {
  let value = phone.replace(/\D/g, '')
  value = value.slice(0, 11)
  value = value.replace(/^(\d{2})(\d)/g, '($1) $2')

  return value
}

export const handlePhoneInput = (e: React.ChangeEvent<HTMLInputElement>) => {
  const phone = e.target
  phone.value = formatPhoneNumber(phone.value)
}
