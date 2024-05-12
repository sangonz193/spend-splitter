import { useForm, useFormContext } from "react-hook-form"
import { z } from "zod"

import { UseForm } from "../../../Form/useForm"

export const addPersonFormSchema = z.object({
  name: z.string().trim().min(1, "Name is required"),
})

export type AddPersonFormValues = z.infer<typeof addPersonFormSchema>

export const useAddPersonForm = useForm as UseForm<AddPersonFormValues>
export const useAddPersonFormContext = () =>
  useFormContext<AddPersonFormValues>()
