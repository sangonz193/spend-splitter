import { CheckIcon, ChevronsUpDown } from "lucide-react"
import { z } from "zod"

import { createPurchase } from "../create-purchase"
import { Purchase } from "../purchase"

import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { cn } from "@/lib/cn"
import { useZodForm } from "@/lib/react-hook-form/useZodForm"
import { Person } from "@/people/person"

type Props = {
  people: Person[]
  onAddPurchase: (purchase: Purchase) => void
}

const schema = z.object({
  purchaseName: z.string().trim().min(1, "Name is required"),
  amount: z.string().pipe(z.coerce.number().finite().positive()),
  buyerId: z.string().min(1, "Select a buyer").pipe(z.coerce.number({}).int()),
})

export function AddPurchaseForm({ people, onAddPurchase }: Props) {
  const defaultValues = {
    purchaseName: "",
    amount: "",
    buyerId: "",
  } satisfies z.input<typeof schema>

  const form = useZodForm({
    schema,
    defaultValues,
  })

  const peopleOptions = people.map((p) => ({ value: p.id, name: p.name }))

  return (
    <Form {...form}>
      <form
        className="flex flex-col gap-3 rounded-md border p-4"
        onSubmit={form.handleSubmit((values) => {
          onAddPurchase(
            createPurchase({
              name: values.purchaseName,
              amount: values.amount,
              buyerId: values.buyerId,
            }),
          )
          form.reset(defaultValues)
        })}
      >
        <div className="grid gap-3 md:grid-cols-2">
          <FormField
            control={form.control}
            name="purchaseName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Item name</FormLabel>

                <FormControl>
                  <Input {...field} className="rounded-e-none" />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="amount"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Amount</FormLabel>

                <FormControl>
                  <Input
                    {...field}
                    value={field.value?.toString()}
                    className="rounded-e-none"
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="buyerId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Buyer</FormLabel>

              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant="outline"
                      role="combobox"
                      className={cn(
                        "flex w-[200px] justify-between",
                        !field.value && "text-muted-foreground",
                      )}
                    >
                      {field.value
                        ? peopleOptions.find(
                            (p) => p.value.toString() === field.value,
                          )?.name
                        : "Select buyer"}
                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-[200px] p-0">
                  <Command>
                    <CommandInput placeholder="Search persons..." />
                    <CommandEmpty>
                      <span className="text-muted-foreground">
                        No person found.
                      </span>
                    </CommandEmpty>
                    <CommandGroup>
                      {peopleOptions.map((person) => (
                        <CommandItem
                          value={person.name}
                          key={person.value}
                          onSelect={() => {
                            form.setValue("buyerId", person.value?.toString())
                          }}
                        >
                          <CheckIcon
                            className={cn(
                              "mr-2 h-4 w-4",
                              person.value.toString() === field.value
                                ? "opacity-100"
                                : "opacity-0",
                            )}
                          />
                          {person.name}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </Command>
                </PopoverContent>
              </Popover>

              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" variant="secondary">
          Add purchase
        </Button>
      </form>
    </Form>
  )
}
