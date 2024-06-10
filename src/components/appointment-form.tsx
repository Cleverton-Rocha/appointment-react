import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import DatePicker from './date-picker'
import SelectHour from './select-hour'
import SelectService from './select-service'
import { Input } from './ui/input'
import AppointmentFormHeader from './appointment-form-header'
import { Label } from './ui/label'
import { Button } from './ui/button'

import { useDateStore } from '@/store/dateStore'
import { useHourStore } from '@/store/hourStore'
import { usePriceStore } from '@/store/priceStore'
import { useServiceStore } from '@/store/serviceStore'
import { AppointmentDto } from '@/utils/types'
import { useCreateAppointment } from '@/queries'
import { sendMessage } from '@/utils/sendMessage'
import { handlePhoneInput } from '@/lib/utils'

const AppointmentSchema = z.object({
  name: z.string().min(2, 'Nome muito curto').max(50, 'Nome muito longo'),
  phone: z.string().min(14, 'Telefone inválido').max(14, 'Telefone inválido'),
  observations: z.string().max(150),
})

type AppointmentFormValues = z.infer<typeof AppointmentSchema>

const AppointmentForm: React.FC = () => {
  const formattedDate = useDateStore((state) => state.formattedDate)
  const hour = useHourStore((state) => state.hour)
  const service = useServiceStore((state) => state.service)
  const price = usePriceStore((state) => state.price)

  const isButtonDisabled = !formattedDate || !hour || !service || !price

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AppointmentFormValues>({
    resolver: zodResolver(AppointmentSchema),
  })

  const createAppointment = useCreateAppointment()

  const onSubmit = (data: AppointmentFormValues) => {
    if (data.name && data.phone && service && price && formattedDate && hour) {
      const appointmentdto: AppointmentDto = {
        name: data.name,
        phone: data.phone,
        appointmentTime: hour,
        appointmentDate: formattedDate,
        service: service,
        price: price,
        observations: data.observations,
      }
      createAppointment.mutate(appointmentdto, {
        onSuccess: () => {
          sendMessage(appointmentdto)
        },
      })
    }
  }

  return (
    <div className="flex flex-col items-center p-12">
      <AppointmentFormHeader />
      <form
        className="flex h-screen w-[400px] flex-col gap-5 rounded-lg p-10"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div>
          <Label htmlFor="name" className="text-xs">
            Nome
          </Label>
          <Input
            type="text"
            placeholder="Nome completo"
            {...register('name')}
          />
          {errors.name && (
            <span className="flex justify-center px-4 py-2 text-xs text-pink-700 md:text-sm">
              {errors.name.message}
            </span>
          )}
        </div>

        <div>
          <Label htmlFor="phone" className="text-xs">
            Telefone
          </Label>
          <Input
            type="text"
            placeholder="Ex: (79) 99999-9999"
            {...register('phone')}
            onInput={handlePhoneInput}
          />
          {errors.phone && (
            <span className="flex justify-center px-4 text-xs text-pink-700 md:text-sm">
              {errors.phone.message}
            </span>
          )}
        </div>

        <SelectService />
        {service && <DatePicker />}
        {formattedDate && <SelectHour />}
        {hour && (
          <div>
            <Input
              type="text"
              placeholder="Alguma observação?"
              {...register('observations')}
            />
            {errors.observations && (
              <span className="flex justify-center px-4 py-2 text-xs text-pink-700 md:text-sm">
                {errors.observations.message}
              </span>
            )}
          </div>
        )}

        <div className="flex w-full justify-center">
          <Button disabled={isButtonDisabled} type="submit" className="w-36">
            Agendar
          </Button>
        </div>
      </form>
    </div>
  )
}

export default AppointmentForm
