import { format, isToday, parse } from 'date-fns'
import { Clock } from 'lucide-react'
import { useEffect } from 'react'

import LoadingSpinner from './loading-spinner'

import { hours } from '@/utils/hours'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useFindAppointmentsByDate } from '@/queries'
import { useDateStore } from '@/store/dateStore'
import { useHourStore } from '@/store/hourStore'

const SelectHour = () => {
  const setHour = useHourStore((state) => state.setHour)
  const hour = useHourStore((state) => state.hour)

  const formattedDate = useDateStore((state) => state.formattedDate)

  const { data, isLoading } = useFindAppointmentsByDate(formattedDate)
  const AlreadyBookedHours = data?.map(({ appointmentTime }) => appointmentTime)

  const shouldDisableHour = (hour: string) => {
    const isDateToday =
      formattedDate && isToday(parse(formattedDate, 'dd-MM-yyyy', new Date()))
    const currentHour = parseInt(format(new Date(), 'HHmm'))
    const hourToNumber = parseInt(hour.replace(':', ''))

    return (
      (isDateToday && hourToNumber < currentHour) ||
      AlreadyBookedHours?.includes(hour)
    )
  }

  useEffect(() => {
    setHour('')
  }, [formattedDate, setHour])

  if (isLoading) return <LoadingSpinner />

  return (
    <Select value={hour} onValueChange={setHour}>
      <SelectTrigger className="w-full justify-start">
        <Clock className="mr-2 h-4 w-4" />
        <SelectValue placeholder="Selecione um horário" />
      </SelectTrigger>
      <SelectContent>
        {hours.map((hour) => (
          <SelectItem
            key={hour}
            value={hour}
            disabled={shouldDisableHour(hour)}
          >
            {hour}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}

export default SelectHour
