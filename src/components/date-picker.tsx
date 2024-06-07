import { CalendarIcon } from 'lucide-react'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { useMemo } from 'react'

import { useDateStore } from '@/store/dateStore'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'

const DatePicker = () => {
  const setDate = useDateStore((state) => state.setDate)
  const date = useDateStore((state) => state.date)
  const today = useMemo(() => new Date(), [])

  const disabledConditions = [{ before: today }, { dayOfWeek: [0] }]
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={'outline'}
          className={cn('w-full justify-start text-left font-normal')}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? (
            format(date, 'PPP', { locale: ptBR })
          ) : (
            <span>Selecione uma data</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          locale={ptBR}
          mode="single"
          selected={date}
          onSelect={setDate}
          initialFocus
          disabled={disabledConditions}
        />
      </PopoverContent>
    </Popover>
  )
}
export default DatePicker
