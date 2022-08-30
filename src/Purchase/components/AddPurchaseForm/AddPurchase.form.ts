import { SafeOmit } from "@sangonz193/utils/SafeOmit"
import { useForm, useFormContext } from "react-hook-form"
import { z } from "zod"

import { UseForm } from "../../../Form/useForm"

export const addPurchaseFormSchema = z.object({
	name: z.string().trim().min(1, "Name is required"),
	amount: z.preprocess((arg) => {
		if (typeof arg !== "string") {
			return NaN
		}

		const parsed = parseFloat(arg)
		return parsed
	}, z.number({ invalid_type_error: "invalid type" }).min(1, "Amount is required")),
	buyerId: z.string().min(1, "Buyer is required"),
})

export type AddPurchaseFormValues = SafeOmit<z.infer<typeof addPurchaseFormSchema>, "buyerId"> & {
	buyerId: string
}

export const useAddPurchaseForm = useForm as UseForm<AddPurchaseFormValues>
export const useAddPurchaseFormContext = () => useFormContext<AddPurchaseFormValues>()
