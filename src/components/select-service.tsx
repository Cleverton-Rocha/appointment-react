import { GanttChart } from 'lucide-react'

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { usePriceStore } from '@/store/priceStore'
import { useServiceStore } from '@/store/serviceStore'
import { services } from '@/utils/services'

const SelectService = () => {
  const setService = useServiceStore((state) => state.setService)
  const setPrice = usePriceStore((state) => state.setPrice)

  const handleSelect = (value: string) => {
    const selected = services.find((service) => service.name === value)
    if (selected) {
      setService(selected.name)
      setPrice(selected.price)
    }
  }

  return (
    <>
      <Select onValueChange={handleSelect}>
        <SelectTrigger className="w-full justify-start">
          <GanttChart className="mr-2 h-4 w-4" />
          <SelectValue placeholder="Selecione um serviço" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {services.map((service) => (
              <SelectItem key={service.name} value={service.name}>
                {service.name + ' - ' + service.price}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </>
  )
}
export default SelectService
