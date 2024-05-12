import { PlusIcon } from "lucide-react"
import { useEffect } from "react"
import { z } from "zod"

import { createPerson } from "../create-person"
import { Person } from "../person"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useZodForm } from "@/lib/react-hook-form/useZodForm"

type Props = {
  existingNames: string[]
  onAddPerson: (person: Person) => void
}

const schema = z
  .object({
    existingNames: z.array(z.string()),
    personName: z.string().trim().min(1, "Name is required"),
  })
  .refine((data) => !data.existingNames.includes(data.personName), {
    message: "Name already exists",
    path: ["personName"],
  })

export function AddPersonForm({ existingNames, onAddPerson }: Props) {
  const form = useZodForm({
    schema,
    defaultValues: { personName: "", existingNames: [] },
  })

  useEffect(() => {
    form.resetField("existingNames", { defaultValue: existingNames })
  }, [existingNames, form])

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(({ personName }) => {
          onAddPerson(createPerson(personName))
          form.reset({ personName: "", existingNames })
        })}
      >
        <FormField
          control={form.control}
          name="personName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>

              <div className="flex">
                <FormControl>
                  <Input {...field} className="rounded-e-none" />
                </FormControl>

                <Button
                  type="submit"
                  variant="secondary"
                  size="icon"
                  className="rounded-s-none"
                >
                  <PlusIcon />
                </Button>
              </div>

              <FormDescription>
                Enter the name of the person you want to add
              </FormDescription>

              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  )
}
