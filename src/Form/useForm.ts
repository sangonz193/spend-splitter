import { FieldValues, UseFormProps, UseFormReturn } from "react-hook-form"

export type UseForm<TFieldValues extends FieldValues = FieldValues, TContext extends object = object> = (
	props?: UseFormProps<TFieldValues, TContext>
) => UseFormReturn<TFieldValues, TContext>
