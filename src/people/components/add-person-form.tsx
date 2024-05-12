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

const schema = z
  .object({
    existingNames: z.array(z.string()),
    name: z.string().trim().min(1, "Name is required"),
  })
  .refine((data) => !data.existingNames.includes(data.name), {
    message: "Name already exists",
    path: ["name"],
  })

type Props = {
  existingNames: string[]
  onPersonCreated: (person: Person) => void
}

export function AddPersonForm({ existingNames, onPersonCreated }: Props) {
  const form = useZodForm({
    schema,
    defaultValues: { name: "", existingNames: [] },
  })

  useEffect(() => {
    form.resetField("existingNames", { defaultValue: existingNames })
  }, [existingNames, form])

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(({ name }) => {
          onPersonCreated(createPerson(name))
          form.reset({ name: "", existingNames })
        })}
      >
        <FormField
          control={form.control}
          name="name"
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
