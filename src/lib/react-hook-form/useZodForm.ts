import { zodResolver } from "@hookform/resolvers/zod"
import { UseFormProps, useForm, useFormContext } from "react-hook-form"
import { z } from "zod"

export function useZodForm<TSchema extends z.ZodType>({
  schema,
  ...params
}: Omit<UseFormProps<z.input<TSchema>, unknown>, "resolver"> & {
  schema: TSchema
}) {
  return useForm<z.input<TSchema>, unknown, z.infer<TSchema>>({
    resolver: zodResolver(schema),
    ...params,
  })
}

export function useZodFormContext<TSchema extends z.ZodType>() {
  return useFormContext<z.input<TSchema>, unknown, z.infer<TSchema>>()
}
