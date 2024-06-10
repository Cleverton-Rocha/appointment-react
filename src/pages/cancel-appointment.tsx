import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { useParams } from 'react-router-dom'

import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import AppointmentFormHeader from '@/components/appointment-form-header'
import { handleCancelTokenInput } from '@/lib/utils'
import { useCancelAppointment } from '@/queries'

const cancelAppointmentSchema = z.object({
  cancelToken: z.string().min(6, { message: 'O token contém 6 caracteres.' }),
})

type CancelAppointmentValues = z.infer<typeof cancelAppointmentSchema>

const CancelAppointment = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CancelAppointmentValues>({
    resolver: zodResolver(cancelAppointmentSchema),
  })

  const cancelAppointment = useCancelAppointment()

  const { date, time } = useParams()

  const onSubmit = (data: CancelAppointmentValues) => {
    if (date && time) {
      const cancelAppointmentDto = {
        date: date,
        time: time,
        cancelToken: data.cancelToken,
      }
      cancelAppointment.mutate(cancelAppointmentDto)
    }
  }

  return (
    <div className="flex flex-col items-center p-12">
      <AppointmentFormHeader />
      <h1 className="p-5 text-2xl font-bold">Cancelar meu agendamento</h1>
      <form
        className="flex h-screen w-[400px] flex-col gap-5 rounded-lg p-10"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Label>Token</Label>
        <Input
          type="text"
          placeholder="Digite o seu token de cancelamento"
          {...register('cancelToken')}
          onInput={handleCancelTokenInput}
        />
        {errors.cancelToken && (
          <span className="flex justify-center px-4 py-2 text-xs text-pink-700 md:text-sm">
            {errors.cancelToken.message}
          </span>
        )}
        <Button type="submit">Cancelar agendamento</Button>
      </form>
    </div>
  )
}

export default CancelAppointment
