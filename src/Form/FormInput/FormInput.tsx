import { Body1, Input, InputProps, Label, useId } from "@fluentui/react-components"
import React from "react"
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

	const defaultId = useId("form-input")
	const id = props.id || defaultId

	const error = form.formState.errors[name]

	return (
		<div className={styles.wrapper}>
			{label && (
				<Label className={styles.label} htmlFor={id}>
					{label}
				</Label>
			)}

			<Input id={id} {...props} {...registerProps} />

			{error && <Body1 className={styles.error}>{error.message?.toString() || ""}</Body1>}
		</div>
	)
}

export const FormInput = React.memo(FormInputComponent) as <T extends FieldValues>(
	props: FormInputProps<T>
) => JSX.Element
