import { Body1, Input, InputProps, Label, useId } from "@fluentui/react-components"
import React, { useEffect } from "react"
import { FieldPath, FieldValues, useFormContext } from "react-hook-form"

import { useFormInputStyles } from "./useFormInputStyles"

export type FormInputProps<TFormValues extends FieldValues> = InputProps & {
	name: FieldPath<TFormValues>
	label?: string
}

const FormInputComponent = <TFormValues extends FieldValues>(props: FormInputProps<TFormValues>) => {
	const { name, label, className } = props

	const styles = useFormInputStyles({
		className,
	})

	const form = useFormContext<TFormValues>()
	const registerProps = form.register(props.name)

	const [value, setValue] = React.useState("")

	const defaultId = useId("form-input")
	const id = props.id || defaultId

	const error = form.formState.errors[name]

	useEffect(() => {
		const { unsubscribe } = form.watch((values) => {
			const value = values[name]

			setValue(value ?? "")
		})

		setValue(form.getValues(name) ?? "")

		return unsubscribe
	}, [])

	return (
		<div className={styles.wrapper}>
			{label && (
				<Label className={styles.label} htmlFor={id}>
					{label}
				</Label>
			)}

			<Input id={id} {...props} {...registerProps} value={value} />

			{error && <Body1 className={styles.error}>{error.message?.toString() || ""}</Body1>}
		</div>
	)
}

export const FormInput = React.memo(FormInputComponent) as <T extends FieldValues>(
	props: FormInputProps<T>
) => JSX.Element
